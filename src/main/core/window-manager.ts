import { BrowserWindow } from 'electron';
import { ICreateWindow } from '../interfaces/create-window.interface';
import windowConfigs from './window-configs';
import { resolveHtmlPath } from '../util';
import { IWindowContext } from '../interfaces/window-context.interface';

export default class WindowManager {
  static windows: IWindowContext[] = [];

  static create({
    page,
    parent,
    requestId,
    respondRequester,
    params,
  }: ICreateWindow) {
    const config = windowConfigs[page];

    if (!config) {
      throw new Error(`Invalid window config: ${page}`);
    }

    if (config.keepAlive) {
      const windowCtx = this.windows.find((ctx) => ctx.config.page === page);

      if (windowCtx) {
        windowCtx.respondRequester = respondRequester;
        windowCtx.window.webContents.send('init', ...params);
        windowCtx.window.show();
        return;
      }
    }

    const window = new BrowserWindow({
      show: false,
      width: 550,
      height: 550,
      parent: parent!,
      x: parent!.getPosition()[0] + parent!.getSize()[0] / 2 - 225,
      y: parent!.getPosition()[1] + parent!.getSize()[1] / 2 - 225,
      resizable: config.resizable,
      frame: false,
      webPreferences: {
        devTools: true,
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    const ctx = {
      window,
      config,
      fromRequestId: requestId,
      respondRequester,
    };
    this.windows.push(ctx);

    window.loadURL(
      `${resolveHtmlPath('index.html')}?${new URLSearchParams({ page, requestId }).toString()}`,
    );

    window.on('ready-to-show', () => {
      parent.getPosition();
      window.show();

      window.webContents.send('init', ...params);
    });

    window.on('blur', () => {
      if (config.closeOnBlur) {
        if (config.type === 'response') {
          this.respond(ctx, null);
        }

        if (config.keepAlive) {
          ctx.window.hide();
        } else {
          ctx.window.close();
        }
      }
    });

    window.on('close', () => {
      if (config.type === 'response') {
        this.respond(ctx, null);
      }
    });

    if (config.type !== 'response') {
      this.respond(ctx, { windowId: requestId });
    }
  }

  private static respond(ctx: IWindowContext, params: any) {
    if (ctx.respondRequester) {
      ctx.respondRequester(params);
      ctx.respondRequester = null;

      if (ctx.config.type === 'response' && !ctx.config.keepAlive) {
        const index = this.windows.indexOf(ctx);
        this.windows.splice(index, 1);
      }
    }
  }

  static onWindowMessage(creationRequestId: string, params: any) {
    const windowCtx = this.windows.find(
      (ctx) => ctx.fromRequestId === creationRequestId,
    );

    if (
      windowCtx &&
      windowCtx.respondRequester &&
      windowCtx.config.type === 'response'
    ) {
      this.respond(windowCtx, params);

      if (windowCtx.config.keepAlive) {
        windowCtx.window.hide();
      } else {
        windowCtx.window.close();
      }
    }
  }
}
