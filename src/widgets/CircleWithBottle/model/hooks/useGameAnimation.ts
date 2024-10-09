import { useGSAP } from '@gsap/react';
import { calculateAngle } from '../../lib/helpers/calculateAngle.ts';
import gsap from 'gsap';
import { useGameStore } from 'src/entities/Game';
import { useState } from 'react';
import useSound from 'use-sound';
import spinningSound from 'src/shared/assets/Spinning sound.mp3';
import kissSound from 'src/shared/assets/Kiss sound.mp3';
import { CardMap } from '../CircleWithBottle.types.ts';
import { NormalizedPlayers } from 'src/entities/Game/model/Game.types.ts';
// @ts-ignore
export const useGameAnimation = (cards: CardMap, players: NormalizedPlayers, container, setIsKissed, centerOffset) => {
  const setIsSpinning = useGameStore((state) => state.setIsSpinning);
  const isSpinning = useGameStore((state) => state.isSpinning);
  const kissedPlayerId = useGameStore((state) => state.kissedPlayerId);
  const kisserId = useGameStore((state) => state.kisserId);
  const setIsKissing = useGameStore((state) => state.setIsKissing);
  const isKissing = useGameStore((state) => state.isKissing);
  const setKisserId = useGameStore((state) => state.setKisserId);
  const [spinCount, setSpinCount] = useState(1);
  const [playSpinningBottleSound] = useSound(spinningSound);
  const [playKissSound] = useSound(kissSound);
  useGSAP(
    () => {
      if (isSpinning && kissedPlayerId) {
        const playersCount = players.size;
        const kissedPlayer = players.get(kissedPlayerId);
        if (kissedPlayer) {
          const radian = calculateAngle(kissedPlayer.getIndex, playersCount);
          let degrees = radian * (180 / Math.PI);
          let spins = 10 * 360 * spinCount;
          const totalRotation = spins + degrees;
          setSpinCount((prevState) => prevState + 1);
          playSpinningBottleSound();
          gsap.to('.bottle', {
            rotation: totalRotation + 90, // 90 градусов для корректного смещения бутылки
            duration: 4,
            ease: 'power1.inOut',
            onComplete: () => {
              setIsSpinning(false);
              setIsKissing(true);
            },
          });
        }
      }
      if (isKissing) {
        if (kisserId != null) {
          const kisserOrigin = cards.get(kisserId);
          gsap.to('.kisser', {
            scale: 1.5,
            left: -100 + centerOffset,
            top: 0,
            duration: 4,
            ease: 'power1.inOut',
            onComplete: () => {
              setIsKissed(true);
              playKissSound();
              gsap.to('.kisser', {
                scale: 1,
                left: kisserOrigin?.xOffset,
                top: kisserOrigin?.yOffset,
                duration: 4,
                delay: 1.5,
                ease: 'power1.inOut',
                onStart: () => {
                  setIsKissed(false);
                },
                onComplete: () => {
                  setIsKissing(false);
                },
              });
            },
          });
        }
        if (kissedPlayerId != null) {
          const kissedOrigin = cards.get(kissedPlayerId);
          const kissedPlayer = kissedOrigin?.player;
          kissedPlayer?.incrementKissCount();
          gsap.to('.kissed', {
            scale: 1.5,
            left: 100 - centerOffset,
            top: 0,
            duration: 4,
            ease: 'power1.inOut',
            onComplete: () => {
              gsap.to('.kissed', {
                scale: 1,
                left: kissedOrigin?.xOffset,
                top: kissedOrigin?.yOffset,
                duration: 4,
                delay: 1.5,
                ease: 'power1.inOut',
                onComplete: () => {
                  setIsKissing(false);
                  // логика смены игрока, который крутит бутылку
                  if (kissedPlayer) {
                    setKisserId(kissedPlayer.getId);
                  }
                },
              });
            },
          });
        }
      }
    },
    { scope: container, dependencies: [isSpinning, isKissing] },
  );
};
