import { createSlice } from '@reduxjs/toolkit';

//Начальное состояние
const initialState = {
  items: [],
};

/**
 * Добавляет товар в корзину
 * @param {Array} basket - актуальные данные в корзине
 * @param {Object} product - новый товар
 * @returns 
 */
const addProduct = (basket, product) => {  
  let found = false; // Флаг, найден товар или нет
  const items = basket.map(item => {
    if (item.id === product.id && item.size === product.size) {
      found = true;
      item.count += product.count;
      return item;
    }
    return item;
  });

  // Добавляем, если товар не найден
  if (!found) items.push(product);
  return items;  
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = addProduct(state.items, action.payload);
    },
    removeFromBasket: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    restoreBasket: (state, action) => {
      state.items = action.payload.items;
    },
    clearBasket: (state) => {
      state.items = [];
    }
  },
});

export const { addToBasket, removeFromBasket, restoreBasket, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
