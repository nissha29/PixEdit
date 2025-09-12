import {
  ActiveTabStore,
  AlignType,
  Background,
  BackgroundStore,
  BlurStore,
  BlurType,
  BrushType,
  CropStore,
  Dimension,
  DrawingStore,
  EditorState,
  FileData,
  FileStore,
  FilterStore,
  FilterType,
  ImageDimensionStore,
  ImagePreviewStore,
  LoadingStore,
  TextBox,
  TextStore,
  ToolType,
  UndoRedoState,
  UserStore,
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
  persist(
    (set) => ({
      file: null,
      setFile: (file: FileData) => set({ file }),
      clearFile: () => set({ file: null }),
    }),
    { name: 'file-storage' }
  )
);

export const useImagePreviewStore = create<ImagePreviewStore>()(
  persist(
    (set) => ({
      dataURL: null,
      setDataURL: (dataURL: string | null) => set({ dataURL }),
      clearDataURL: () => set({ dataURL: null }),

      originalDataURL: null,
      setOriginalDataURL: (originalDataURL: string | null) => set({ originalDataURL }),
      clearOriginalDataURL: () => set({ originalDataURL: null })
    }),
    { name: 'image-preview-storage' }
  )
);

export const useActiveTabStore = create<ActiveTabStore>()(
  (set) => ({
    activeTab: 'crop',
    setActiveTab: (activeTab: string | null) => set({ activeTab }),
  }),
);

export const useBackgroundStore = create<BackgroundStore>()(
  persist(
    (set) => ({
      background: null,
      setBackground: (background: Background) => set({ background }),

      hasRemovedBackground: false,
      setHasRemovedBackground: (value: boolean) => set({ hasRemovedBackground: value }),
    }),
    { name: 'background-storage' }
  )
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

  strokes: [],
  setStrokes: (updater) =>
    set((state) => ({
      strokes: updater(state.strokes),
    })),
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

  fontSize: 50,
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

  selectedTextColor: '#fffffff',  
  setSelectedTextColor: (value: string) => set({ selectedTextColor: value }),
}));

export const useImageDimensionStore = create<ImageDimensionStore>((set) => ({
  imageDimensions: { width: 0, height: 0 },
  setImageDimensions: (imageDimensions: Dimension) => set({ imageDimensions }),
}));

export const useBlurStore = create<BlurStore>((set) => ({
  selectedBlur: BlurType.pixelate,
  setSelectedBlur: (selectedBlur: BlurType) => set({ selectedBlur }),

  blurRadius: 10,
  setBlurRadius: (blurRadius: number) => set({ blurRadius }),

  blurStrength: 25,
  setBlurStrength: (blurStrength: number) => set({ blurStrength }),

  blurs: [],
  setBlurs: (blurs) => set((state) => ({
    blurs: typeof blurs === 'function' ? blurs(state.blurs) : blurs
  })),
}));

export const useCropStore = create<CropStore>((set) => ({
  rotation: 0,
  setRotation: (rotation: number) => set({ rotation }),

  selectedRatio: 'Free Form',
  setSelectedRatio: (selectedRatio: string) => set({ selectedRatio }),

  cropBox: { minX: 0, minY: 0, maxX: 0, maxY: 0 },
  setCropBox: (cropBox: { minX: number; minY: number; maxX: number; maxY: number }) => set({ cropBox }),

  isCropping: true,
  setIsCropping: (isCropping: boolean) => set({ isCropping }),
}));

export const createUndoRedoStore = <T>(initial: T) =>
  create<UndoRedoState<T>>((set) => ({
    past: [],
    present: initial,
    future: [],
    set: (newPresent: T) =>
      set((state) => ({
        past: state.present !== null ? [...state.past, state.present] : state.past,
        present: newPresent,
        future: [],
      })),
    undo: () =>
      set((state) => {
        if (state.past.length === 0) return state;
        const previous = state.past[state.past.length - 1];
        const newPast = state.past.slice(0, -1);
        return {
          past: newPast,
          present: previous,
          future: [state.present!, ...state.future],
        };
      }),
    redo: () =>
      set((state) => {
        if (state.future.length === 0) return state;
        const next = state.future[0];
        const newFuture = state.future.slice(1);
        return {
          past: [...state.past, state.present!],
          present: next,
          future: newFuture,
        };
      }),
    clear: () => set({ past: [], present: initial, future: [] }),
  }));

export const useEditorUndoRedoStore = createUndoRedoStore<EditorState>({
  textBoxes: [],
  cropBox: { minX: 0, minY: 0, maxX: 0, maxY: 0 },
  rotation: 0,
  blurs: [],
  strokes: [],
  background: null,
  filter: { name: "None", class: "" },
}); 