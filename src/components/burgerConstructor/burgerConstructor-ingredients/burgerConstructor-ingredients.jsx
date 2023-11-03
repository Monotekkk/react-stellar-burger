import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import style from '../burger-constructor.module.css'
import { useDispatch } from "react-redux";
import { DELETE_INGREDIENT } from "../../../service/actions";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

function ConstructorMain ({item, index, moveCard}) {
    const dispatch = useDispatch();
    const deleteIngredient = (item) => {
        dispatch({ type: DELETE_INGREDIENT, data: item });
    }
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: 'main',
        collect(monitor) {
          return {
            handlerId: monitor.getHandlerId(),
          }
        },
        hover(item, monitor) {
          if (!ref.current) {
            return
          }
          const dragIndex = item.index
          const hoverIndex = index
          if (dragIndex === hoverIndex) {
            return
          }
          const hoverBoundingRect = ref.current?.getBoundingClientRect()
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
          const clientOffset = monitor.getClientOffset()
          const hoverClientY = clientOffset.y - hoverBoundingRect.top
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
          }
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
          }
          moveCard(dragIndex, hoverIndex)
          item.index = hoverIndex
          
        },
      })
      const [ , drag] = useDrag({
        type: 'main',
        item: () => {
          return {item, index}
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      })
      drag(drop(ref))
    return(        
        <li className={`${style.burgerConstructorElements}`} ref={ref} data-hendler-id={handlerId}>
        <DragIcon type={'secondary'} />
        <ConstructorElement
            text={item.name}
            price={item.price}
            thumbnail={item?.image}
            handleClose={() => { deleteIngredient(index) }}
            moveCard = {moveCard}
        />
    </li>
    )
}
export default ConstructorMain