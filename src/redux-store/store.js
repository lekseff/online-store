import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from '@reduxjs/toolkit';
import { catalog, topSales, categories, product, basket } from './exports';
import {
  addToBasket,
  removeFromBasket,
  clearBasket,
} from '../containers/Basket/basketSlice';
import storage from '../services/storage';

// Создаем слушатель-middleware
const listenerMiddleware = createListenerMiddleware();

// Подписываемся на определенные actions (добавление и удаление из корзины)
listenerMiddleware.startListening({
  matcher: isAnyOf(addToBasket, removeFromBasket, clearBasket),
  effect: (action, listenerApi) => {
    const { basket } = listenerApi.getState();
    // Если корзина пуста очищаем localStorage
    if (!basket.items.length) {
      storage.clearStorage('basket');
    } else {
      storage.setStorage('basket', basket);
    }
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
