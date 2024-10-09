import { FC, memo } from 'react';
import clsx from 'clsx';
import heart from 'src/shared/assets/heart.png';
import s from './PlayerCard.module.scss';
import { Player } from '../../model/Player.entity.ts';
import { useGameStore } from '../../../Game';

interface PlayerCardProps {
  player: Player;
  kissCount: number;
  isActive?: boolean;
  xOffset: number;
  yOffset: number;
}

export const PlayerCard: FC<PlayerCardProps> = memo((props) => {
  const { player, yOffset, xOffset, kissCount, isActive } = props;
  const mainPlayerId = useGameStore((state) => state.mainPlayerId);
  const kissedPlayerId = useGameStore((state) => state.kissedPlayerId);
  const kisserId = useGameStore((state) => state.kisserId);

  return (
    <div
      className={clsx(s.card, { kisser: kisserId === player.getId, kissed: kissedPlayerId === player.getId })}
      style={{
        top: yOffset,
        left: xOffset,
      }}
    >
      <div className={clsx(s.imgWrapper, { [s.active]: isActive })}>
        <img className={'img'} src={player.getPictureUrl} alt={`player ${player.getName}`} />
      </div>
      <div className={s.info}>
        <span className={s.playerName}>{mainPlayerId === player.getId ? 'Вы' : player.getName}</span>
        <span className={s.kissCounter}>
          <img className={'img'} src={heart} alt="heart" />
          {kissCount}
        </span>
      </div>
    </div>
  );
});
