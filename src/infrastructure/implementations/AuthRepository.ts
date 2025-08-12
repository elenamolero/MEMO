import { IAuthRepository } from '../../domain/specifications/IAuthRepository';
import ISupabaseClient from '../../domain/specifications/ISupabaseClient';
import User from '../../domain/entities/User';

export default class AuthRepository implements IAuthRepository {
  constructor(private readonly supabaseClient: ISupabaseClient) {}

  async signUp(signUpData: any): Promise<{ user: User | null; needsConfirmation: boolean }> {
    try {
      // Prepare metadata for Supabase
      const { email, password, name, surname, role, supervisor_role, birth_date, illness_initiation_date, illness_name, GDS_number, sex, gender, academic_level } = signUpData;
      const metadata: any = {
        name,
        surname,
        role,
        supervisor_role,
        birth_date,
        illness_initiation_date,
        illness_name,
        GDS_number,
        sex,
        gender,
        academic_level,
      };
      const { data, error } = await this.supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      if (error) {
        throw error;
      }
      const user = data.user ? this.mapSupabaseUserToEntity(data.user) : null;
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

  private mapSupabaseUserToEntity(supabaseUser: any): User {
    const meta = supabaseUser.user_metadata || {};
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: meta.name || '',
      surname: meta.surname || '',
      password: '', // Never returned from Supabase, must be handled securely elsewhere
      role: meta.role || '',
      avatarUrl: meta.avatarUrl || null,
      createdAt: supabaseUser.created_at,
      updatedAt: supabaseUser.updated_at || supabaseUser.created_at,
      supervisor_role: meta.supervisor_role ?? null,
      birth_date: meta.birth_date ?? null,
      illness_initiation_date: meta.illness_initiation_date ?? null,
      illness_name: meta.illness_name ?? null,
      GDS_number: meta.GDS_number ?? null,
      sex: meta.sex ?? null,
      gender: meta.gender ?? null,
      academic_level: meta.academic_level ?? null,
    };
  }
}
