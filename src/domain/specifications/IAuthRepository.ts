import User from '../entities/User';
import { UserRole, SupervisorRole, Sex, Gender, AcademicLevel } from '../entities/User';

export interface IAuthRepository {
  signUp(
    email: string,
    password: string,
    name: string,
    surname: string,
    role: UserRole,
    supervisor_role?: SupervisorRole | null,
    birth_date?: string | null,
    illness_initiation_date?: string | null,
    illness_name?: string | null,
    GDS_number?: number | null,
    sex?: Sex | null,
    gender?: Gender | null,
    academic_level?: AcademicLevel | null
  ): Promise<{ user: User | null; needsConfirmation: boolean }>;
  signIn(email: string, password: string): Promise<User | null>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}


// ...existing code...
