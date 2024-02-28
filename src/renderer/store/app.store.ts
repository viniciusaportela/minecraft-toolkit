import { create } from 'zustand';
import React from 'react';
import { IProjectMeta } from '../typings/project-meta.interface';
import { IAppStore } from './interfaces/app-store.interface';

export const useAppStore = create<IAppStore>((set) => ({
  projectMeta: null,
  title: 'My Projects',
  goBack: null,
  customRightElement: null,
  setProjectMeta: (projectMeta: IProjectMeta) => set({ projectMeta }),
  setTitle: (title) => set({ title }),
  setGoBack: (goBack) => set({ goBack }),
  setCustomRightElement: (customRightElement: React.ReactNode) =>
    set({ customRightElement }),
}));