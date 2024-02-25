import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import style from '../burger-constructor.module.css'
import {useDispatch} from "react-redux";
import {DELETE_INGREDIENT} from "../../../services/constants";
import React, {RefObject, useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import {TIngredients} from "../../../services/types/data";

function ConstructorMain({item, index, moveCard}: { item: TIngredients, index: number, moveCard: any }) {
    const dispatch = useDispatch();
    const deleteIngredient = (item: number) => {
        dispatch({type: DELETE_INGREDIENT, data: item});
    }
    const ref = useRef<HTMLLIElement>(null);
    const [{handlerId}, drop] = useDrop({
        accept: 'main',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: { item: TIngredients, index: number }, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset: { x: number, y: number } = monitor.getClientOffset()!;
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
    const [, drag] = useDrag({
        type: 'main',
        item: () => {
            return {item, index}
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    drag(drop(ref))
    return (
        <li className={`${style.burgerConstructorElements}`} ref={ref} data-hendler-id={handlerId}>
            <DragIcon type={'secondary'}/>
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item?.image}
                handleClose={() => {
                    deleteIngredient(index)
                }}
            />
        </li>
    )
}

export default ConstructorMain