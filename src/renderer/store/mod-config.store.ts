import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { StoreApi } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';
import path from 'path';
import { IBaseModConfig } from './interfaces/mod-config.interface';
import { JsonStorage } from './storages/json-storage';
import { useAppStore } from './app.store';
import { IMod } from './interfaces/mods-store.interface';

export class ModConfigStore {
  constructor() {}

  private static instance: ModConfigStore;

  private stores: Map<string, StoreApi<any>> = new Map();

  static getInstance() {
    if (!this.instance) {
      this.instance = new ModConfigStore();
    }

    return this.instance;
  }

  clear() {
    this.stores.clear();
  }

  get<T extends IBaseModConfig>(mod: IMod): StoreApi<T> {
    const modId = mod.id;
    if (!this.stores.has(modId)) {
      this.stores.set(
        modId,
        create(
          persist(
            immer(() => ({
              isLoaded: false,
            })),
            {
              name: modId,
              storage: new JsonStorage(
                path.join(
                  useAppStore.getState().selectedProject!.path,
                  'minecraft-toolkit',
                  'mods',
                ),
              ),
            },
          ),
        ),
      );
    }

    return this.stores.get(modId)!;
  }
}
