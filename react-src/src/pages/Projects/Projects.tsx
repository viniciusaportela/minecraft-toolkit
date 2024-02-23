import React, {useEffect, useState} from "react";
import {ProjectCard} from "./components/ProjectCard.tsx";
import {getCurseForgeFolder} from "../../utils/get-curse-forge-folder.ts";
import {filesystem, window as neuWindow} from "@neutralinojs/lib";
import {AddProject} from "./components/AddProject.tsx";
import {IProjectMeta} from "../../typings/project-meta.interface.ts";
import {usePage} from "../../context/page.context.ts";
import {useProject} from "../../context/project.context.ts";

export const Projects: React.FC = () => {
  const { setPage } = usePage();
  const {setProject} = useProject();
  const [projects, setProjects] = useState<any[]>([]);

  const loadProjects = async () => {
    const curseFolder = await getCurseForgeFolder();

    if (curseFolder) {
      try {
        const folder = await filesystem.readDirectory(curseFolder);
        setProjects(folder.map((f) => ({ name: f.entry, path: `${curseFolder}/${f.entry}` })));
      } catch (err) {
        console.error(JSON.stringify(err));
      }
    }
  }

  const open = (path: string, metadata: IProjectMeta | null) => {
    setPage('project');
    neuWindow.setSize({
      height: 800,
      width: 1200
    });
    neuWindow.maximize();
    if (metadata) {
      setProject(metadata);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return <div className="flex flex-wrap gap-4 p-5 overflow-y-auto">
    <AddProject />
    {projects.map((p) => <ProjectCard title={p.name} path={p.path} onOpen={open} />)}
  </div>
}