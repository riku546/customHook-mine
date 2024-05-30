import { useState, useEffect } from 'react';
import openEmptySquare from '../fuctions/openEmpty';
import initializeBoard from '../fuctions/Initialize';
import checkClear from '../fuctions/checkClear';

export interface LevelType {
  height: number;
  width: number;
  NumBomb: number;
  customMode: boolean;
}

const useGame = () => {
  const direction = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];

  const [timeCount, setTimeCount] = useState(0);
  const [levelInfo, setLevelInfo] = useState<LevelType>({
    height: 9,
    width: 9,
    NumBomb: 10,
    customMode: false,
  });
  const results: number[][] = [];
  const [isTimerActive, setIsTimerActive] = useState(false);

  const [userInputs, setUserInputs] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [countBombBoard, setCountBombBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const createBoard = (height: number, width: number) => {
    const board = [];
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push(0);
      }
      board.push(row);
    }
    const bombBoard = structuredClone(board);

    setCountBombBoard(bombBoard);
    setUserInputs(board);
  };

  const RightClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    rowIndex: number,
    cellIndex: number,
  ) => {
    e.preventDefault();
    const isClear = countBombBoard.flat().some((cell) => cell === 1000);

    const newUserInputs = [...userInputs];
    const isGameFinish = newUserInputs.flat().some((cell) => cell === 11);
    if (isGameFinish || isClear) return;

    if (newUserInputs[rowIndex][cellIndex] === 10) {
      newUserInputs[rowIndex][cellIndex] = 0;
    } else {
      newUserInputs[rowIndex][cellIndex] = 10;
    }

    setUserInputs(newUserInputs);
  };

  const resetState = () => {
    const board = [];
    for (let i = 0; i < levelInfo.height; i++) {
      const row = [];
      for (let j = 0; j < levelInfo.width; j++) {
        row.push(0);
      }
      board.push(row);
    }

    const newBoard = structuredClone(board);

    setTimeCount(0);
    setIsTimerActive(false);

    setUserInputs(board);
    setCountBombBoard(newBoard);
  };

  //クリア判定
  useEffect(() => {
    const checkList = checkClear(countBombBoard, userInputs);

    if (checkList.length === 0) {
      const board: number[][] = structuredClone(countBombBoard);
      while (!board.flat().some(cell => cell === 1000)) {
        const Rowrandom = Math.floor(Math.random() * levelInfo.height);
        const Cellrandom = Math.floor(Math.random() * levelInfo.width);
        if (countBombBoard[Rowrandom][Cellrandom] !== 11) {
          board[Rowrandom][Cellrandom] = 1000;
          break;
        }
      }

      setCountBombBoard(board);
      setIsTimerActive(false);
    }
  }, [userInputs , countBombBoard , levelInfo]);

  //タイマー処理
  useEffect(() => {
    let time: NodeJS.Timeout | undefined = undefined;
    if (isTimerActive) {
      time = setInterval(() => {
        setTimeCount((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(time);
    };
  }, [isTimerActive]);

  //クリック処理
  const clickHandler = (rowIndex: number, cellIndex: number) => {
    const isFirstClick = countBombBoard.flat().every((cell) => cell === 0);
    const newUserInputs = structuredClone(userInputs);
    const isGameFinish = newUserInputs.flat().some((cell) => cell === 11);
    const isCleared = countBombBoard.flat().some((cell) => cell === 1000);
    console.log(countBombBoard);
    if (newUserInputs[rowIndex][cellIndex] === 10 || isGameFinish === true || isCleared) {
      return;
    }

    if (isFirstClick === true) {
      const newBoard = initializeBoard(direction, rowIndex, cellIndex, countBombBoard, levelInfo);
      setCountBombBoard(newBoard);
    }

    if (isFirstClick === false && countBombBoard[rowIndex][cellIndex] === 11) {
      countBombBoard.map((row, rowIndex) => {
        row.map((cell, cellIndex) => {
          if (cell === 11) {
            results.push([rowIndex, cellIndex]);
          }
        });
      });

      results.map((row: number[]) => {
        if (rowIndex === row[0] && cellIndex === row[1]) {
          newUserInputs[row[0]][row[1]] = 33;
        } else {
          newUserInputs[row[0]][row[1]] = 11;
        }
      });

      setUserInputs(newUserInputs);
      setIsTimerActive(false);

      return;
    }

    if (countBombBoard[rowIndex][cellIndex] === 0) {
      const tL: number[][] = [];
      results.push([rowIndex, cellIndex]);
      //再帰関数
      openEmptySquare(direction, rowIndex, cellIndex, results, levelInfo, countBombBoard);

      for (const count of results) {
        newUserInputs[count[0]][count[1]] = 100;
      }

      newUserInputs.map((row: number[], rowIndex: number) => {
        row.map((i, index) => {
          if (i === 100) {
            direction.map((row) => {
              const x = index + row[0];
              const y = rowIndex + row[1];
              if (x < 0 || x > levelInfo.width - 1) return;
              if (y < 0 || y > levelInfo.height - 1) return;

              if (countBombBoard[y][x] === 11 || countBombBoard[y][x] === 0) {
                return;
              }
              tL.push([y, x]);
            });
          }
        });
      });

      for (const t of tL) {
        if (newUserInputs[t[0]][t[1]] === 100) break;
        newUserInputs[t[0]][t[1]] = countBombBoard[t[0]][t[1]];
      }
    } else {
      newUserInputs[rowIndex][cellIndex] = countBombBoard[rowIndex][cellIndex];
    }

    setUserInputs(newUserInputs);
  };

  return {
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
  };
};

export default useGame;
