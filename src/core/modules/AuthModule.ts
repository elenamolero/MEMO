// src/core/modules/AuthModule.ts
import { IAuthRepository } from '../domain/specifications/IAuthRepository';
import AuthRepository from '../infrastructure/implementations/AuthRepository';
import AuthStore from '../application/stores/AuthStore';
import SignInUseCase from '../application/useCases/SignInUseCase';
import SignOutUseCase from '../application/useCases/SignOutUseCase';
import SignUpUseCase from '../application/useCases/SignUpUseCase';
import GetCurrentUserUseCase from '../application/useCases/GetCurrentUserUseCase';
import ISupabaseClient from '../domain/specifications/ISupabaseClient';

export class AuthModule {
  private _authRepository: IAuthRepository | null = null;
  private _authStore: AuthStore | null = null;
  private _signInUseCase: SignInUseCase | null = null;
  private _signOutUseCase: SignOutUseCase | null = null;
  private _signUpUseCase: SignUpUseCase | null = null;
  private _getCurrentUserUseCase: GetCurrentUserUseCase | null = null;

  constructor(private readonly supabaseClient: ISupabaseClient) {}

  public get authRepository(): IAuthRepository {
    if (!this._authRepository) {
      this._authRepository = new AuthRepository(this.supabaseClient);
    }
    return this._authRepository;
  }

  public get signInUseCase(): SignInUseCase {
    if (!this._signInUseCase) {
      this._signInUseCase = new SignInUseCase(this.authRepository);
    }
    return this._signInUseCase;
  }

  public get signOutUseCase(): SignOutUseCase {
    if (!this._signOutUseCase) {
      this._signOutUseCase = new SignOutUseCase(this.authRepository);
    }
    return this._signOutUseCase;
  }

  public get signUpUseCase(): SignUpUseCase {
    if (!this._signUpUseCase) {
      this._signUpUseCase = new SignUpUseCase(this.authRepository);
    }
    return this._signUpUseCase;
  }

  public get getCurrentUserUseCase(): GetCurrentUserUseCase {
    if (!this._getCurrentUserUseCase) {
      this._getCurrentUserUseCase = new GetCurrentUserUseCase(this.authRepository);
    }
    return this._getCurrentUserUseCase;
  }

  public get authStore(): AuthStore {
    if (!this._authStore) {
      this._authStore = new AuthStore(
        this.getCurrentUserUseCase,
        this.signInUseCase,
        this.signOutUseCase,
        this.signUpUseCase
      );
    }
    return this._authStore;
  }
}
