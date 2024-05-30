import React from 'react';
import styles from './index.module.css';
import type { LevelType } from '../fuctions/useGame';
interface Props {
  createBoard: (height: number, width: number) => void;

  levelInfo: { height: number; width: number; NumBomb: number; customMode: boolean };
  setLevelInfo: ({ height, width, NumBomb, customMode }: LevelType) => void;
  setIsTimerActive:(isTimerActive:boolean) => void;
  setTimeCount:(timeCount:number) => void;
}
const TopArea: React.FC<Props> = ({ createBoard,  levelInfo, setLevelInfo , setIsTimerActive , setTimeCount }) => {
  return (
    <div>
      <div>
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            gap: 20,
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <li
            onClick={() => {
              createBoard(9, 9),
                setLevelInfo({ height: 9, width: 9, NumBomb: 10, customMode: false });
                setIsTimerActive(false);
                setTimeCount(0);
            }}
          >
            beginner
          </li>
          <li
            onClick={() => {
              createBoard(16, 16),
                setLevelInfo({ height: 16, width: 16, NumBomb: 40, customMode: false });
                setIsTimerActive(false);
                setTimeCount(0);
            }}
          >
            intermediate
          </li>
          <li
            onClick={() => {
              createBoard(16, 30),
                setLevelInfo({ height: 16, width: 30, NumBomb: 99, customMode: false });
                setIsTimerActive(false);
                setTimeCount(0);
            }}
          >
            advanced
          </li>
          <li
            onClick={() => {
              createBoard(30, 30),
                setLevelInfo({ height: 30, width: 30, NumBomb: 80, customMode: true });
                setIsTimerActive(false);
                setTimeCount(0);
            }}
          >
            custom
          </li>
        </ul>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {levelInfo.customMode ? (
          <div style={{ display: 'flex', gap: 20 }}>
            <label htmlFor="">
              <input
                className={styles.input}
                type="number"
                value={levelInfo.height}
                onChange={(e) => {
                  setLevelInfo({ ...levelInfo, height: Number(e.target.value) });
                }}
              />
            </label>
            <label htmlFor="">
              <input
                className={styles.input}
                type="number"
                value={levelInfo.width}
                onChange={(e) => {
                  setLevelInfo({ ...levelInfo, width: Number(e.target.value) });
                }}
              />
            </label>
            <label htmlFor="">
              <input
                className={styles.input}
                type="number"
                value={levelInfo.NumBomb}
                onChange={(e) => {
                  setLevelInfo({ ...levelInfo, NumBomb: Number(e.target.value) });
                }}
              />
            </label>
            <input
              className={styles.button}
              type="button"
              value="update"
              onClick={() => {
                createBoard(levelInfo.height, levelInfo.width);
              }}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default TopArea;
