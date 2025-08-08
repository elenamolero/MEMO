import Env from './domain/entities/Env';
import SupabaseClient from './infrastructure/implementations/SupabaseClient';
import ISupabaseClient from './domain/specifications/ISupabaseClient';
import { AuthModule } from './modules/AuthModule';

class CoreContainer {
  private static instance: CoreContainer;
  
  // EAGER: Dependencias críticas
  private readonly _env: Env;
  private readonly _supabaseClient: ISupabaseClient;
  
  // LAZY: Módulos por funcionalidad
  private _authModule: AuthModule | null = null;

  private constructor() {
    // Eager initialization para dependencias críticas
    this._env = {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
      apiUrl: process.env.EXPO_PUBLIC_API_URL || '',
    };
    
    this._supabaseClient = new SupabaseClient(this._env);
    
    // Validar configuración crítica al inicio
    this.validateCriticalConfig();
  }

  private validateCriticalConfig(): void {
    if (!this._env.supabaseUrl || !this._env.supabaseAnonKey) {
      throw new Error('Missing critical Supabase configuration. Check your .env file.');
    }
  }

  public static getInstance(): CoreContainer {
    if (!CoreContainer.instance) {
      CoreContainer.instance = new CoreContainer();
    }
    return CoreContainer.instance;
  }

  // Getters para dependencias críticas (eager)
  public get env(): Env {
    return this._env;
  }

  public get supabaseClient(): ISupabaseClient {
    return this._supabaseClient;
  }

  // Getters para módulos (lazy)
  public get authModule(): AuthModule {
    if (!this._authModule) {
      this._authModule = new AuthModule(this._supabaseClient);
    }
    return this._authModule;
  }

  // Convenience getters
  public get authStore() {
    return this.authModule.authStore;
  }

  public get authRepository() {
    return this.authModule.authRepository;
  }

  public get signInUseCase() {
    return this.authModule.signInUseCase;
  }

  public get signOutUseCase() {
    return this.authModule.signOutUseCase;
  }

  public get signUpUseCase() {
    return this.authModule.signUpUseCase;
  }

  public get getCurrentUserUseCase() {
    return this.authModule.getCurrentUserUseCase;
  }
}

export const coreContainer = CoreContainer.getInstance();
export default coreContainer;
