import { forwardRef } from 'react'
import { ICardPlaceToGo, ICardThingToBuy } from '../Card.types'
import styles from './PlaceToGo.module.css'
import ThingsToBuyItem from '../ThingsToBuy/ThingsToBuyItem/ThingsToBuyItem'
import StrictModeDroppable from '../StrictModeDroppable'
import { Draggable } from 'react-beautiful-dnd'

const PlaceToGo = forwardRef<HTMLLIElement, ICardPlaceToGo<ICardThingToBuy>>((props, ref) => {

  const { name, dragHandleProps, draggableProps, items, id } = props

  return (
    <li {...dragHandleProps} {...draggableProps} ref={ref} className={styles.placeToGoName}>
      <h3>{name}</h3>
      <StrictModeDroppable droppableId={id}>
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} className={styles.thingsToBuyList}>
            {items.map((item, i) => (
              <Draggable draggableId={item.id} index={i} key={item.id}>
                {(provided) => (
                  <ThingsToBuyItem dragHandleProps={provided.dragHandleProps} draggableProps={provided.draggableProps} ref={provided.innerRef} {...item} />
                )}
              </Draggable>
            ))}
            {provided.placeholder}

          </ul>
        )}
      </StrictModeDroppable>
    </li>)
}
)
export default PlaceToGo