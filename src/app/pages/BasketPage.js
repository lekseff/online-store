import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Basket from '../../containers/Basket/Basket';
import OrderForm from '../../components/OrderForm/OrderForm';
import { clearBasket } from '../../containers/Basket/basketSlice';

function BasketPage() {
  const dispatch = useDispatch();
  const basket = useSelector(({ basket }) => basket);

  /**
   * Отправка формы заказа
   * @param {*} data - данные формы
   */
  const sendForm = (data) => {
    const body = {
      owner: { ...data },
      items: [...basket.items],
    };
    const sendData = async (body) => {
      const response = await fetch('http://localhost:7070/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        dispatch(clearBasket());
      }
    };
    sendData(body);
  };

  return (
    <>
      <Basket />
      {basket.items.length > 0 && <OrderForm onSend={sendForm} />}
    </>
  );
}

export default BasketPage;
