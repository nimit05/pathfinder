import React, { useState, useEffect } from 'react';
import { TargetIcon } from '../../assets/target';
import styles from './index.module.scss';
import { Cell, InnerDetails } from './types';
import { ArrowIcon } from '../../assets/arrow';

const Grid: React.FC = () => {
  const cols = 3;

  const generateGridData = (): Cell[] => {
    const gridData: Cell[] = [];
    const rows = 30;
    const cellSize = 20;
    const innerWidth = window.innerWidth;
  
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
  const [startPoint, setStartPoint] = useState<InnerDetails>({x: 10, y: 16});
  const [targetPoint, setTargetPoint] = useState<InnerDetails>({x: 5, y: 30});
  const [selectedPoint, setSelectedPoint] = useState<InnerDetails | null>(null);

  useEffect(() => {
    setGrid(generateGridData());
  }, [cols]);

  const handleCellClick = (detail: InnerDetails) => {
    const x = detail.x;
    const y = detail.y;

    if((selectedPoint === null) &&( (startPoint.x === x && startPoint.y === y) || (targetPoint.x === x && targetPoint.y === y))){
      setSelectedPoint(detail);
      return;
    }

    if(selectedPoint?.x === startPoint.x && selectedPoint.y === startPoint.y) {
      if(x === targetPoint.x && y === targetPoint.y){
        return;
      }

      setStartPoint(detail);
      setSelectedPoint(null);
      return;
    }

    if(selectedPoint?.x === targetPoint.x && selectedPoint.y === targetPoint.y) {
      if(x === startPoint.x && y === startPoint.y){
        return;
      }

      setTargetPoint(detail);
      setSelectedPoint(null);
      return;
    }

  };

  const isBorder = (detail: InnerDetails) => {
    const x = detail.x;
    const y = detail.y;

    if((x === startPoint.x && y === startPoint.y) && selectedPoint?.x === x && selectedPoint.y === y) {
      return true;
    }

    if((x === targetPoint.x && y === targetPoint.y) && selectedPoint?.x === x && selectedPoint.y === y) {
      return true;
    }

    return false;
  }

  return (

      <div className={styles.analystContainer} >
        {grid?.map((data) => (
          <div key={data.id} className={styles.anaylistCalendarDateBox}>
            <div className={styles.rightCalendarBox}>
              {data.inner.map((detail: InnerDetails) => (
                <div
                  key={`${detail.x}-${detail.y}`}
                  className={`${styles.analystCell} ${ isBorder(detail) ? styles.selectedBorder : ''}`}
                  onClick={() => handleCellClick(detail)}
                >
                  {detail.x === startPoint.x && detail.y === startPoint.y && (
                    <ArrowIcon />
                  )}
                  {detail.x === targetPoint.x && detail.y === targetPoint.y && (
                    <TargetIcon />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
  );
};

export default Grid;
