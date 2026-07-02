import { prisma } from '../src/config/database';

const categoriesData = [
  {
    name: 'Dairy & Eggs',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=120&auto=format&fit=crop&q=80',
  },
  {
    name: 'Fruits & Vegetables',
    image: 'https://images.unsplash.com/photo-1610397613090-a0206a3fcc40?w=120&auto=format&fit=crop&q=80',
  },
  {
    name: 'Beverages',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=120&auto=format&fit=crop&q=80',
  },
  {
    name: 'Pantry Staples',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=120&auto=format&fit=crop&q=80',
  },
  {
    name: 'Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&auto=format&fit=crop&q=80',
  },
];

const featuresData = [
  {
    title: 'Free Delivery',
    subtitle: 'Orders over $20',
    iconName: 'delivery',
  },
  {
    title: '100% Organic',
    subtitle: 'Certified products',
    iconName: 'organic',
  },
  {
    title: 'Same Day',
    subtitle: 'Express delivery',
    iconName: 'delivery-time',
  },
  {
    title: 'Secure Pay',
    subtitle: 'Safe checkout',
    iconName: 'secure-pay',
  },
];

const productsData = [
  // Dairy & Eggs
  {
    name: 'Cheese 200g',
    rating: 4.5,
    ratingCount: 12,
    price: 130.0,
    unit: '200g',
    originalPrice: 140.0,
    discount: 7,
    image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=300&auto=format&fit=crop&q=80',
    categoryName: 'Dairy & Eggs',
  },
  {
    name: 'Paneer 200g',
    rating: 4.5,
    ratingCount: 12,
    price: 85.0,
    unit: '200g',
    originalPrice: 90.0,
    discount: 6,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&auto=format&fit=crop&q=80',
    categoryName: 'Dairy & Eggs',
  },
  {
    name: 'Eggs 12 pcs',
    rating: 4.5,
    ratingCount: 12,
    price: 85.0,
    unit: '12pcs',
    originalPrice: 90.0,
    discount: 6,
    image: 'https://images.unsplash.com/photo-1516448424440-9dbca97779c1?w=300&auto=format&fit=crop&q=80',
    categoryName: 'Dairy & Eggs',
  },
  // Fruits & Vegetables
  {
    name: 'Carrot 500g',
    rating: 4.5,
    ratingCount: 12,
    price: 44.0,
    unit: '500g',
    originalPrice: 50.0,
    discount: 12,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&auto=format&fit=crop&q=80',
    categoryName: 'Fruits & Vegetables',
  },
  {
    name: 'Banana 1 kg',
    rating: 4.5,
    ratingCount: 12,
    price: 45.0,
    unit: '1kg',
    originalPrice: 50.0,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&auto=format&fit=crop&q=80',
    categoryName: 'Fruits & Vegetables',
  },
  {
    name: 'Onion 500g',
    rating: 4.5,
    ratingCount: 12,
    price: 45.0,
    unit: '500g',
    originalPrice: 50.0,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1508747703725-7197771375e0?w=300&auto=format&fit=crop&q=80',
    categoryName: 'Fruits & Vegetables',
  },
  {
    name: 'Grapes 500g',
    rating: 4.5,
    ratingCount: 12,
    price: 65.0,
    unit: '500g',
    originalPrice: 70.0,
    discount: 7,
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=300&auto=format&fit=crop&q=80',
    categoryName: 'Fruits & Vegetables',
  },
  // Beverages
  {
    name: 'Fanta 1.5L',
    rating: 4.5,
    ratingCount: 12,
    price: 65.0,
    unit: '1.5L',
    originalPrice: 70.0,
    discount: 7,
    image: 'https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?w=300&auto=format&fit=crop&q=80',
    categoryName: 'Beverages',
  },
  {
    name: 'Sprite 1.5L',
    rating: 4.5,
    ratingCount: 12,
    price: 60.0,
    unit: '1.5L',
    originalPrice: 75.0,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1625772290748-39093c399e2e?w=300&auto=format&fit=crop&q=80',
    categoryName: 'Beverages',
  },
  // Pantry Staples
  {
    name: 'Basmati Rice 5kg',
    rating: 4.5,
    ratingCount: 12,
    price: 520.0,
    unit: '5kg',
    originalPrice: 550.0,
    discount: 5,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&auto=format&fit=crop&q=80',
    categoryName: 'Pantry Staples',
  },
  // Bakery
  {
    name: 'Whole Wheat Bread',
    rating: 4.4,
    ratingCount: 8,
    price: 45.0,
    unit: '400g',
    originalPrice: 48.0,
    discount: 5,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80',
    categoryName: 'Bakery',
  },
];

async function main() {
  console.log('🌱 Starting seed database...');

  // 1. Clean out existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.feature.deleteMany();

  console.log('🧹 Cleaned previous database entries.');

  // 2. Seed Features
  const features = await Promise.all(
    featuresData.map((feature) => prisma.feature.create({ data: feature }))
  );
  console.log(`✅ Seeded ${features.length} homepage features.`);

  // 3. Seed Categories
  const categoriesMap = new Map<string, string>();
  for (const cat of categoriesData) {
    const category = await prisma.category.create({
      data: {
        name: cat.name,
        image: cat.image,
      },
    });
    categoriesMap.set(cat.name, category.id);
  }
  console.log(`✅ Seeded ${categoriesData.length} categories.`);

  // 4. Seed Products
  let productCount = 0;
  for (const prod of productsData) {
    const categoryId = categoriesMap.get(prod.categoryName);
    if (!categoryId) {
      console.warn(`⚠️ Category ID not found for: ${prod.categoryName}`);
      continue;
    }

    const { categoryName, ...productPayload } = prod;

    await prisma.product.create({
      data: {
        ...productPayload,
        categoryId,
      },
    });
    productCount++;
  }
  console.log(`✅ Seeded ${productCount} products.`);

  // 5. Create a Seed Admin User
  const adminUser = await prisma.user.create({
    data: {
      id: 'mock-admin-uuid',
      email: 'admin@hossenshop.com',
      name: 'Super Admin',
      role: 'admin',
    },
  });
  console.log(`✅ Seeded admin user: ${adminUser.email}`);

  // 6. Create a Seed Customer User
  const customerUser = await prisma.user.create({
    data: {
      id: 'mock-user-uuid',
      email: 'customer@gmail.com',
      name: 'Regular Customer',
      role: 'customer',
    },
  });
  console.log(`✅ Seeded customer user: ${customerUser.email}`);

  console.log('🎉 Seed database process completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
