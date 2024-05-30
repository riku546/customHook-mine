import React from 'react';
import styles from '../pages/index.module.css';

interface BoardType {
  resetState: () => void;
  levelInfo: { height: number; width: number; NumBomb: number; customMode: boolean };
  userInputs: number[][];
  countBombBoard: number[][];
  timeCount: number;
  clickHandler: (y: number, x: number) => void;
  setIsTimerActive: (isTimerActive: boolean) => void;
  RightClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, y: number, x: number) => void;
}

const Board: React.FC<BoardType> = ({
  resetState,
  levelInfo,
  userInputs,
  countBombBoard,
  timeCount,
  clickHandler,
  setIsTimerActive,
  RightClick,
}) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.boderStyle}>
          <div className={styles.boardStyle}>
            <div className={styles.matchInfos} style={{ color: 'white' }}>
              <div className={styles.bombCounterStyle}>
                <div className={styles.bombCounter}>
                  {levelInfo.NumBomb - userInputs.flat().filter((cell) => cell === 0).length === 0
                    ? 0
                    : countBombBoard.flat().every((cell) => cell === 0)
                      ? levelInfo.NumBomb - userInputs.flat().filter((cell) => cell === 10).length
                      : countBombBoard.flat().filter((cell) => cell === 11).length -
                        userInputs.flat().filter((cell) => cell === 10).length}
                </div>
              </div>

              <div className={styles.resetButtonStyle}>
                {}
                {levelInfo.NumBomb - userInputs.flat().filter((cell) => cell === 0).length === 0 ? (
                  <div
                    className={styles.restartButton}
                    style={{
                      backgroundPosition: '-360px',
                    }}
                    onClick={() => resetState()}
                  />
                ) : (
                  <div
                    className={styles.restartButton}
                    style={{
                      backgroundPosition: !userInputs.flat().some((cell) => cell === 11)
                        ? '-330px'
                        : `-390px`,
                    }}
                    onClick={() => resetState()}
                  />
                )}
              </div>
              <div className={styles.timeCountStyle}>
                <div className={styles.timeCount}> {timeCount}</div>
              </div>
            </div>

            <div className={styles.board}>
              {userInputs.map((row: number[], rowIndex: number) => (
                <div key={rowIndex} className={styles.row}>
                  {row.map((cell: number, cellIndex: number) =>
                    cell === 33 ? (
                      <div
                        key={rowIndex - cellIndex}
                        style={{ backgroundColor: 'red', backgroundPosition: '-300px , 0px' }}
                        className={styles.imageStyle}
                      />
                    ) : (
                      <div
                        key={rowIndex - cellIndex}
                        className={styles.cell}
                        onClick={() => clickHandler(rowIndex, cellIndex)}
                        onContextMenu={(e) => RightClick(e, rowIndex, cellIndex)}
                        onMouseDown={() => {
                          countBombBoard.flat().every((cell) => cell === 0)
                            ? setIsTimerActive(true)
                            : '';
                        }}
                        style={{
                          borderColor: cell === 0 ? '#fff #7f7f7f #7f7f7f #fff' : '',
                          borderWidth: cell === 0 ? 4 : '1.5px',
                          backgroundPosition:
                            levelInfo.NumBomb -
                              userInputs.flat().filter((cell) => cell === 0).length ===
                              0 && countBombBoard[rowIndex][cellIndex] === 11
                              ? '-270px'
                              : '30px',
                        }}
                      >
                        {
                          <div
                            className={styles.imageStyle}
                            style={{
                              visibility: cell === 0 ? 'hidden' : 'visible',
                              backgroundPosition:
                                cell === 0 ? `-1000px -1000px ` : `${-30 * (cell - 1)}px ,0px `,
                            }}
                          />
                        }
                      </div>
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
