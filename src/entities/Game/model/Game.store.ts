import { create } from 'zustand';
import { GameSchema } from './Game.types.ts';
import { Player } from '../../Player';
import { createNormalizedPlayers, createQueuedPlayers } from './Game.services.ts';

export const useGameStore = create<GameSchema>()((set, get) => ({
  mainPlayerId: 5,
  players: new Map<number, Player>(),
  ids: [],
  isSpinning: false,
  isKissing: false,
  spinBottle() {
    const idsWithoutKisserId = get().ids.filter((id) => id !== get().kisserId);
    const newKissedId = idsWithoutKisserId[Math.floor(Math.random() * idsWithoutKisserId.length)];
    set(() => ({ kissedPlayerId: newKissedId }));
  },
  setKisserId(id: number) {
    set(() => ({ kisserId: id }));
  },
  setPlayers(players: Player[]) {
    // делаем локальную очередь - главный игрок (то есть мы) всегда должен быть первым
    // так как он всегда отображается снизу
    const queuedPlayers: Player[] = createQueuedPlayers(players, get().mainPlayerId);
    // нормализуем список игроков для оптимизации работы со списком
    const { p, ids } = createNormalizedPlayers(queuedPlayers);

    set(() => ({ players: p, ids }));
  },
  resetKisserId() {
    set(() => ({ kisserId: null }));
  },
  setIsSpinning(newSpinning: boolean) {
    set(() => ({ isSpinning: newSpinning }));
  },
  setIsKissing(newKissedId: boolean) {
    set(() => ({ isKissing: newKissedId }));
  },
}));
