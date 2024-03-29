import { FunctionWithDefaultConfig } from '../../../interfaces/function-with-default-config';
import { BonusProps } from '../../../interfaces/bonus-props.interface';
import NumberField from '../fields/NumberField';
import { ItemCondition } from '../fields/item-condition/ItemCondition';
import { EventListener } from '../fields/event-listener/EventListener';
import { PlayerCondition } from '../fields/player-condition/PlayerCondition';

export const RepairEfficiency: FunctionWithDefaultConfig = ({ path }) => {
  return (
    <>
      <NumberField path={[...path, 'multiplier']} label="Multiplier" />
      <ItemCondition path={[...path, 'item_condition']} />
    </>
  );
};

RepairEfficiency.getDefaultConfig = () => {
  return {
    type: 'skilltree:repair_efficiency',
    item_condition: ItemCondition.getDefaultConfig(),
    multiplier: 0.1,
  };
};
