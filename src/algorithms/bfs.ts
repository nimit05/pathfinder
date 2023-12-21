import { Cell, InnerDetails } from '../components/mainGrid/types';
import { Queue } from '../dataStructures/queue';

export function bfs(grid: Cell[], start: InnerDetails, end: InnerDetails) {
    const rows = grid.length;
    const cols = grid[0]?.inner.length;
    const visited: boolean[][] = new Array(rows).fill(0).map(() => new Array(cols).fill(false));
    const queue = new Queue<InnerDetails>();
    const parents = new Map<string, InnerDetails | null>();
  
    const isValid = (row: number, col: number): boolean => {
      return row >= 0 && row < rows && col >= 0 && col < cols && !visited[row][col];
    };
  
    queue.enqueue(start);
    visited[start.x][start.y] = true;
  
    const rowMoves = [-1, 1, 0, 0];
    const colMoves = [0, 0, -1, 1];
  
    while (!queue.isEmpty()) {
      const current = queue.dequeue() as InnerDetails;
  
      const {x, y} = current;
  
      if (x === end.x && y === end.y) {
        const path: InnerDetails[] = [];
        let node:InnerDetails | null = end;
        // console.log('1115', parents.get());

        while (node) {
          path.unshift(node);
          node = parents.get(`${node.x}-${node.y}`) || null;

        }
        return path;
      }
  
      for (let i = 0; i < 4; i++) {
        const newRow = x + rowMoves[i];
        const newCol = y + colMoves[i];
  
        if (isValid(newRow, newCol)) {
          queue.enqueue({x: newRow, y: newCol});
          visited[newRow][newCol] = true;
          parents.set(`${newRow}-${newCol}`, {x, y});
        }
      }
    }
  
    return null; // Path not found
  }