// store.ts
import { create } from "zustand";

export type TrecentData = { keyword: string; date: string }[];

export interface RecentKeywordState {
  recentKeywordList: TrecentData;
  setRecentKeywordList: (keywords: TrecentData) => void;
}

export const useRecentKeywordStore = create<RecentKeywordState>((set) => ({
  recentKeywordList: [],
  setRecentKeywordList: (keywords) => set({ recentKeywordList: keywords }),
}));
