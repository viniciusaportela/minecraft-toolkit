import {useProject} from "../../context/project.context.ts";
import {Card, CardHeader, Image, ScrollShadow, Tab, Tabs} from "@nextui-org/react";
import {useState} from "react";
import {IProjectMeta} from "../../typings/project-meta.interface.ts";

export const Project = () => {
  const { project } = useProject();
  const [openedModsTabs, setOpenedModsTabs] = useState<any[]>([])

  function clickOnMod(addon: IProjectMeta["installedAddons"]) {
    setOpenedModsTabs([...openedModsTabs, addon])
  }

  return <div className="flex max-w-[100vw]">
    {/*< className="flex flex-col gap-2 mt-4 max-h-[100vh]">*/}
    <ScrollShadow className="h-[100vw] w-80 border-[0.5px] border-solid border-zinc-800 border-t-0 p-5 overflow-y-auto">
      <span className="text-xl font-bold">{project?.installedAddons.length} mods</span>
      <p className="text-lg">{project?.description}</p>

        {project?.installedAddons.map((addon) => <Card key={addon.name} isPressable isHoverable onPress={() => clickOnMod(addon)}>
          <CardHeader>
            <Image src={addon.thumbnailUrl} className="min-w-10 min-h-10 w-10 h-10 mr-3"/>
            <span className="font-bold text-left">{addon.name}</span>
          </CardHeader>
        </Card>)}
    </ScrollShadow>

    <div className="p-5">
        <Tabs>
            <Tab key="dependencies" title="Items Dependencies"/>
            <Tab key="kubejs" title="KubeJS"/>
            <Tab key="quests" title="Quests"/>
            <Tab key="recipes" title="Recipes"/>
            {openedModsTabs.map((addon) => <Tab key={addon.name} title={addon.name}/>)}
        </Tabs>
    </div>
  </div>
}