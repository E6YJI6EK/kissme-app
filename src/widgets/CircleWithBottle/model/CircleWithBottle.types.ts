import { Player } from 'src/entities/Player';

export interface Card {
  player: Player;
  xOffset: number;
  yOffset: number;
}

export type CardMap = Map<number, Card>