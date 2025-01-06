import { ReactNode } from 'react';

export interface ToastShowOptions {
  placement?: "top" | "bottom";
  duration?: number;
  render: (props: { id: string }) => ReactNode;
}

export interface ToastFunction {
  show: (options: ToastShowOptions) => void;
  close: (id: string) => void;
}

export interface ToastManagerHook {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

export interface ToastProviderProps {
  children: ReactNode;
}