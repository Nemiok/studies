import { forwardRef } from "react"
import { ICardThingToBuy } from "../../Card.types"
import styles from './ThingsToBuyItem.module.css'

const ThingsToBuyItem = forwardRef<HTMLLIElement, ICardThingToBuy>((props, ref) => {

  const { id, name, dragHandleProps, draggableProps } = props

  return (
    <li ref={ref} {...dragHandleProps} {...draggableProps} className={styles.itemToBuy}>
      <h3>{name}</h3>
    </li>
  )
})

export default ThingsToBuyItem