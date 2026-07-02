/**
 * One-time script to create the admin user in Supabase
 * and sync them to the PostgreSQL database with the 'admin' role.
 *
 * Run with: npx ts-node-dev --transpile-only scripts/create-admin.ts
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const ADMIN_EMAIL = 'admin.nexolve@gmail.com';
const ADMIN_PASSWORD = 'nexolve@admin';
const ADMIN_NAME = 'Hossen Shop Admin';

async function main() {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const databaseUrl = process.env.DIRECT_URL || process.env.DATABASE_URL!;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set in .env');
    process.exit(1);
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    realtime: { transport: ws as unknown as typeof WebSocket },
  });

  const pool = new pg.Pool({ connectionString: databaseUrl });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log('🔍 Checking if admin user already exists in Supabase...');

  // Check if user already exists by listing users and filtering
  const { data: listData, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  if (listError) {
    console.error('❌ Failed to list Supabase users:', listError.message);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  }

  let supabaseUserId: string;
  const existingUser = listData.users.find((u) => u.email === ADMIN_EMAIL);

  if (existingUser) {
    console.log(`✅ Admin user already exists in Supabase (ID: ${existingUser.id})`);
    supabaseUserId = existingUser.id;

    // Update password to make sure it matches
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(existingUser.id, {
      password: ADMIN_PASSWORD,
      email_confirm: true,
    });
    if (updateError) {
      console.warn('⚠️  Could not update password:', updateError.message);
    } else {
      console.log('✅ Admin password confirmed/updated in Supabase.');
    }
  } else {
    console.log('🆕 Creating admin user in Supabase...');
    const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: { name: ADMIN_NAME },
    });

    if (createError || !createData.user) {
      console.error('❌ Failed to create admin in Supabase:', createError?.message);
      await prisma.$disconnect();
      await pool.end();
      process.exit(1);
    }

    supabaseUserId = createData.user.id;
    console.log(`✅ Supabase admin user created (ID: ${supabaseUserId})`);
  }

  // Upsert into local PostgreSQL with role = 'admin'
  console.log('🔄 Syncing admin user to PostgreSQL with role "admin"...');
  const dbUser = await prisma.user.upsert({
    where: { id: supabaseUserId },
    create: {
      id: supabaseUserId,
      email: ADMIN_EMAIL,
      name: ADMIN_NAME,
      role: 'admin',
    },
    update: {
      role: 'admin',
      name: ADMIN_NAME,
    },
  });

  console.log(`✅ Admin user synced to PostgreSQL:`);
  console.log(`   ID:    ${dbUser.id}`);
  console.log(`   Email: ${dbUser.email}`);
  console.log(`   Role:  ${dbUser.role}`);
  console.log('\n🎉 Done! You can now log in as admin with:');
  console.log(`   Email:    ${ADMIN_EMAIL}`);
  console.log(`   Password: ${ADMIN_PASSWORD}`);

  await prisma.$disconnect();
  await pool.end();
}

main().catch((err) => {
  console.error('❌ Unexpected error:', err);
  process.exit(1);
});
