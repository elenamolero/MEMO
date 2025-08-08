import User from '../entities/User';

export interface IAuthRepository {
  signUp(email: string, password: string, name?: string): Promise<{ user: User | null; needsConfirmation: boolean }>;
  signIn(email: string, password: string): Promise<User | null>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}
