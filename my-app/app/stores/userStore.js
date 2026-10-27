import { create } from 'zustand';

const useUserStore = create((set) => ({
  userId: null,
  user: null,
  token: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: null, userId: null, token: null, isAuthenticated: false }),
  setToken: (token) => set({ token }),
  setUserId: (userId) => set({ userId, isAuthenticated: true }),
}));

export default useUserStore;