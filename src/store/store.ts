import { 
  ActiveTabStore, 
  AlignType, 
  Background, 
  BackgroundStore, 
  BrushType, 
  DrawingStore, 
  FileStore, 
  FilterStore, 
  FilterType, 
  ImagePreviewStore, 
  LoadingStore, 
  TextStore, 
  ToolType, 
  UserStore 
} from '../types/types';
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

export const useDrawingStore = create<DrawingStore>((set) => ({
  tool: ToolType.brush,
  selectedColor: '#000000',
  brushSize: 5,
  brushType: BrushType.round,
  setTool: (tool: ToolType) => set({ tool }),
  setSelectedColor: (color: string) => set({ selectedColor: color }),
  setBrushSize: (size: number) => set({ brushSize: size }),
  setBrushType: (type: BrushType) => set({ brushType: type }),
}));

export const useTextStore = create<TextStore>((set) => ({
  textInput: '',
  setTextInput: (value) => set({ textInput: value }),

  selectedFont: 'Inter',
  setSelectedFont: (value) => set({ selectedFont: value }),

  fontSize: 48,
  setFontSize: (value) => set({ fontSize: value }),

  fontWeight: '400',
  setFontWeight: (value) => set({ fontWeight: value }),

  letterSpacing: 0,
  setLetterSpacing: (value) => set({ letterSpacing: value }),

  lineHeight: 1.2,
  setLineHeight: (value) => set({ lineHeight: value }),

  textAlign: AlignType.left,
  setTextAlign: (value) => set({ textAlign: value }),

  isBold: false,
  setIsBold: (value) => set({ isBold: value }),

  isItalic: false,
  setIsItalic: (value) => set({ isItalic: value }),

  isUnderlined: false,
  setIsUnderlined: (value) => set({ isUnderlined: value }),

  customColor: '#ffffff',
  setCustomColor: (value) => set({ customColor: value }),

  selectedTextColor: null,
  setSelectedTextColor: (value) => set({ selectedTextColor: value }),
}));
