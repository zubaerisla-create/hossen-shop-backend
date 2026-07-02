export declare class AuthService {
    /**
     * Registers a new user.
     * If Supabase is active, registers the user via Supabase Auth (admin-confirmed to bypass email verification),
     * syncs them to our PostgreSQL User table, and returns session tokens.
     */
    static signUp(email: string, password: string, name?: string): Promise<{
        user: {
            name: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            role: string;
        };
        session: null;
        message: string;
    } | {
        user: {
            id: string;
            email: string;
            name: string | null;
            role: string;
        };
        session: {
            access_token: string;
            refresh_token: string;
            expires_in: number;
            expires_at: number | undefined;
        };
        message?: undefined;
    }>;
    /**
     * Logs in a user.
     * Authenticates credentials and returns session tokens.
     */
    static login(email: string, password: string): Promise<{
        user: {
            id: string;
            email: string;
            name: string | null;
            role: string;
        };
        session: {
            access_token: string;
            refresh_token: string;
            expires_in: number;
            expires_at: number | undefined;
        };
    }>;
}
export default AuthService;
