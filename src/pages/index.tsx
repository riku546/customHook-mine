import Board from './Board';
import useGame from './useGame';

import TopArea from './TopArea';

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
  } = useGame();
  return (
    <>
      <TopArea
        createBoard={createBoard}
        resetState={resetState}
        levelInfo={levelInfo}
        setLevelInfo={setLevelInfo}
      />
      <Board
        resetState={resetState}
        levelInfo={levelInfo}
        userInputs={userInputs}
        countBombBoard={countBombBoard}
        timeCount={timeCount}
        clickHandler = {clickHandler}
        setIsTimerActive={setIsTimerActive}
        RightClick={RightClick}
      />
    </>
  );
};

export default Home;
