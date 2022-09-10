import React, { useEffect, useState } from 'react';
import Filter from '../../components/Filter/Filter';
import Preloader from '../../components/Preloader/Preloader';
import LayoutCards from '../../components/LayoutCards/LayoutCards';
import ProductList from '../../components/ProductList/ProductList';
import LoadMore from '../../components/LoadMore/LoadMore';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatalog, fetchFilters, fetchMoreCatalog } from './catalogSlice';
import SearchForm from '../../components/SearchForm/SearchForm';
import { useLocation } from 'react-router-dom';

function Catalog() {
  const path = useLocation();
  console.log('path', path.pathname === '/catalog'); //! Работает но проверить стили и др вариант

  const dispatch = useDispatch();
  // Активный элемент фильтра
  const [activeId, setActiveId] = useState(null);
  // Количество элементов для пропуска подгрузки
  const [offset, setOffset] = useState(6);

  // Загрузка списка фильтра и каталога
  useEffect(() => {
    dispatch(fetchFilters());
    dispatch(fetchCatalog());
  }, [dispatch]);

  const select = useSelector((state) => ({
    items: state.catalog.items,
    filters: state.catalog.filter.items,
    waiting: state.catalog.waiting,
    error: state.catalog.error,
    isLoadingMore: state.catalog.loadMore.waiting,
    showLoadMore: state.catalog.loadMore.show,
  }));

  const callbacks = {
    onFilter: (id) => {
      if (id === activeId) return; // Не загружаем при повторном клике по фильтру
      dispatch(fetchCatalog(id));
      setActiveId(() => id);
      setOffset(6);
    },
    onLoadMore: () => {
      dispatch(fetchMoreCatalog({ id: activeId, offset }));
      setOffset((prev) => prev + 6); //! Может быть косяк при ошибке загрузки(все равно прибавляет)
    },
  };

  // Список фильтров
  const filters = [{ id: null, title: 'Все' }, ...select.filters];

  // Не показываем каталог если список пуст и не ожидаем загрузки
  if (!select.items.length && !select.waiting) return null;

  return (
    <LayoutCards className='catalog' title='Каталог'>
      {path.pathname === '/catalog' && <SearchForm />}
      <Filter items={filters} active={activeId} onFilter={callbacks.onFilter} />
      {select.waiting && <Preloader />}
      {!!select.items.length && (
        <>
          <ProductList items={select.items} />
          <LoadMore
            show={select.showLoadMore}
            isLoading={select.isLoadingMore}
            title={'Загрузить ещё'}
            onLoadMore={callbacks.onLoadMore}
          />
        </>
      )}
    </LayoutCards>
  );
}

export default Catalog;
