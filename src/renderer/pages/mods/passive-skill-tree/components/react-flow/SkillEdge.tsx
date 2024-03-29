import { BaseEdge, EdgeProps, getStraightPath, useReactFlow } from 'reactflow';
import { memo } from 'react';

const SkillEdge = memo(({ id, source, target, data }: EdgeProps) => {
  const reactFlow = useReactFlow();

  function getEdgePath() {
    const sourceNode = reactFlow.getNode(source)!;
    const targetNode = reactFlow.getNode(target)!;

    return getStraightPath({
      sourceX: sourceNode.position.x + sourceNode.width! / 2,
      sourceY: sourceNode.position.y + sourceNode.height! / 2,
      targetX: targetNode.position.x + targetNode.width! / 2,
      targetY: targetNode.position.y + targetNode.height! / 2,
    })[0];
  }

  return (
    <BaseEdge
      id={id}
      path={getEdgePath()}
      style={{
        stroke: data?.type === 'long' ? 'blue' : undefined,
      }}
    />
  );
});

export default SkillEdge;
