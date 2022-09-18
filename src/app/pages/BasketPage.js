import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Basket from '../../containers/Basket/Basket';
import OrderForm from '../../components/OrderForm/OrderForm';
import { clearBasket } from '../../containers/Basket/basketSlice';
import Preloader from '../../components/Preloader/Preloader';
import SuccessOrder from '../../components/SuccessOrder/SuccessOrder';

function BasketPage() {
  // Scroll в начало страницы
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const [waiting, setWaiting] = useState(false); // Ожидание загрузки
  const [success, setSuccess] = useState(false); // Статус отправки формы заказа
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
      setWaiting(true);
      try {
        const response = await fetch('http://localhost:7070/api/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(body),
        });
        if (response.ok) {
          dispatch(clearBasket());
          setSuccess(true);
        }
      } catch (err) {
        console.warn(err);
      } finally {
        setWaiting(false);
      }
    };
    sendData(body);
  };

  // Если заказ успешно оформлен
  if (success) return <SuccessOrder />;

  return (
    <>
      <Basket />
      {waiting && <Preloader />}
      {!waiting && basket.items.length > 0 && <OrderForm onSend={sendForm} />}
    </>
  );
}

export default BasketPage;
