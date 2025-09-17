import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className: string;
}

export type User = {
  name: string;
  email: string;
};

export type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export type FileData = {
  file: File,
  name: string | null,
  type: string | null,
  size: number | null,
}

export type FileStore = {
  file: FileData | null,
  setFile: (newFile: FileData) => void,
  clearFile: () => void,
}

export type ImagePreviewStore = {
  dataURL: string | null,
  setDataURL: (dataURL: string | null) => void,
  clearDataURL: () => void,

  originalDataURL: string | null,
  setOriginalDataURL: (originalDataURL: string | null) => void,
  clearOriginalDataURL: () => void,
}

export type ActiveTabStore = {
  activeTab: string | null;
  setActiveTab: (activeTab: string | null) => void,
}

export type BackgroundType = 'color' | 'gradient' | 'image' | null;

export type Background = {
  type: BackgroundType;
  value: string | null;
} | null;

export type BackgroundStore = {
  background: Background,
  setBackground: (background: Background) => void,

  hasRemovedBackground: boolean,
  setHasRemovedBackground: (value: boolean) => void,
}

export type LoadingStore = {
  loading: boolean,
  setLoading: (value: boolean) => void,
}

export type FilterType = {
  name: string,
  class: string,
} | null;

export type FilterStore = {
  filter: FilterType,
  setFilter: (filter: FilterType) => void
}

export enum ToolType {
  brush = 'brush',
  pencil = 'pencil',
  dotted = 'dotted',
  chalk = 'chalk',
}

export enum BrushType {
  round = 'round',
  square = 'square',
  soft = 'soft'
}

export type Stroke = {
  tool: ToolType,
  type: BrushType,
  color: string,
  size: number,
  points: { x: number, y: number }[],
}

export type DrawingStore = {
  tool: ToolType,
  selectedColor: string,
  brushSize: number,
  brushType: BrushType,
  setTool: (tool: ToolType) => void,
  setSelectedColor: (color: string) => void,
  setBrushSize: (size: number) => void,
  setBrushType: (type: BrushType) => void,

  strokes: Stroke[],
  setStrokes: (updater: (prev: Stroke[]) => Stroke[]) => void;
}

export enum AlignType {
  left = 'left',
  right = 'right',
  center = 'center',
}

export type TextBox = {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  isBold: boolean;
  isItalic: boolean;
  isUnderlined: boolean;
  textAlign: CanvasTextAlign;
  color: string;
};

export type TextStore = {
  textBoxes: TextBox[];
  setTextBoxes: (textBoxes: TextBox[]) => void;

  activeTextBoxId: string | null;
  setActiveTextBoxId: (id: string | null) => void;

  activeTextBox: TextBox | null;
  setActiveTextBox: (box: TextBox | null) => void;

  textInput: string;
  setTextInput: (value: string) => void;

  selectedFont: string;
  setSelectedFont: (value: string) => void;

  fontSize: number;
  setFontSize: (value: number) => void;

  fontWeight: string;
  setFontWeight: (value: string) => void;

  textAlign: AlignType;
  setTextAlign: (value: AlignType) => void;

  isBold: boolean;
  setIsBold: (value: boolean) => void;

  isItalic: boolean;
  setIsItalic: (value: boolean) => void;

  isUnderlined: boolean;
  setIsUnderlined: (value: boolean) => void;

  customColor: string;
  setCustomColor: (value: string) => void;

  selectedTextColor: string;
  setSelectedTextColor: (value: string) => void;
};

export type Dimension = {
  width: number,
  height: number,
}

export type ImageDimensionStore = {
  imageDimensions: Dimension,
  setImageDimensions: (imageDimensions: Dimension) => void
}

export enum BlurType {
  pixelate = 'pixelate',
  smudge = 'smudge',
}

export type Blurs = {
  type: BlurType;
  points: { x: number; y: number }[];
  radius: number;
  strength: number;
};


export type BlurStore = {
  selectedBlur: BlurType,
  setSelectedBlur: (selectedBlur: BlurType) => void,

  blurRadius: number,
  setBlurRadius: (blurRadius: number) => void,

  blurStrength: number,
  setBlurStrength: (brushSize: number) => void,

  blurs: Blurs[],
  setBlurs: (blurs: Blurs[] | ((prev: Blurs[]) => Blurs[])) => void;
}

export type CropStore = {
  rotation: number,
  setRotation: (rotation: number) => void,

  selectedRatio: string,
  setSelectedRatio: (selectedRatio: string) => void,

  cropBox: { minX: number; minY: number; maxX: number; maxY: number },
  setCropBox: (cropBox: { minX: number; minY: number; maxX: number; maxY: number }) => void,

  isCropping: boolean,
  setIsCropping: (isCropping: boolean) => void,
}

export type UndoRedoState<T> = {
  past: T[];
  present: T | null;
  future: T[];
  set: (newPresent: T) => void;
  undo: () => void;
  redo: () => void;
  clear: () => void;
}

export type EditorState = {
  textBoxes: TextBox[];
  cropBox: { minX: number; minY: number; maxX: number; maxY: number };
  rotation: number;
  blurs: Blurs[];
  strokes: Stroke[];
  background: Background | null;
  filter: { name: string; class: string };
};

export type RightPanelStore = {
  isRightPanelOpen: boolean,
  setIsRightPanelOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export type LeftPanelStore = {
  isLeftPanelOpen: boolean,
  setIsLeftPanelOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
}