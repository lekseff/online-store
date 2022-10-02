import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BasketItem from '../../components/BasketItem/BasketItem';
import { removeFromBasket } from './basketSlice';
import { selectTotalPrice, selectTotalCount } from '../Basket/selector';

function Basket() {
  const dispatch = useDispatch();
  const { items } = useSelector(({ basket }) => basket);

  // Получаем общее количество и стоимость
  const { totalPrice, totalCount } = useSelector((state) => ({
    totalPrice: selectTotalPrice(state),
    totalCount: selectTotalCount(state),
  }));

  const onRemoveProduct = (item) => {
    dispatch(removeFromBasket(item));
  };

  // Если в корзине пусто показывает сообщение
  if (totalCount === 0)
    return (
      <p
        style={{
          fontSize: '26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '40%',
        }}
      >
        В корзине пусто
      </p>
    );

  return (
    <section className='cart'>
      <h2 className='text-center'>Корзина</h2>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Название</th>
            <th scope='col'>Размер</th>
            <th scope='col'>Кол-во</th>
            <th scope='col'>Стоимость</th>
            <th scope='col'>Итого</th>
            <th scope='col'>Действия</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: 'center' }}>
          {items.map((item, idx) => (
            <BasketItem
              item={item}
              key={item.id}
              index={idx + 1}
              onRemove={onRemoveProduct}
            />
          ))}
          <tr>
            <td colSpan='5' className='text-right'>
              Общая стоимость
            </td>
            <td>{totalPrice}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default Basket;
