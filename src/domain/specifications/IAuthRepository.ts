import User from '../entities/User';
import type SignUpDTO from '../../application/DTO/SignUpDTO';
export interface IAuthRepository {
  signUp(dto: SignUpDTO): Promise<{ user: User | null; needsConfirmation: boolean }>;
  signIn(email: string, password: string): Promise<User | null>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}


// ...existing code...
