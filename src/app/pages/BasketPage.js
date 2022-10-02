import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Basket from '../../containers/Basket/Basket';
import OrderForm from '../../components/OrderForm/OrderForm';
import { clearBasket } from '../../containers/Basket/basketSlice';
import Preloader from '../../components/Preloader/Preloader';
import SuccessOrder from '../../components/SuccessOrder/SuccessOrder';
import log from 'loglevel';
import { createRequest } from '../../services/api';

function BasketPage() {
  // Scroll в начало страницы
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const [waiting, setWaiting] = useState(false); // Ожидание загрузки
  const [success, setSuccess] = useState(false); // Статус отправки формы заказа
  const basket = useSelector(({ basket }) => basket);

  //В логах показываем только WARN
  const basketPageLog = log.getLogger('BasketPage');
  basketPageLog.setLevel('WARN');

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
        const response = await createRequest('/order', 'POST', {
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
        basketPageLog.warn(err);
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
