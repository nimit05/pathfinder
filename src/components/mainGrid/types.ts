export interface InnerDetails {
    x: number;
    y: number;
}

export interface Cell {
    id: string;
    inner: InnerDetails[];
  }

export interface DraggableItemProps {
    point: InnerDetails;
}