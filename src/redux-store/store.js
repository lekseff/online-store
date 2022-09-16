import { configureStore } from '@reduxjs/toolkit';
import { catalog, topSales, categories, product, basket } from './exports';

export const store = configureStore({
  reducer: {
    topSales,
    catalog,
    categories,
    product,
    basket,
  },
});
