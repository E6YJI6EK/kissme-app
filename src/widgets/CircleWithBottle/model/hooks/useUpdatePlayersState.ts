import { useEffect, useState } from 'react';
import { useGameStore } from 'src/entities/Game';

export const useUpdatePlayersState = () => {
  // const kissedPlayerId = useGameStore((state) => state.kissedPlayerId);
  const kisserId = useGameStore((state) => state.kisserId);
  const players = useGameStore((state) => state.players);
  // const [lastKissedId, setLastKissedId] = useState(-1);
  const [lastKisserId, setLastKisserId] = useState(-1);

  useEffect(() => {
    if (kisserId) {
      // const kissed = players.get(kissedPlayerId);
      const kisser = players.get(kisserId);
      if (kisser) {
        if (lastKisserId) {
          const lastKisser = players.get(lastKisserId);
          if (lastKisser) {
            lastKisser.setIsActive = false;
          }
        }

        kisser.setIsActive = true;
        console.log('kisserId', kisserId, kisser);
        setLastKisserId(kisserId);
      }
      // тут должна быть другая логика
      // if (kissed) {
      //   if (lastKissedId) {
      //     const lastKissed = players.get(lastKissedId);
      //     if (lastKissed) {
      //       lastKissed.setIsActive = false;
      //     }
      //   }
      //   kissed.setIsActive = true;
      //   setLastKissedId(kissedPlayerId);
      // }
    }
  }, [kisserId]);
};
