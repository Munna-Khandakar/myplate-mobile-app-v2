import {create} from 'zustand';

interface AuthStore {
  user: any;
  user_token: string | null;
  storeUser: (params: any) => void;
  storeUserToken: (params: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>(set => ({
  user: null,
  user_token: null,

  storeUser: (params: any) =>
    set({
      user: params,
    }),
  storeUserToken: (params: string) =>
    set({
      user_token: params,
    }),
  logout: () =>
    set({
      user_token: null,
      user: null,
    }),
}));

export default useAuthStore;
