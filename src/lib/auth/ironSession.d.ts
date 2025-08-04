// src/lib/auth/ironSession.d.ts
import "iron-session";
import {User} from '@/lib/types/auth';

declare module "iron-session" {
  interface IronSessionData {
    accessToken?: string;
    user?: User;
  }
}