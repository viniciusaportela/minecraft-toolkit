import {Projects} from "./pages/Projects/Projects.tsx";
import {NextUIProvider} from "@nextui-org/react";
import './styles/index.css';
import {TitleBar} from "./components/TitleBar/TitleBar.tsx";

export function App() {
  return <NextUIProvider>
    <div className="w-[100vw] h-[100vh] flex flex-col border-[0.5px] border-solid border-zinc-700 bg-zinc-900">
      <TitleBar />
      <Projects />
    </div>
  </NextUIProvider>
}
