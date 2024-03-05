import { DefaultMod } from './default-mod';
import JarLoader from '../domains/minecraft/jar-loader';

export class SkillTreeMod extends DefaultMod {
  constructor(jar: JarLoader) {
    super(jar, 'skilltree');
  }

  async generateConfig() {
    return {
      ...(await super.generateConfig()),
      tree: {
        nodes: [],
        edges: [],
      },
    };
  }
}