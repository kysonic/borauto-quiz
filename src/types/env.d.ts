/// <reference types="vite/client" />

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
    readonly VITE_SUPABASE_KEY: string;
}
