import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Categories from '../Categories/Categories';
import Preloader from '../../components/Preloader/Preloader';
import LayoutCards from '../../components/LayoutCards/LayoutCards';
import ProductList from '../../components/ProductList/ProductList';
import LoadMore from '../../components/LoadMore/LoadMore';
import Search from '../../components/Search/Search';
import ErrorLoading from '../../components/ErrorLoading/ErrorLoading';
import { fetchCatalog, fetchMoreCatalog, setSearchValue } from './catalogSlice';

function Catalog() {
  const path = useLocation();
  const dispatch = useDispatch();
  // console.log('path', path.pathname === '/catalog'); //! Работает но проверить стили и др вариант

  const select = useSelector((state) => ({
    items: state.catalog.items,
    waiting: state.catalog.waiting,
    error: state.catalog.error,
    isLoadingMore: state.catalog.loadMore.waiting,
    showLoadMore: state.catalog.loadMore.show,
    searchValue: state.catalog.params.search,
    activeCategory: state.categories.active,
  }));

  useEffect(() => {
    dispatch(fetchCatalog());
  }, [select.activeCategory, dispatch]);

  const callbacks = {
    onLoadMore: () => {
      dispatch(fetchMoreCatalog());
    },
    handleChange: useCallback(
      (value) => {
        dispatch(setSearchValue(value));
      },
      [dispatch]
    ),
    onSearch: useCallback(() => {
      dispatch(fetchCatalog());
    }, [dispatch]),
  };

  // Не показываем каталог если список пуст и не ожидаем загрузки
  // if (!select.items.length && !select.waiting) return null;
  if (select.error) return <ErrorLoading message={select.error} />;

  return (
    <LayoutCards className='catalog' title='Каталог'>
      {path.pathname === '/catalog' && (
        <Search
          value={select.searchValue}
          handleChange={callbacks.handleChange}
          onSearch={callbacks.onSearch}
        />
      )}
      <Categories />
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

export default React.memo(Catalog);
