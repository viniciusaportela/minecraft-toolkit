import {Projects} from "./pages/Projects/Projects.tsx";
import {NextUIProvider} from "@nextui-org/react";
import './styles/index.css';
import {TitleBar} from "./components/TitleBar/TitleBar.tsx";
import {useState} from "react";
import {PageContext} from "./context/page.context.ts";
import {ProjectContext} from "./context/project.context.ts";
import {IProjectMeta} from "./typings/project-meta.interface.ts";
import {Project} from "./pages/Project/Project.tsx";

export function App() {
  const [page, setPage] = useState("projects");
  const [project, setProject] = useState<null | IProjectMeta>(null)

  return <NextUIProvider>
    <PageContext.Provider value={{ page, setPage }}>
      <ProjectContext.Provider value={{ project, setProject }}>

      <div className="w-[100vw] h-[100vh] flex flex-col border-[0.5px] border-solid border-zinc-700 bg-zinc-900">
        <TitleBar/>
        {page === "projects" && <Projects/>}
        {page === "project" && <Project />}
      </div>
      </ProjectContext.Provider>
    </PageContext.Provider>
  </NextUIProvider>
}
