import { Player } from '../../Player';

export type NormalizedPlayers = Map<number, Player>;

interface GameState {
  mainPlayerId: number;
  players: NormalizedPlayers;
  ids: number[];
  kisserId?: number | null;
  kissedPlayerId?: number;
  isSpinning: boolean;
  isKissing: boolean;
}

interface GameActions {
  spinBottle(): void;
  setKisserId(id: number): void;
  setPlayers(players: Player[]): void;
  resetKisserId(): void;
  setIsSpinning(newSpinning: boolean): void;
  setIsKissing(newKissedId: boolean): void;
}

export type GameSchema = GameActions & GameState;
