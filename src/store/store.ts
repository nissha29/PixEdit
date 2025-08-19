import { ActiveTabStore, Background, BackgroundStore, FileStore, FilterStore, FilterType, ImagePreviewStore, LoadingStore, UserStore } from '../types/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: 'user-storage' }
  )
);

export const useFileStore = create<FileStore>()(
  (set) => ({
    file: null,
    setFile: (file: File) => set({ file }),
    clearFile: () => set({ file: null }),
  }),
);

export const useImagePreviewStore = create<ImagePreviewStore>()(
  persist(
    (set) => ({
      dataURL: null,
      setDataURL: (dataURL: string | null) => set({ dataURL }),
      clearDataURL: () => set({ dataURL: null }),
    }),
    { name: 'image-preview-storage' }
  )
);

export const useActiveTabStore = create<ActiveTabStore>()(
  (set) => ({
    activeTab: 'background',
    setActiveTab: (activeTab: string | null) => set({ activeTab }),
  }),
);

export const useBackgroundStore = create<BackgroundStore>()(
  (set) => ({
    background: null,
    setBackground: (background: Background) => set({ background }),
  }),
);

export const useLoadingStore = create<LoadingStore>((set) => ({
  loading: false,
  setLoading: (value: boolean) => set({ loading: value }),
}));

export const useFilterStore = create<FilterStore>((set) => ({
  filter: null,
  setFilter: (filter: FilterType | null) => set({ filter }),
}));
