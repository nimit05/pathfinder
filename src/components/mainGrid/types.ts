export interface InnerDetails {
    x: number;
    y: number;
    className?: string;
}

export interface Cell {
    id: string;
    inner: InnerDetails[];
  }

export interface DraggableItemProps {
    point: InnerDetails;
}