"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const supabase_1 = require("../../config/supabase");
const database_1 = require("../../config/database");
const apiError_1 = require("../../utils/apiError");
class AuthService {
    /**
     * Registers a new user.
     * If Supabase is active, registers the user via Supabase Auth (admin-confirmed to bypass email verification),
     * syncs them to our PostgreSQL User table, and returns session tokens.
     */
    static async signUp(email, password, name) {
        // ----------------------------------------------------
        // Scenario A: Supabase Integration is ACTIVE
        // ----------------------------------------------------
        if (supabase_1.supabase) {
            let userId;
            let userEmail;
            // 1. If admin client is available, create and auto-confirm user to bypass email verification
            if (supabase_1.supabaseAdmin) {
                const { data, error } = await supabase_1.supabaseAdmin.auth.admin.createUser({
                    email,
                    password,
                    email_confirm: true,
                    user_metadata: { name },
                });
                if (error || !data.user) {
                    throw new apiError_1.ApiError(400, error?.message || 'Failed to create user account.');
                }
                userId = data.user.id;
                userEmail = data.user.email || email;
            }
            else {
                // Fallback to normal signup (subject to Supabase project email confirm settings)
                const { data, error } = await supabase_1.supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { name },
                    },
                });
                if (error || !data.user) {
                    throw new apiError_1.ApiError(400, error?.message || 'Failed to sign up.');
                }
                userId = data.user.id;
                userEmail = data.user.email || email;
            }
            // 2. Sync to local PostgreSQL DB
            let dbUser = await database_1.prisma.user.findUnique({
                where: { id: userId },
            });
            if (!dbUser) {
                dbUser = await database_1.prisma.user.create({
                    data: {
                        id: userId,
                        email: userEmail,
                        name: name || null,
                        role: 'customer',
                    },
                });
            }
            // 3. Authenticate to retrieve dynamic session tokens (access_token, refresh_token)
            const { data: sessionData, error: sessionError } = await supabase_1.supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (sessionError || !sessionData.session) {
                // If email confirmation is required and signInWithPassword fails because of it
                return {
                    user: dbUser,
                    session: null,
                    message: 'Registration successful. Please verify your email to log in.',
                };
            }
            return {
                user: {
                    id: dbUser.id,
                    email: dbUser.email,
                    name: dbUser.name,
                    role: dbUser.role,
                },
                session: {
                    access_token: sessionData.session.access_token,
                    refresh_token: sessionData.session.refresh_token,
                    expires_in: sessionData.session.expires_in,
                    expires_at: sessionData.session.expires_at,
                },
            };
        }
        // ----------------------------------------------------
        // Scenario B: MOCK mode (Supabase is disabled)
        // ----------------------------------------------------
        // Check if user already exists locally
        const existingUser = await database_1.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new apiError_1.ApiError(400, 'User with this email already exists.');
        }
        // Create a new local user
        const mockId = `mock-user-${Date.now()}`;
        const newUser = await database_1.prisma.user.create({
            data: {
                id: mockId,
                email,
                name: name || null,
                role: 'customer',
            },
        });
        return {
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role,
            },
            session: {
                access_token: `mock-user-${newUser.id}`,
                refresh_token: `mock-refresh-${newUser.id}`,
                expires_in: 3600,
                expires_at: Math.floor(Date.now() / 1000) + 3600,
            },
        };
    }
    /**
     * Logs in a user.
     * Authenticates credentials and returns session tokens.
     */
    static async login(email, password) {
        // ----------------------------------------------------
        // Scenario A: Supabase Integration is ACTIVE
        // ----------------------------------------------------
        if (supabase_1.supabase) {
            const { data, error } = await supabase_1.supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error || !data.user || !data.session) {
                throw new apiError_1.ApiError(400, error?.message || 'Invalid email or password.');
            }
            // Sync user to local DB if not already present
            let dbUser = await database_1.prisma.user.findUnique({
                where: { id: data.user.id },
            });
            if (!dbUser) {
                dbUser = await database_1.prisma.user.create({
                    data: {
                        id: data.user.id,
                        email: data.user.email || email,
                        name: data.user.user_metadata?.name || null,
                        role: 'customer',
                    },
                });
            }
            return {
                user: {
                    id: dbUser.id,
                    email: dbUser.email,
                    name: dbUser.name,
                    role: dbUser.role,
                },
                session: {
                    access_token: data.session.access_token,
                    refresh_token: data.session.refresh_token,
                    expires_in: data.session.expires_in,
                    expires_at: data.session.expires_at,
                },
            };
        }
        // ----------------------------------------------------
        // Scenario B: MOCK mode (Supabase is disabled)
        // ----------------------------------------------------
        // Find local user
        const user = await database_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new apiError_1.ApiError(400, 'Invalid email or password.');
        }
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            session: {
                access_token: `mock-user-${user.id}`,
                refresh_token: `mock-refresh-${user.id}`,
                expires_in: 3600,
                expires_at: Math.floor(Date.now() / 1000) + 3600,
            },
        };
    }
}
exports.AuthService = AuthService;
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map