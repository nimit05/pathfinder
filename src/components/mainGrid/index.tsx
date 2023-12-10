import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';

interface Cell {
  id: string;
  inner: string[];
}

const Grid: React.FC = () => {
  const cols = 12;

  const generateGridData = (): Cell[] => {
    const gridData: Cell[] = [];
    const rows = 30;
      for (let col = 0; col < cols; col++) {
        const inner = [];
        for(let row = 0; row < rows; row++) {
            inner.push(`${row}-${col}`)
        }
        gridData.push({
          id: `-${col}`,
          inner,
        });
      }

    return gridData;
  };

  const [grid, setGrid] = useState<Cell[]>(generateGridData());

  useEffect(() => {
    setGrid(generateGridData());
  }, [cols]);

  const handleCellClick = (id:string) => {
    console.log('3333', id);
  }

  return (
    <div className={styles.analystContainer}>
    {grid?.map((data) => (
      <div className={styles.anaylistCalendarDateBox}>
        <div className={styles.rightCalendarBox}
        >
          {data.inner.map((id:string) => (
              <div
                className={`${styles.analystCell}`}
                onClick={() => handleCellClick(id)}
              />
            ))}
        </div>
      </div>
    ))}
  </div>
  );
};

export default Grid;
