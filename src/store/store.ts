import {
  ActiveTabStore,
  AlignType,
  Background,
  BackgroundStore,
  BlurStore,
  BlurType,
  BrushType,
  Dimension,
  DrawingStore,
  FileStore,
  FilterStore,
  FilterType,
  ImageDimensionStore,
  ImagePreviewStore,
  LoadingStore,
  TextBox,
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
  textBoxes: [],
  setTextBoxes: (textBoxes: TextBox[]) => set({ textBoxes }),

  activeTextBoxId: null,
  setActiveTextBoxId: (id: string | null) => set({ activeTextBoxId: id }),

  activeTextBox: null,
  setActiveTextBox: (box: TextBox | null) => set({ activeTextBox: box }),

  textInput: '',
  setTextInput: (value: string) => set({ textInput: value }),

  selectedFont: 'Inter',
  setSelectedFont: (value: string) => set({ selectedFont: value }),

  fontSize: 20,
  setFontSize: (value: number) => set({ fontSize: value }),

  fontWeight: '400',
  setFontWeight: (value: string) => set({ fontWeight: value }),

  textAlign: AlignType.left,
  setTextAlign: (value: AlignType) => set({ textAlign: value }),

  isBold: false,
  setIsBold: (value: boolean) => set({ isBold: value }),

  isItalic: false,
  setIsItalic: (value: boolean) => set({ isItalic: value }),

  isUnderlined: false,
  setIsUnderlined: (value: boolean) => set({ isUnderlined: value }),

  customColor: '#ffffff',
  setCustomColor: (value: string) => set({ customColor: value }),

  selectedTextColor: '#000000',
  setSelectedTextColor: (value: string) => set({ selectedTextColor: value }),
}));

export const useImageDimensionStore = create<ImageDimensionStore>((set) => ({
  imageDimensions: { width: 0, height: 0 },
  setImageDimensions: (imageDimensions: Dimension) => set({ imageDimensions }),
}));

export const useBlurStore = create<BlurStore>((set) => ({
  selectedBlur: BlurType.blur,
  setSelectedBlur: (selectedBlur: BlurType) => set({ selectedBlur }),
}));

