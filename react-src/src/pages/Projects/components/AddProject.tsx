import {Card, CardBody} from "@nextui-org/react";
import {Plus} from "@phosphor-icons/react";

export const AddProject = () => {
  return <Card className="h-44 w-80 shadow-none border-2 border-dashed border-zinc-800" isHoverable shadow="none" isPressable>
    <CardBody className="overflow-visible items-center justify-center">
      <Plus />
      <h4 className="font-medium text-large mt-2">Add Project</h4>
    </CardBody>
  </Card>
}