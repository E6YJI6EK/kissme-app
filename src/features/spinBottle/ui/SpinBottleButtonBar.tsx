import s from './SpinBottleButtonBar.module.scss';
import { useGameStore } from 'src/entities/Game';
import { memo } from 'react';
import clsx from 'clsx';

export const SpinBottleButtonBar = memo(() => {
  const spinBottle = useGameStore((state) => state.spinBottle);
  const setIsSpinning = useGameStore((state) => state.setIsSpinning);
  const isSpinning = useGameStore((state) => state.isSpinning);
  const isKissing = useGameStore((state) => state.isKissing);
  const handleClick = () => {
    setIsSpinning(true);
    spinBottle();
  };
  return (
    <div className={s.bar}>
      <button
        onClick={handleClick}
        className={clsx(s.button, { [s.disabled]: isSpinning || isKissing })}
        disabled={isSpinning || isKissing}
      >
        Spin Bottle
      </button>
    </div>
  );
});
