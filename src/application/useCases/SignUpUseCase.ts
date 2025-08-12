import { IAuthRepository } from '../../domain/specifications/IAuthRepository';
import { UseCase } from '../UseCase';
import SignUpDTO from '../DTO/SignUpDTO';
import User from '../../domain/entities/User';

export default class SignUpUseCase implements UseCase<SignUpDTO, Promise<{ user: User | null; needsConfirmation: boolean }>> {
  constructor(private readonly authRepository: IAuthRepository) {}

  public execute(dto: SignUpDTO) {
    return this.authRepository.signUp(
      dto.email,
      dto.password,
      dto.name,
      dto.surname,
      dto.role,
      dto.supervisor_role,
      dto.birth_date,
      dto.illness_initiation_date,
      dto.illness_name,
      dto.GDS_number,
      dto.sex,
      dto.gender,
      dto.academic_level
    );
  }
}
