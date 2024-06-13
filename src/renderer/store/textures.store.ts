import { create } from 'zustand';
import { ITexturesStore } from './interfaces/textures-store.interface';

export const useTexturesStore = create<ITexturesStore>(() => ({
  recipes: [],
  version: 1,
}));
