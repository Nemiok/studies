import { DraggableProvided, DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "react-beautiful-dnd";

export interface ICard {
  children?: React.ReactNode,
  title: string
}

export interface ICardThingToBuy {
  ref?: React.Ref<any>,
  dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined,
  draggableProps?: DraggableProvidedDraggableProps,
  id: string;
  name: string;
}

export interface ICardPlaceToGo<T> {
  ref?: React.Ref<any>,
  dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined,
  draggableProps?: DraggableProvidedDraggableProps,
  id: string;
  name: string;
  items: T[];
  tint: number;
}
