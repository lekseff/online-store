import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { catalog, topSales, categories, product, basket } from './exports';
import { addToBasket, removeFromBasket } from '../containers/Basket/basketSlice';
import storage from '../services/storage';

// Создаем слушатель-middleware 
const listenerMiddleware = createListenerMiddleware();

// Подписываемся на определенные actions (добавление и удаление из корзины)
listenerMiddleware.startListening({
  matcher: isAnyOf(addToBasket, removeFromBasket) ,
  effect: (action, listenerApi) => {
    storage.setStorage('basket', listenerApi.getState().basket);
  },  
});

export const store = configureStore({
  reducer: {
    topSales,
    catalog,
    categories,
    product,
    basket,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
