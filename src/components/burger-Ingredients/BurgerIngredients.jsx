import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import BurgerCard from "./burgerCard-constructor/burgerCard-constructor";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loadIngridients } from '../../service/stores';

function BurgerIngredients() {
    const [current, setCurrent] = useState('one');
    const tabsRef = useRef();
    const bunsRef = useRef();
    const sauceRef = useRef();
    const mainRef = useRef();
    const onClick = (value) => {
        const section = document.getElementById(value);
        section.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
        return setCurrent(value);
    }
    const dispatch = useDispatch();
    const data = useSelector(state => state.burgerConstructor.ingredientsList);
    useEffect(() => {
        dispatch(loadIngridients());
    }, [dispatch])
    const buns = data.filter(data => data.type === 'bun');
    const sauce = data.filter(data => data.type === 'sauce');
    const main = data.filter(data => data.type === 'main');
    const handlerScroll = (event) => {
        const bunsTop = bunsRef.current.getBoundingClientRect().top;
        const sauceTop = sauceRef.current.getBoundingClientRect().top;
        const mainTop = mainRef.current.getBoundingClientRect().top;
        const tabsBottom = tabsRef.current.getBoundingClientRect().bottom;
        const bunsDelta = Math.abs(tabsBottom - bunsTop);
        const sauceDelta = Math.abs(tabsBottom - sauceTop);
        const mainDelta = Math.abs(tabsBottom - mainTop);
        const min = Math.min(bunsDelta, sauceDelta, mainDelta);
        const newTab = min === bunsDelta ? "bun" : min === sauceDelta ? "sauce" : "main";
        console.log(newTab);
    }

    return (
        <section className={styles.burgerIngredients}>
            <p className={'text text_type_main-large'}>Соберите бургер</p>
            <div className={'mt-5'} style={{ display: 'flex' }} ref={tabsRef}>
                <Tab value="one" active={current === 'one'} onClick={onClick}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={onClick}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={onClick}>
                    Начинки
                </Tab>
            </div>
            <section className={`${styles.burgerSection} custom-scroll`} onScroll={handlerScroll}>
                <p className={'text text_type_main-medium mt-10 mb-6'} id='one' ref={bunsRef} >Булки</p>
                <div className={`${styles.cardBox}`} ref={bunsRef}>
                    {
                        buns.map((data) => {
                            return (<BurgerCard data={data} />
                            )
                        })
                    }
                </div>
                <p className={'text text_type_main-medium mt-10 mb-6'} id='two' ref={sauceRef}>Соусы</p>
                <div className={`${styles.cardBox}`} >
                    {
                        sauce.map((data) => {
                            return (<BurgerCard data={data} onMouseMove={console.log('я в фокусе2')} />
                            )
                        })
                    }
                </div>
                <p className={'text text_type_main-medium mt-10 mb-6'} id='three' ref={mainRef}>Начинки</p>
                <div className={`${styles.cardBox}`} >
                    {
                        main.map((data) => {
                            return (<BurgerCard data={data} />
                            )
                        })
                    }
                </div>
            </section>
        </section>
    )
}

export default BurgerIngredients;