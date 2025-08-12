import User, { UserRole, SupervisorRole, Sex, Gender, AcademicLevel } from './User';

/**
 * Validates a User object according to its role.
 * - Supervisor can only have supervisor_role set, patient fields must be null/undefined.
 * - Patient can only have patient fields set, supervisor_role must be null/undefined.
 * - Shared fields must always be present.
 * Throws an error if validation fails.
 */
export function validateUser(user: User): void {
  if (!user.email || !user.name || !user.surname || !user.password || !user.role) {
    throw new Error('Missing required shared user fields.');
  }

  if (user.role === 'supervisor') {
    if (!user.supervisor_role) {
      throw new Error('Supervisor must have supervisor_role defined.');
    }
    // Patient fields must be null or undefined
    if (
      user.birth_date ||
      user.illness_initiation_date ||
      user.illness_name ||
      user.GDS_number ||
      user.sex ||
      user.gender ||
      user.academic_level
    ) {
      throw new Error('Supervisor cannot have patient-specific fields.');
    }
  } else if (user.role === 'patient') {
    // At least one patient field should be present (optional, can be customized)
    if (
      !user.birth_date &&
      !user.illness_initiation_date &&
      !user.illness_name &&
      !user.GDS_number &&
      !user.sex &&
      !user.gender &&
      !user.academic_level
    ) {
      throw new Error('Patient must have at least one patient-specific field.');
    }
    // Supervisor field must be null or undefined
    if (user.supervisor_role) {
      throw new Error('Patient cannot have supervisor_role set.');
    }
  } else {
    throw new Error('Invalid user role.');
  }
}
