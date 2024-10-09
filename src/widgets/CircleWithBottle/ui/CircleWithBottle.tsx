import { memo, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useWindowWidth } from '@react-hook/window-size';
import { PlayerCard } from 'src/entities/Player';
import { Bottle } from 'src/entities/Bottle';

import s from './CircleWithBottle.module.scss';
import { Card, CardMap } from '../model/CircleWithBottle.types.ts';
import { calculateAngle } from '../lib/helpers/calculateAngle.ts';
import { useGameStore } from '../../../entities/Game';
import { useUpdatePlayersState } from '../model/hooks/useUpdatePlayersState.ts';
import { useGameAnimation } from '../model/hooks/useGameAnimation.ts';
import { calculateXYOffset } from '../lib/helpers/calculateXYOffset.ts';
import { Kiss } from '../../../shared/ui/Kiss/Kiss.tsx';

gsap.registerPlugin(useGSAP);

export const CircleWithBottle = memo(() => {
  const [radius, setRadius] = useState(250);
  const [centerOffset, setCenterOffset] = useState(0);
  const width = useWindowWidth();
  const players = useGameStore((state) => state.players);
  const [isKissed, setIsKissed] = useState(false);
  const container = useRef();
  useEffect(() => {
    switch (true) {
      case width <= 700 && width > 450:
        setRadius(200);
        setCenterOffset(20)
        break;
      case width <= 450 && width > 375:
        setRadius(150);
        setCenterOffset(30)
        break;
      case width <= 375:
        setRadius(120);
        setCenterOffset(50)
        break;
      default:
        setRadius(250);
        setCenterOffset(0);
    }
  }, [width]);
  // расстановка карт по кругу
  const cards = useMemo((): CardMap => {
    const playersCount = players.size;
    return [...players.values()].reduce((acc, player) => {
      const radian = calculateAngle(player.getIndex, playersCount);
      const { xOffset, yOffset } = calculateXYOffset(radius, radian);
      acc.set(player.getId, { player: player, xOffset, yOffset });
      return acc;
    }, new Map<number, Card>());
  }, [players, radius]);
  // обновляем состояние экземпляров класса Player
  useUpdatePlayersState();
  // анимаци, потом надо вынести в отдельный хук
  useGameAnimation(cards, players, container, setIsKissed, centerOffset);

  return (
    <div className={s.circle}>
      {/*// @ts-ignore ругается на реф, пока оставлю так*/}
      <div className={s.center} ref={container}>
        {[...cards.values()].map(({ xOffset, yOffset, player }) => (
          <>
            <Kiss className={'kiss'} isKissed={isKissed} />
            <Bottle className={'bottle'} />
            <PlayerCard
              player={player}
              xOffset={xOffset}
              yOffset={yOffset}
              kissCount={player.getKissCount}
              isActive={player.getIsActive}
            />
          </>
        ))}
      </div>
    </div>
  );
});
