import { FC, memo } from 'react';
import s from './Bottle.module.scss';
import bottleImg from 'src/shared/assets/Bottle.png';
import clsx from 'clsx';

interface BottleProps {
  className?: string;
}
//TODO перенести в shared слой
export const Bottle: FC<BottleProps> = memo((props) => {
  const { className } = props;

  return (
    <div className={clsx(s.bottle, className)}>
      <img className={clsx('img', s.img)} src={bottleImg} alt={'bottle'} />
    </div>
  );
});