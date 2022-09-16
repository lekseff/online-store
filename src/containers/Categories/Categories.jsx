import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  setActiveCategory,
} from '../Categories/categoriesSlice';
import CategoryItem from '../../components/CategoryItem/CategoryItem';

function Categories() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const { items, active } = useSelector(({ categories }) => categories);

  const onCategory = (id) => {
    dispatch(setActiveCategory(id));
  };

  if (items.length <= 1) return null;

  return (
    <ul className='catalog-categories nav justify-content-center'>
      {items.map((item) => (
        <CategoryItem
          item={item}
          active={active}
          key={item.id}
          onCategory={onCategory}
        />
      ))}
    </ul>
  );
}

export default React.memo(Categories);
