import { create } from 'zustand';
import React from 'react';
import { IAppStore } from './interfaces/app-store.interface';

export const useAppStore = create<IAppStore>((set) => ({
  projectMeta: null,
  title: 'My Projects',
  goBack: null,
  realm: null as any,
  selectedProjectId: null as any,
  headerMiddleComponent: null,
  configListeners: new Map(),
  setTitle: (title) => set({ title }),
  setGoBack: (goBack) => set({ goBack }),
  setHeaderMiddleComponent: (headerMiddleComponent: React.ReactNode) =>
    set({ headerMiddleComponent }),
}));
