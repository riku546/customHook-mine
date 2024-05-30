import Board from '../components/Board';
import useGame from '../components/useGame';

import TopArea from '../components/TopArea';

const Home = () => {
  const {
    createBoard,
    resetState,
    levelInfo,
    setLevelInfo,
    userInputs,
    countBombBoard,
    timeCount,
    clickHandler,
    setIsTimerActive,
    RightClick,
    setTimeCount,
  } = useGame();
  return (
    <>
      <TopArea
        createBoard={createBoard}
        levelInfo={levelInfo}
        setLevelInfo={setLevelInfo}
        setIsTimerActive={setIsTimerActive}
        setTimeCount={setTimeCount}
      />
      <Board
        resetState={resetState}
        levelInfo={levelInfo}
        userInputs={userInputs}
        countBombBoard={countBombBoard}
        timeCount={timeCount}
        clickHandler={clickHandler}
        setIsTimerActive={setIsTimerActive}
        RightClick={RightClick}
      />
    </>
  );
};

export default Home;
