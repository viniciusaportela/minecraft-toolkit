import {createContext, useContext} from "react";
import {IProjectMeta} from "../typings/project-meta.interface.ts";

export const ProjectContext = createContext<{ project: IProjectMeta | null, setProject: (project: IProjectMeta) => void}>({ project: null, setProject: (_: IProjectMeta) => {} });

export const useProject = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error("useProject must be used within a ProjectContext.Provider")
  }
  return context
}