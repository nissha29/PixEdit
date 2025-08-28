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

export type FileStore = {
  file: File | null,
  setFile: (newFile: File) => void,
  clearFile: () => void,
}

export type ImagePreviewStore = {
  dataURL: string | null,
  setDataURL: (dataURL: string | null) => void,
  clearDataURL: () => void,
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

export type DrawingStore = {
  tool: ToolType,
  selectedColor: string,
  brushSize: number,
  brushType: BrushType,
  setTool: (tool: ToolType) => void,
  setSelectedColor: (color: string) => void,
  setBrushSize: (size: number) => void,
  setBrushType: (type: BrushType) => void,
}

export enum AlignType {
  left =  'left',
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
  snowy = 'snowy',
  blur = 'blur',
}

export type BlurStore = {
  selectedBlur: BlurType,
  setSelectedBlur: (selectedBlur: BlurType) => void,

  blurRadius: number,
  setBlurRadius: (blurRadius: number) => void,

  blurStrength: number,
  setBlurStrength: (brushSize: number) => void,
}