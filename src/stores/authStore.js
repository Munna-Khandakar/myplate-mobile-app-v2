import create from 'zustand';
const useAuthStore = create(set => ({
  user: {},
  user_token: null,

  storeUser: params =>
    set(state => ({
      user: params,
    })),
  storeUserToken: params =>
    set(state => ({
      user_token: params,
    })),
  logout: () =>
    set(state => ({
      user_token: null,
      uesr: {},
    })),
}));
export default useAuthStore;
