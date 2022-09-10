import { configureStore } from '@reduxjs/toolkit';
import {catalog, topSales} from './exports'

export const store = configureStore({
  reducer: {
    topSales,
    catalog,
  },
});
