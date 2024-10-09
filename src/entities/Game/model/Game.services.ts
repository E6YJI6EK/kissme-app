import { Player } from '../../Player';
import { NormalizedPlayers } from './Game.types.ts';

export const createQueuedPlayers = (players: Player[], id: number) => {
  return players.reduce((acc: Player[], player) => {
    if (player.getId === id) {
      acc.unshift(player);
    } else {
      acc.push(player);
    }
    return acc;
  }, []);
};

type CreateNormalizedPlayersResult = { p: NormalizedPlayers; ids: number[] };

export const createNormalizedPlayers = (queuedPlayers: Player[]): CreateNormalizedPlayersResult => {
  return queuedPlayers.reduce(
    (acc: CreateNormalizedPlayersResult, player, index) => {
      player.setIndex = index;
      acc.p.set(player.getId, player);
      acc.ids.push(player.getId);
      return acc;
    },
    { p: new Map<number, Player>(), ids: [] },
  );
};
