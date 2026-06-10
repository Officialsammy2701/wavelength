import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  token: null,
  soundIdentity: null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setSoundIdentity: (soundIdentity) => set({ soundIdentity }),
  logout: () => {
    localStorage.removeItem('wl_token');
    set({ user: null, token: null, soundIdentity: null });
  },
}));

export default useStore;