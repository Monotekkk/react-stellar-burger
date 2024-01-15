import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import BurgerCard from "./ingredients-card/ingredients-card";
import {useState, useRef, useMemo} from "react";
import { useSelector } from 'react-redux';

function BurgerIngredients() {
    document.title = 'Stellar Burgers - космические бургеры.';
    const [current, setCurrent] = useState('bun');
    const tabsRef = useRef();
    const bunsRef = useRef();
    const sauceRef = useRef();
    const mainRef = useRef();
    const onClick = (value) => {
        const section = document.getElementById(value);
        section.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
        return setCurrent(value);
    }
    const data = useSelector(state => state.ingredientsList.ingredientsList);

    const buns = useMemo(
        () => data.filter((item) => item.type === "bun"),
        [data]
    );
    const sauce = useMemo(
        ()=>data.filter(item=>item.type === 'sauce'),
        [data]
    );
    const main = useMemo(
        ()=> data.filter(item=>item.type ==='main'),
        [data]
    );
    const handlerScroll = () => {
        const bunsTop = bunsRef.current.getBoundingClientRect().top;
        const sauceTop = sauceRef.current.getBoundingClientRect().top;
        const mainTop = mainRef.current.getBoundingClientRect().top;
        const tabsBottom = tabsRef.current.getBoundingClientRect().bottom;
        const bunsDelta = Math.abs(bunsTop - tabsBottom);
        const sauceDelta = Math.abs(sauceTop - tabsBottom);
        const mainDelta = Math.abs(mainTop - tabsBottom);
        const min = Math.min(bunsDelta, sauceDelta, mainDelta);
        const newTab = min === bunsDelta ? "bun" : min === sauceDelta ? "sauce" : "main";
        setCurrent(newTab);
    }
    return (
        <section className={styles.burgerIngredients}>
            <p className={'text text_type_main-large'}>Соберите бургер</p>
            <div className={`mt-5 ${styles.tabs}`} ref={tabsRef}>
                <Tab value="bun" active={current === 'bun'} onClick={onClick}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={onClick}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={onClick}>
                    Начинки
                </Tab>
            </div>
            <section className={`${styles.burgerSection} custom-scroll`} onScroll={handlerScroll}>
                <p className={'text text_type_main-medium mt-10 mb-6'} id='bun' ref={bunsRef} >Булки</p>
                <div className={`${styles.cardBox}`}>
                    {
                        buns.map((data) => {
                            return (<BurgerCard data={data} key={data._id}/>
                            )
                        })
                    }
                </div>
                <p className={'text text_type_main-medium mt-10 mb-6'} id='sauce' ref={sauceRef}>Соусы</p>
                <div className={`${styles.cardBox}`} >
                    {
                        sauce.map((data) => {
                            return (<BurgerCard data={data} key={data._id}/>
                            )
                        })
                    }
                </div>
                <p className={'text text_type_main-medium mt-10 mb-6'} id='main' ref={mainRef}>Начинки</p>
                <div className={`${styles.cardBox}`} >
                    {
                        main.map((data) => {
                            return (<BurgerCard data={data} key={data._id}/>
                            )
                        })
                    }
                </div>
            </section>
        </section>
    )
}

export default BurgerIngredients;