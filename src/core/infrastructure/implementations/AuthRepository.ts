import { IAuthRepository } from '../../domain/specifications/IAuthRepository';
import ISupabaseClient from '../../domain/specifications/ISupabaseClient';
import User from '../../domain/entities/User';

export default class AuthRepository implements IAuthRepository {
  constructor(private readonly supabaseClient: ISupabaseClient) {}

  async signUp(email: string, password: string, name?: string): Promise<{ user: User | null; needsConfirmation: boolean }> {
    try {
      const { data, error } = await this.supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        throw error;
      }

      const user = data.user ? this.mapSupabaseUserToEntity(data.user, name) : null;
      const needsConfirmation = !data.session;

      return { user, needsConfirmation };
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<User | null> {
    try {
      const { data, error } = await this.supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      return data.user ? this.mapSupabaseUserToEntity(data.user) : null;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      const { error } = await this.supabaseClient.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user } } = await this.supabaseClient.auth.getUser();
      return user ? this.mapSupabaseUserToEntity(user) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  private mapSupabaseUserToEntity(supabaseUser: any, name?: string): User {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: name || supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || '',
      avatarUrl: supabaseUser.user_metadata?.avatar_url || null,
      createdAt: supabaseUser.created_at,
      updatedAt: supabaseUser.updated_at || supabaseUser.created_at,
    };
  }
}
