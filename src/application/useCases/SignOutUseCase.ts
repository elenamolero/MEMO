import { IAuthRepository } from '../../domain/specifications/IAuthRepository';
import { UseCase } from '../UseCase';

export default class SignOutUseCase implements UseCase<void, Promise<void>> {
  constructor(private readonly authRepository: IAuthRepository) {}

  public execute() {
    return this.authRepository.signOut();
  }
}
