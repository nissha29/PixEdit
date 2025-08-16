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