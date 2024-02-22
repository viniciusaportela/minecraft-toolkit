import {os} from "@neutralinojs/lib";

export async function getCurseForgeFolder() {
  try {
    if (NL_OS !== "Linux") {
      return false;
    }

    const userPath = (await os.getPath("config")).split(".config")[0];

    return `${userPath}Documents/curseforge/minecraft/Instances`;
  } catch (e) {
    console.error(e);
    return false;
  }
}