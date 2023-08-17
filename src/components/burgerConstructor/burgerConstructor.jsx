import React from "react";
import style from './burger-constructor.module.css';
import {
    ConstructorElement,
    DragIcon,
    Counter,
    Button,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import {DataPropType} from '../../utils/prop-types';

function BurgerConstructor({data, setVisible}) {
    let buns;
    data.map(item => {
        if (item.type === 'bun') {
            buns = item;
        }
    })
    const main = data.filter(data => data.type !== 'bun');
    return (
        <section className={'mt-20 ml-10'}>
            <ul
                className={`${style.ul} custom-scroll pr-2`}>
                {
                    <li className={`${style.burgerConstructorElements} pl-9`}>
                        <ConstructorElement
                            key={`${buns._id + 1} ${0}`}
                            type="top"
                            isLocked={true}
                            text={`${buns?.name}(верх)`}
                            price={buns?.price}
                            thumbnail={buns?.image}
                        />
                    </li>
                }
                {
                    main.map((item, index) => {
                        return (
                                <li className={`${style.burgerConstructorElements}`}>
                                    <DragIcon type={'secondary'}/>
                                    <ConstructorElement
                                        key={`${item._id} ${index}`}
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                    />
                                </li>
                        )
                    })
                }
                {
                    <li className={`${style.burgerConstructorElements} pl-9`}>
                        <ConstructorElement
                            key={`${buns._id + 1} ${1}`}
                            type="bottom"
                            isLocked={true}
                            text={`${buns?.name}(низ)`}
                            price={buns?.price}
                            thumbnail={buns?.image}
                        />
                    </li>
                }
            </ul>
            <div className={style.results}>
                <Button htmlType={"button"} type={"primary"} size={"medium"} extraClass={'ml-10'} onClick={setVisible}>
                    Оформить заказ
                </Button>
                <CurrencyIcon className={'ml-2'} type={"primary"}/>
                <p className={'text text_type_digits-medium'}>610</p>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(DataPropType).isRequired,
}
export default BurgerConstructor;