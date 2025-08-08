import ISupabaseClient from '../../domain/specifications/ISupabaseClient';
import { createClient } from '@supabase/supabase-js';
import Env from '../../domain/entities/Env';

export default class SupabaseClient implements ISupabaseClient {
  private client: any;

  constructor(env: Env) {
    this.client = createClient(env.supabaseUrl, env.supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });
  }

  get auth() {
    return this.client.auth;
  }

  from(table: string) {
    return this.client.from(table);
  }

  get storage() {
    return this.client.storage;
  }

  get functions() {
    return this.client.functions;
  }
}
