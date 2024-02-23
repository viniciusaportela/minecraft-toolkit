import {Button, Card, CardBody, CardFooter, CardHeader, Skeleton} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {filesystem} from "@neutralinojs/lib";
import {IProjectMeta} from "../../../typings/project-meta.interface.ts";

interface ProjectCardProps {
  title: string;
  path: string;
  onOpen?: (path: string, projectMeta: IProjectMeta | null) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, path, onOpen }) => {
  const [projectMetadata, setProjectMetadata] = useState<IProjectMeta |  null>(null)
  const [loadingProjectMetadata, setLoadingProjectMetadata] = useState(true)

  useEffect(() => {
    console.log(path);
    filesystem.readFile(`${path}/minecraftinstance.json`).then((data) => {
      const res = JSON.parse(data);
      setProjectMetadata(res);
      console.log('res', JSON.stringify(res, null, 2));
    }).catch(err => console.log('err', JSON.stringify(err))).finally(() => setLoadingProjectMetadata(false))
  }, []);

  return <Card className="h-44 w-80">
    <CardHeader className="pb-0 pt-5 px-4 flex-col items-start">
      <Skeleton isLoaded={!loadingProjectMetadata}>
        <h4 className="font-bold text-large">{title}</h4>
      </Skeleton>
      <Skeleton isLoaded={!loadingProjectMetadata}>
        <small className="text-sm">{projectMetadata?.baseModLoader?.name} | {projectMetadata?.gameVersion}</small>
      </Skeleton>
      <Skeleton isLoaded={!loadingProjectMetadata}>
        <small className="text-sm">{projectMetadata?.installedAddons.length} Mods</small>
      </Skeleton>
    </CardHeader>
    <CardBody className="flex flex-1">

    </CardBody>
    <CardFooter className="flex justify-between">
      <Button size="sm" color="primary" className="ml-auto" onPress={() => onOpen?.(path, projectMetadata)}>Open</Button>
    </CardFooter>
  </Card>
}