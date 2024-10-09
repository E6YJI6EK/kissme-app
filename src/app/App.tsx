import { useEffect } from 'react';
import 'normalize.css';
import { SpinBottleButtonBar } from 'src/features/spinBottle';
import { useGameStore } from 'src/entities/Game';
import { CircleWithBottle } from 'src/widgets/CircleWithBottle';
import { Player } from 'src/entities/Player';
import './app.scss';
import { Helmet } from 'react-helmet';

const players: Player[] = [
  new Player(1, 'chel1', 'src/shared/assets/10 profile pictures/Regular face 1.png'),
  new Player(2, 'chel2', 'src/shared/assets/10 profile pictures/Regular face 2.png'),
  new Player(3, 'chel3', 'src/shared/assets/10 profile pictures/Regular face 3.png'),
  new Player(4, 'chel4', 'src/shared/assets/10 profile pictures/Regular face 4.png'),
  new Player(5, 'Айшат', 'src/shared/assets/10 profile pictures/Regular face 5.png'),
  new Player(6, 'chel5', 'src/shared/assets/10 profile pictures/Regular face 6.png'),
  new Player(7, 'chel6', 'src/shared/assets/10 profile pictures/Regular face 7.png'),
  new Player(8, 'chel7', 'src/shared/assets/10 profile pictures/Regular face 8.png'),
  new Player(9, 'chel8', 'src/shared/assets/10 profile pictures/Regular face 9.png'),
  new Player(10, 'chel9', 'src/shared/assets/10 profile pictures/Regular face 10.png'),
];
function App() {
  const setPlayers = useGameStore((state) => state.setPlayers);
  const setKisserId = useGameStore((state) => state.setKisserId);
  useEffect(() => {
    setPlayers(players);
    setKisserId(5);
  }, []);
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={''} />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <CircleWithBottle />
      <SpinBottleButtonBar />
    </>
  );
}

export default App;
