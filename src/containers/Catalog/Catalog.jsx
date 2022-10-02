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

  const selectCatalog = useSelector(({ catalog }) => ({
    items: catalog.items,
    waiting: catalog.waiting,
    error: catalog.error,
    isLoadingMore: catalog.loadMore.waiting,
    showLoadMore: catalog.loadMore.show,
    searchValue: catalog.params.search,
  }));

  const selectCategories = useSelector(({ categories }) => ({
    active: categories.active,
  }));

  useEffect(() => {
    dispatch(fetchCatalog());
  }, [selectCategories.active, dispatch]);

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
  if (selectCatalog.error)
    return <ErrorLoading message={selectCatalog.error} />;

  return (
    <LayoutCards className='catalog' title='Каталог'>
      {path.pathname === '/catalog' && (
        <Search
          value={selectCatalog.searchValue}
          handleChange={callbacks.handleChange}
          onSearch={callbacks.onSearch}
        />
      )}
      <Categories />
      {selectCatalog.waiting && <Preloader />}
      {!!selectCatalog.items.length && (
        <>
          <ProductList items={selectCatalog.items} />
          <LoadMore
            show={selectCatalog.showLoadMore}
            isLoading={selectCatalog.isLoadingMore}
            title={'Загрузить ещё'}
            onLoadMore={callbacks.onLoadMore}
          />
        </>
      )}
    </LayoutCards>
  );
}

export default React.memo(Catalog);
