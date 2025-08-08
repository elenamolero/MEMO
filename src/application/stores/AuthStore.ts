import { makeAutoObservable } from 'mobx';
import User from '../../domain/entities/User';
import GetCurrentUserUseCase from '../useCases/GetCurrentUserUseCase';
import SignInUseCase from '../useCases/SignInUseCase';
import SignOutUseCase from '../useCases/SignOutUseCase';
import SignUpUseCase from '../useCases/SignUpUseCase';

export default class AuthStore {
  user: User | null = null;
  isLoading = false;
  error: string | null = null;

  constructor(
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase,
    private readonly signInUseCase: SignInUseCase,
    private readonly signOutUseCase: SignOutUseCase,
    private readonly signUpUseCase: SignUpUseCase
  ) {
    makeAutoObservable(this);
    this.initializeAuth();
  }

  private async initializeAuth() {
    this.setLoading(true);
    try {
      const user = await this.getCurrentUserUseCase.execute();
      this.setUser(user);
    } catch (error) {
      this.setError('Failed to get current user');
      console.error('Auth initialization error:', error);
    } finally {
      this.setLoading(false);
    }
  }

  async signUp(email: string, password: string, name?: string) {
    this.setLoading(true);
    this.setError(null);
    
    try {
      const result = await this.signUpUseCase.execute({ email, password, name });
      
      if (result.needsConfirmation) {
  // User needs to confirm email
        return { success: true, needsConfirmation: true };
      }
      
      this.setUser(result.user);
      return { success: true, needsConfirmation: false };
    } catch (error: any) {
      this.setError(error.message || 'Failed to sign up');
      return { success: false, needsConfirmation: false };
    } finally {
      this.setLoading(false);
    }
  }

  async signIn(email: string, password: string) {
    this.setLoading(true);
    this.setError(null);
    
    try {
      const user = await this.signInUseCase.execute({ email, password });
      this.setUser(user);
      return { success: true };
    } catch (error: any) {
      this.setError(error.message || 'Failed to sign in');
      return { success: false };
    } finally {
      this.setLoading(false);
    }
  }

  async signOut() {
    this.setLoading(true);
    this.setError(null);
    
    try {
      await this.signOutUseCase.execute();
      this.setUser(null);
      return { success: true };
    } catch (error: any) {
      this.setError(error.message || 'Failed to sign out');
      return { success: false };
    } finally {
      this.setLoading(false);
    }
  }

  private setUser(user: User | null) {
    this.user = user;
  }

  private setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  public setError(error: string | null) {
    this.error = error;
  }

  get isAuthenticated(): boolean {
    return this.user !== null;
  }
}
