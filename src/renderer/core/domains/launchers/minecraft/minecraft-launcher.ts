import { stat } from 'node:fs/promises';
import { BaseLauncher } from '../base/base-launcher';
import { MinecraftDirectory } from './minecraft-directory';
import { IProject } from '../../../../store/interfaces/project.interface';

export class MinecraftLauncher extends BaseLauncher {
  private static instance: MinecraftLauncher;

  static getInstance() {
    if (!this.instance) {
      this.instance = new MinecraftLauncher();
    }

    return this.instance;
  }

  async getModpacksFolders(): Promise<string[]> {
    const minecraftPath = this.getMinecraftRoot();

    if (!minecraftPath) {
      return [];
    }

    const exists = await stat(minecraftPath)
      .then(() => true)
      .catch(() => false);

    if (!exists) {
      return [];
    }

    return [minecraftPath];
  }

  toDirectory(folderPath: string): MinecraftDirectory {
    return new MinecraftDirectory(folderPath);
  }

  async genProjectFromFolder(folderPath: string): Promise<IProject> {
    const modPaths = await this.toDirectory(folderPath).getAllModsPaths();

    return {
      name: 'Minecraft',
      path: folderPath,
      minecraftVersion: 'unknown',
      loaderVersion: 'unknown',
      loader: 'unknown',
      launcher: 'minecraft',
      modCount: modPaths.length,
      isLoaded: false,
      index: -1,
      lastOpenAt: null,
      orphan: false,
    };
  }

  async isFolderOfThisLauncher(folder: string) {
    const pathSplit = folder.split('/');
    const lastFolder = pathSplit[pathSplit.length - 1];
    return lastFolder === '.minecraft';
  }
}
