import React, { useState } from 'react';
import styles from './Card.module.css'
import DATA from '../../data'
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd'
import StrictModeDroppable from './StrictModeDroppable';
import { ICard } from './Card.types';
import PlaceToGo from './PlaceToGo/PlaceToGo';

function Card(props: ICard) {

  const [data, setData] = useState(DATA)

  const handleDragDrop = (results: DropResult) => {
    console.log(results)
    const { destination, source, type } = results

    if (!destination) return

    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    if (type === 'group') {
      const reorderedPlaces = structuredClone(data)
      const placeSourceIndex = source.index;
      const placeDestinatonIndex = destination.index;

      const [removedPlace] = reorderedPlaces.splice(placeSourceIndex, 1);
      reorderedPlaces.splice(placeDestinatonIndex, 0, removedPlace);

      return setData(reorderedPlaces);
    }

    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const placeSourceIndex = data.findIndex(
      (place) => place.id === source.droppableId
    );
    const placeDestinationIndex = data.findIndex(
      (place) => place.id === destination.droppableId
    );

    const newSourceItems = [...data[placeSourceIndex].items];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...data[placeDestinationIndex].items]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newPlaces = [...data];

    newPlaces[placeSourceIndex] = {
      ...data[placeSourceIndex],
      items: newSourceItems,
    };
    newPlaces[placeDestinationIndex] = {
      ...data[placeDestinationIndex],
      items: newDestinationItems,
    };

    setData(newPlaces);
  }

  const { title, children } = props
  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <div className={styles.card}>
        <h1 className={styles.cardTitle}>{title}</h1>
        <StrictModeDroppable droppableId='ROOT' type='group'>
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} className={styles.placesToGoList}>
              {data.map(((placeToGo, i) => (
                <Draggable draggableId={placeToGo.id} key={placeToGo.id} index={i}>

                  {(provided) => (
                    <PlaceToGo name={placeToGo.name} id={placeToGo.id} items={placeToGo.items} tint={placeToGo.tint}
                      dragHandleProps={provided.dragHandleProps} draggableProps={provided.draggableProps} ref={provided.innerRef} />
                  )

                  }
                </Draggable>)

              ))}
              {provided.placeholder}
            </ul>)
          }
        </StrictModeDroppable>
      </div>
    </DragDropContext>
  );
}

export default Card;
