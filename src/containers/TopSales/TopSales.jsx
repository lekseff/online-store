import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSales } from './topSalesSlice';
import Preloader from '../../components/Preloader/Preloader';
import ProductList from '../../components/ProductList/ProductList';
import LayoutCards from '../../components/LayoutCards/LayoutCards';

function TopSales() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  const {items, waiting, error} = useSelector((state) => state.topSales);

  // Скрываем хиты продаж, если нет товаров и не ждем загрузки
  if (!items.length && !waiting) return null;

  return (
    <LayoutCards className={'top-sales'} title={'Хиты продаж!'}>
      {waiting ? <Preloader /> : null}
      {!!items.length && <ProductList items={items} />}
    </LayoutCards>
  );
}

export default React.memo(TopSales);
