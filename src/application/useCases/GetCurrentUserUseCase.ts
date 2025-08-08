import { IAuthRepository } from '../../domain/specifications/IAuthRepository';
import { UseCase } from '../UseCase';
import User from '../../domain/entities/User';

export default class GetCurrentUserUseCase implements UseCase<void, Promise<User | null>> {
  constructor(private readonly authRepository: IAuthRepository) {}

  public execute() {
    return this.authRepository.getCurrentUser();
  }
}
