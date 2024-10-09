import { FC, memo } from 'react';
import s from './Kiss.module.scss';
import kissImg from 'src/shared/assets/Kiss.png';
import clsx from 'clsx';

interface KissProps {
  className?: string;
  isKissed: boolean;
}

export const Kiss: FC<KissProps> = memo((props) => {
  const { className, isKissed } = props;

  return (
    <div className={clsx(s.kiss, { [s.animated]: isKissed }, [className])}>
      <img className={'img'} src={kissImg} alt="kiss" />
    </div>
  );
});
