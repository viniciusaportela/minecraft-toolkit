import React, {useEffect, useState} from "react";
import {ProjectCard} from "./components/ProjectCard.tsx";
import {getCurseForgeFolder} from "../../utils/get-curse-forge-folder.ts";
import {filesystem} from "@neutralinojs/lib";
import {AddProject} from "./components/AddProject.tsx";

export const Projects: React.FC<{}> = () => {
  const [projects, setProjects] = useState<any[]>([]);

  const loadProjects = async () => {
    const curseFolder = await getCurseForgeFolder();

    if (curseFolder) {
      try {
        const folder = await filesystem.readDirectory(curseFolder);
        setProjects(folder.map((f) => ({ name: f.entry })));
      } catch (err) {
        console.error(JSON.stringify(err));
      }
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return <div className="flex flex-wrap gap-4 p-5 overflow-y-auto">
    <AddProject />
    {projects.map((p) => <ProjectCard title={p.name}/>)}
  </div>
}