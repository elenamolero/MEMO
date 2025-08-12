import { IAuthRepository } from '../../domain/specifications/IAuthRepository';
import { UseCase } from '../UseCase';
import SignUpDTO from '../DTO/SignUpDTO';
import User from '../../domain/entities/User';

export default class SignUpUseCase implements UseCase<SignUpDTO, Promise<{ user: User | null; needsConfirmation: boolean }>> {
  constructor(private readonly authRepository: IAuthRepository) {}

  public execute(dto: SignUpDTO) {
    console.log('SignUpUseCase DTO:', dto);
    return this.authRepository.signUp(dto);
  }
}
