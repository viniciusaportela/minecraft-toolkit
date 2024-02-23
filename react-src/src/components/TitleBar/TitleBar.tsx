import {useEffect} from "react";
import {app, window as neuWindow} from '@neutralinojs/lib';
import {Button} from "@nextui-org/react";
import {CornersOut, Minus, X} from "@phosphor-icons/react";

export const TitleBar = () => {
  useEffect(() => {
    neuWindow.setDraggableRegion('title_bar_drag');
  }, []);

  const close = () => {
    app.exit();
  }

  const maximize = () => {
    neuWindow.isMaximized().then((isMaximized) => isMaximized ? neuWindow.unmaximize() : neuWindow.maximize());
  }

  const minimize = () => {
    neuWindow.minimize();
  }

  return <div className="w-full h-unit-10 select-none flex items-center px-2 py-0 bg-zinc-900 border-solid border-b-[0.5px] border-b-zinc-800">
    <span className="text-xl font-bold bg-gradient-to-br from-blue-500 to-green-400 bg-clip-text text-transparent">My Projects</span>
    <div id="title_bar_drag" className="flex-1 h-full"></div>
    <div className="flex gap-1">
      <Button isIconOnly aria-label="Like" size="sm" onClick={minimize} variant="flat" className="bg-zinc-800">
        <Minus />
      </Button>
      <Button isIconOnly color="default" aria-label="Like" size="sm" onClick={maximize} variant="flat" className="bg-zinc-800">
        <CornersOut />
      </Button>
      <Button isIconOnly color="default" aria-label="Like" size="sm" onClick={close} variant="flat" className="bg-zinc-800">
        <X />
      </Button>
    </div>

  </div>
}