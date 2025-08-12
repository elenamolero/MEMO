import { UserRole, SupervisorRole, Sex, Gender, AcademicLevel } from '../../domain/entities/User';

export default interface SignUpDTO {
  email: string;
  password: string;
  name: string;
  surname: string;
  role: UserRole;

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
