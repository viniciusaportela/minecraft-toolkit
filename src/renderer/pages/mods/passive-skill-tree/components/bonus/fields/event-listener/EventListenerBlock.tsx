import { FunctionWithDefaultConfig } from '../../../../interfaces/function-with-default-config';
import { PlayerCondition } from '../player-condition/PlayerCondition';
import { PlayerMultiplier } from '../player-multiplier/PlayerMultiplier';
import ChoiceField from '../ChoiceField';

const TARGET_OPTIONS = [
  {
    label: 'Player',
    value: 'player',
  },
  {
    label: 'Enemy',
    value: 'enemy',
  },
];

export const EventListenerBlock: FunctionWithDefaultConfig = ({ path }) => {
  return (
    <>
      <ChoiceField
        path={[...path, 'target']}
        options={TARGET_OPTIONS}
        label="Target"
      />
      <PlayerCondition path={[...path, 'player_condition']} />
      <PlayerMultiplier path={[...path, 'player_multiplier']} />
      <PlayerCondition
        path={[...path, 'enemy_condition']}
        label="Enemy Condition"
      />
      <PlayerMultiplier
        path={[...path, 'enemy_multiplier']}
        label="Enemy Multiplier"
      />
    </>
  );
};

EventListenerBlock.getDefaultConfig = () => {
  return {
    type: 'skilltree:block',
    target: 'enemy',
    player_condition: PlayerCondition.getDefaultConfig(),
    player_multiplier: PlayerMultiplier.getDefaultConfig(),
    enemy_condition: PlayerCondition.getDefaultConfig(),
    enemy_multiplier: PlayerMultiplier.getDefaultConfig(),
  };
};
