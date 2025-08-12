export type UserRole = 'supervisor' | 'patient';
export type SupervisorRole = 'familiar' | 'neuropsychologist' | 'doctor';
export type Sex = 'male' | 'female' | 'other';
export type Gender = 'male' | 'female' | 'other';
export type AcademicLevel = 'none' | 'primary' | 'secondary' | 'higher';

export default interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
  password: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
  updatedAt?: string;

  // Supervisor-specific
  supervisor_role?: SupervisorRole | null;

  // Patient-specific
  birth_date?: string | null;
  illness_initiation_date?: string | null;
  illness_name?: string | null;
  GDS_number?: number | null;
  sex?: Sex | null;
  gender?: Gender | null;
  academic_level?: AcademicLevel | null;
}
