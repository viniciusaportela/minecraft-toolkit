import path from 'path';
import { useAppStore } from '../../../../store/app.store';
import { useItemsStore } from '../../../../store/items.store';

let instance: TextureLoader;

export class TextureLoader {
  static getInstance() {
    if (!instance) {
      instance = new TextureLoader();
    }
    return instance;
  }

  getTextureFromItem(itemId: string) {
    const item = useItemsStore((st) => st.items.find((i) => i.id === itemId));

    const modId = item?.mod;
    const withoutModId = itemId.split(':')[1];

    const textureId = `${modId}:textures/${item?.isBlock ? 'block' : 'item'}/${withoutModId}.png`;

    return {
      isBlock: item?.isBlock,
      textureId,
    };
  }

  getTextureSource(textureId: string | null | undefined, isURI?: boolean) {
    if (!textureId) {
      return undefined;
    }

    const withoutPng = textureId?.replace('.png', '');
    const withoutTextures = withoutPng?.replace('textures/', '');

    const projectPath = useAppStore.getState().selectedProject().path;

    const splittedTexture = withoutTextures.split(':');
    const modId = splittedTexture[0];
    const texturePath = splittedTexture[1];

    const osCompatiblePath =
      process.platform === 'win32' && !isURI
        ? path.win32.normalize(texturePath)
        : texturePath;

    const extraSlashesForURI = isURI ? `${path.sep}${path.sep}` : '';

    const separator = isURI ? '/' : path.sep;
    const projectPathConsideringUri = isURI
      ? projectPath.replaceAll('\\', '/')
      : projectPath;

    return `textures:${path.sep}${path.sep}${extraSlashesForURI}${projectPathConsideringUri}${separator}minecraft-toolkit${separator}assets${separator}${modId}${separator}textures${separator}${osCompatiblePath}.png`;
  }
}
