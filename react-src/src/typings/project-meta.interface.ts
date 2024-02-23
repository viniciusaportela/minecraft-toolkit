export interface IProjectMeta {
  baseModLoader: {
    name: string;
  }
  installPath: string;
  gameVersion: string;
  installedAddons: {
    name: string;
    primaryAuthor: string;
    thumbnailUrl: string;
    webSiteURL: string;
  }[];
}