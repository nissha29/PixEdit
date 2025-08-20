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
  eraser = 'eraser',
  rectangle = 'rectangle',
  circle = 'circle',
  arrow = 'arrow',
  line = 'line'
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