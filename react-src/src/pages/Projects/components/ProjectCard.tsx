import {Button, Card, CardBody, CardFooter, CardHeader, Divider, Image} from "@nextui-org/react";

interface ProjectCardProps {
  title: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title }) => {
  return <Card className="py-4 h-44 w-80">
    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
      <h4 className="font-bold text-large">{title}</h4>
    </CardHeader>
    <CardBody className="flex flex-1">

    </CardBody>
    <CardFooter className="flex justify-between px-4">
      <Button size="sm" color="primary" className="ml-auto">Open</Button>
    </CardFooter>
  </Card>
}