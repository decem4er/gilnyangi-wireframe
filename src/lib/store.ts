import { create } from "zustand";
import { Cat } from "./mock";

type Store = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;

  selectedCat: Cat | null;
  selectCat: (cat: Cat) => void;

  hireStep: number;
  setHireStep: (n: number) => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;

  activeFilter: string;
  setActiveFilter: (f: string) => void;

  myPageTab: string;
  setMyPageTab: (t: string) => void;

  chatInput: string;
  setChatInput: (v: string) => void;
};

export const useStore = create<Store>((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),

  selectedCat: null,
  selectCat: (cat) => set({ selectedCat: cat }),

  hireStep: 0,
  setHireStep: (n) => set({ hireStep: n }),

  searchQuery: "",
  setSearchQuery: (q) => set({ searchQuery: q }),

  activeFilter: "전체",
  setActiveFilter: (f) => set({ activeFilter: f }),

  myPageTab: "대시보드",
  setMyPageTab: (t) => set({ myPageTab: t }),

  chatInput: "",
  setChatInput: (v) => set({ chatInput: v }),
}));
