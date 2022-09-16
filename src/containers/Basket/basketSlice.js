import { createSlice } from '@reduxjs/toolkit';

//Начальное состояние
const initialState = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
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
      state.totalPrice += (action.payload.price * action.payload.count);
      state.totalCount += action.payload.count;
    },
    removeFromBasket: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalCount -= action.payload.count;
      state.totalPrice -= action.payload.price * action.payload.count;
    }
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;
export default basketSlice.reducer;
