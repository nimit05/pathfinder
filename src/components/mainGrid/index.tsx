import React, { useState, useEffect } from 'react';
import { ArrowIcon } from '../../assets/arrow';
import { TargetIcon } from '../../assets/target';
import styles from './index.module.scss';
import { Cell, InnerDetails } from './types';



const Grid: React.FC = () => {
  const cols = 3;

  const generateGridData = (): Cell[] => {
    const gridData: Cell[] = [];
    const rows = 30;
    const cellSize = 20; // Adjust the cell size as needed
    const innerWidth = window.innerWidth;
  
    // Calculate the number of columns based on the inner width and cell size
    const cols = Math.floor(innerWidth / cellSize);
  
    for (let row = 0; row < rows; row++) {
      const inner = [];
      for (let col = 0; col < cols; col++) {
        inner.push({ x: row, y: col });
      }
      gridData.push({
        id: `-${row}-`,
        inner,
      });
    }
  
    return gridData;
  };

  const [grid, setGrid] = useState<Cell[]>(generateGridData());
  const [startPoint, setStartPoint] = useState<InnerDetails>({x: 6, y: 6});
  const [targetPoint, setTargetPoint] = useState<InnerDetails>({x: 5, y: 30});

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setGrid(generateGridData());
  }, [cols]);

  const handleCellClick = (detail: InnerDetails) => {
    if (isDragging) {
      setTargetPoint(detail);
    } else {
      setStartPoint(detail);
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = () => {
    if (isDragging) {
      // Add additional logic if needed while dragging
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={styles.analystContainer}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {grid?.map((data) => (
        <div
          className={styles.anaylistCalendarDateBox}
          onMouseDown={handleMouseDown}
        >
          <div className={styles.rightCalendarBox}>
            {data.inner.map((detail: InnerDetails) => {
              if (detail.x === startPoint.x && detail.y === startPoint.y) {
                return (
                  <div className={`${styles.analystCell}`}>
                    <ArrowIcon />
                  </div>
                );
              }

              if (detail.x === targetPoint.x && detail.y === targetPoint.y) {
                return (
                  <div className={`${styles.analystCell}`}>
                    <TargetIcon />
                  </div>
                );
              }
              return (
                <div
                  className={`${styles.analystCell}`}
                  onClick={() => handleCellClick(detail)}
                />
              );
            })}
          </div>
        </div>
      ))}
      {/* {isDragging && (
        <div
          className={styles.draggedIcon}
          style={draggedIconStyle}
        >
          <ArrowIcon />
        </div>
      )} */}
    </div>
  );
};

export default Grid;
