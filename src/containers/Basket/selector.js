import { createSelector } from '@reduxjs/toolkit';

// Получаем элементы корзины
const selectBasketItems = (state) => state.basket.items;

// Общая стоимость
export const selectTotalPrice = createSelector(selectBasketItems, (items) =>
  items.reduce((acc, item) => acc + item.price * item.count, 0)
);

// Общее количество
export const selectTotalCount = createSelector(selectBasketItems, (items) => 
  items.reduce((acc, item) => acc + item.count, 0)
);