import { SocialProvider } from '@/core/types';

export interface Credentials {
  email: string;
  password: string;
}

export interface Config {
  appId: string;
  socialProvider?: SocialProvider;
}

export interface ParentMethods {
  emit(event: 'onLogin', data: Credentials): void;
}
