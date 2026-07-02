"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabaseAdmin = exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const ws_1 = __importDefault(require("ws"));
const env_1 = require("./env");
const supabaseUrl = env_1.env.SUPABASE_URL;
const supabaseAnonKey = env_1.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = env_1.env.SUPABASE_SERVICE_ROLE_KEY;
// Initialize Supabase client if credentials are provided, otherwise export null
exports.supabase = supabaseUrl && supabaseAnonKey
    ? (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey, {
        auth: {
            persistSession: false, // Server context should not persist sessions
        },
        realtime: {
            // Provide Node-compatible WebSocket implementation since Node < 22 lacks a native WebSocket constructor
            transport: ws_1.default,
        },
    })
    : null;
// Initialize Supabase Admin client for backend operations
exports.supabaseAdmin = supabaseUrl && supabaseServiceKey
    ? (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
        realtime: {
            transport: ws_1.default,
        },
    })
    : null;
if (!exports.supabase) {
    console.warn('⚠️ Supabase URL or Anon Key is missing in environment variables. Supabase integration is disabled.');
}
else {
    console.log('✅ Supabase client initialized.');
}
if (!exports.supabaseAdmin) {
    console.warn('⚠️ Supabase Service Role Key is missing. Admin-level Supabase operations will be disabled.');
}
else {
    console.log('✅ Supabase admin client initialized.');
}
//# sourceMappingURL=supabase.js.map