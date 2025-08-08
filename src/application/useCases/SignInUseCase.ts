import { IAuthRepository } from '../../domain/specifications/IAuthRepository';
import { UseCase } from '../UseCase';
import SignInDTO from '../DTO/SignInDTO';
import User from '../../domain/entities/User';

export default class SignInUseCase implements UseCase<SignInDTO, Promise<User | null>> {
  constructor(private readonly authRepository: IAuthRepository) {}

  public execute(dto: SignInDTO) {
    return this.authRepository.signIn(dto.email, dto.password);
  }
}
