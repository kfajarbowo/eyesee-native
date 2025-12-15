import { atom } from 'jotai';

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: {
    id: string;
    name: string;
    permissions_code: string[];
  };
}

export const userAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom<boolean>(false);
export const authTokenAtom = atom<string | null>(null);
