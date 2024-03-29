import { mkdir } from 'node:fs/promises';
import { ipcRenderer } from 'electron';
import Realm, { UpdateMode } from 'realm';
import path from 'path';
import JarLoader from './jar-loader';
import { TextureModel } from '../../models/texture.model';
import { ProjectModel } from '../../models/project.model';
import { ItemModel } from '../../models/item.model';
import { BlockModel } from '../../models/block.model';
import { ModModel } from '../../models/mod.model';

export class JarHandler {
  private jarLoader: JarLoader;

  private realm: Realm;

  private project: ProjectModel;

  private mod: ModModel;

  constructor(
    jarLoader: JarLoader,
    project: ProjectModel,
    realm: Realm,
    mod: ModModel,
  ) {
    this.jarLoader = jarLoader;
    this.project = project;
    this.realm = realm;
    this.mod = mod;
  }

  async handleTextures() {
    if (this.mod.loadedTextures) return;

    await this.createBaseFolder();
    const dataFolder = await ipcRenderer.invoke('getPath', 'userData');

    await this.jarLoader.processTextures(async (texturePath) => {
      const modId = /assets\/(.*)\/textures\//g.exec(texturePath)?.[1];

      if (modId) {
        const splittedTexture = texturePath
          .replace(`assets/${modId}/textures/`, '')
          .split('/');
        const textureName = splittedTexture.splice(-1)[0];

        const modpackTexturesFolder = path.join(dataFolder, 'textures', modId);
        await mkdir(modpackTexturesFolder, { recursive: true });

        const finalFilename = `${splittedTexture.join('_')}__${textureName}`;
        const finalPath = path.join(modpackTexturesFolder, finalFilename);

        const textureId = `${modId}:${splittedTexture.join('/')}${splittedTexture.length > 0 ? '/' : ''}${textureName.replace('.png', '')}`;

        const exists =
          this.realm
            .objects<TextureModel>(TextureModel.schema.name)
            .filtered(
              `textureId = $0 AND project = $1`,
              textureId,
              this.project._id,
            ).length > 0;

        if (exists) {
          return;
        }

        this.realm.create<TextureModel>(TextureModel.schema.name, {
          textureId,
          path: finalPath,
          prefix: splittedTexture.join('/'),
          project: this.project._id,
          mod: this.mod._id,
        });
      } else {
        console.warn(`No mod id found in ${texturePath}`);
      }
    });

    this.mod.loadedTextures = true;
  }

  async handleBlocks() {
    if (this.mod.loadedBlocks) return;
    await this.createBaseFolder();

    await this.jarLoader.processBlocks(async ({ fullBlockId, modelJson }) => {
      const exists =
        this.realm
          .objects<BlockModel>(BlockModel.schema.name)
          .filtered(
            `blockId = $0 AND project = $1`,
            fullBlockId,
            this.project._id,
          ).length > 0;

      if (exists) {
        return;
      }

      this.realm.create<BlockModel>(BlockModel.schema.name, {
        blockId: fullBlockId,
        name: fullBlockId, // TODO get name from lang
        modelJson: JSON.stringify(modelJson),
        mod: this.mod._id,
        project: this.project._id,
      });
    });

    this.mod.loadedBlocks = true;
  }

  async handleItems() {
    if (this.mod.loadedItems) return;
    await this.createBaseFolder();

    await this.jarLoader.processItems(async ({ fullItemId, modelJson }) => {
      const exists =
        this.realm
          .objects<ItemModel>(ItemModel.schema.name)
          .filtered(
            `itemId = $0 AND project = $1`,
            fullItemId,
            this.project._id,
          ).length > 0;

      if (exists) {
        return;
      }

      this.realm.create<ItemModel>(
        ItemModel.schema.name,
        {
          itemId: fullItemId,
          name: fullItemId, // TODO get name from lang
          modelJson: JSON.stringify(modelJson),
          mod: this.mod._id,
          project: this.project._id,
        },
        UpdateMode.Modified,
      );
    });

    this.mod.loadedItems = true;
  }

  private async createBaseFolder() {
    const dataFolder = await ipcRenderer.invoke('getPath', 'userData');

    const modpackTexturesFolder = path.join(dataFolder, 'textures');

    await mkdir(modpackTexturesFolder, { recursive: true });
  }
}
