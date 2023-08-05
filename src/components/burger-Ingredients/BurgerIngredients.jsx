import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import BurgerCard from "./burgerCard-constructor/burgerCard-constructor";
import React from "react";

function BurgerIngredients({data, setSelectedIngridients}) {
    const [current, setCurrent] = React.useState('one');
    return (
        <section className={styles.burgerIngredients}>
            <p className={'text text_type_main-large'}>Соберите бургер</p>
            <div className={'mt-5'} style={{display: 'flex'}}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <section className={`${styles.burgerSection} custom-scroll`}>
                <p className={'text text_type_main-medium mt-10 mb-6'}>Булки</p>
                <div className={`${styles.cardBox}`}>
                    {
                        data.filter(data=>data.type === 'bun').map((data) => {
                            return (<BurgerCard data={data} setSelectedIngridients={setSelectedIngridients}/>
                            )
                        })
                    }
                </div>
                <p className={'text text_type_main-medium mt-10 mb-6'}>Соусы</p>
                <div className={`${styles.cardBox}`}>
                    {
                        data.filter(data=>data.type === 'sauce').map((data) => {
                            return (<BurgerCard data={data} setSelectedIngridients={setSelectedIngridients}/>
                            )
                        })
                    }
                </div>
                <p className={'text text_type_main-medium mt-10 mb-6'}>Начинки</p>
                <div className={`${styles.cardBox}`}>
                    {
                        data.filter(data=>data.type === 'main').map((data) => {
                            return (<BurgerCard data={data} setSelectedIngridients={setSelectedIngridients}/>
                            )
                        })
                    }
                </div>
            </section>
        </section>
    )
}

export default BurgerIngredients;