import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';

interface Cell {
  id: string;
  content: string;
  inner: number[];
}

const Grid: React.FC = () => {
  const cols = 12;

  const generateGridData = (): Cell[] => {
    const gridData: Cell[] = [];

      for (let col = 0; col < cols; col++) {
        gridData.push({
          id: `-${col}`,
          content: `Cell -${col}`,
          inner: [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9],
        });
      }

    return gridData;
  };

  const [grid, setGrid] = useState<Cell[]>(generateGridData());

  useEffect(() => {
    setGrid(generateGridData());
  }, [cols]);

  return (
    <div className={styles.analystContainer}>
    {grid?.map((data) => (
      <div className={styles.anaylistCalendarDateBox}>
        <div className={styles.rightCalendarBox}
        >
          {data.inner.map(() => (
              <div
                className={`${styles.analystCell}`}
              />
            ))}
        </div>
      </div>
    ))}
  </div>
  );
};

export default Grid;
