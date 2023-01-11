import {
    CurrencyIcon,
    ConstructorElement,
    Button,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useRef } from 'react';
import stylesBurgerConstr from './BurgerConstructor.module.css';
import data from '../../utils/data';

export default function BurgerConstructor() {
    // const [sell,setSell] = React.useState(0)
    const getTotalSum = () => {
        let result = 0;
        data.forEach((item) => {
          result += item.price;
        });
        result -= 988;
        return result;
      };
    
      const totalSum = React.useMemo(() => {
        return getTotalSum();
      }, [data]);

    return (
        <section>
            <div className={`${stylesBurgerConstr.construcor} ml-4 pt-25`}>
                
                <div className={`pr-4`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={1255}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </div>
                
                <ul className={`${stylesBurgerConstr.list} ${stylesBurgerConstr.scroll} mt-4 mb-4`}>
                    {data.map((item) => {
                        if (item.type === 'main' || item.type === 'sauce') {
                            // setSell(sell + item.price)
                            return (
                                <li key={item._id} className={`${stylesBurgerConstr.item} mb-4 mr-2`}>
                                    <span className={`mr-2`}>
                                        <DragIcon type="primary" />
                                    </span>
                                    <ConstructorElement
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                    />
                                </li>)
                        }
                    })}
                </ul>

                <div className={`pr-4`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={1255}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </div>
            </div>
            <div className={`${stylesBurgerConstr.order} ml-4 mr-4 mt-10`}>
                <p className={`${stylesBurgerConstr.p} text text_type_digits-medium pr-10`}>
                    {totalSum}
                    <span className={`${stylesBurgerConstr.currencyIcon} ml-4 mr-1`}>
                        <CurrencyIcon type="primary"/>
                    </span>
                </p>
                <Button htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}