import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createRequest } from '../../services/api';

//Начальное состояние
const initialState = {
  data: null,
  count: 1,
  selectedSize: null,
  waiting: true,
  error: null,
};

/**
 * Получает данные товара по id
 */
export const fetchData = createAsyncThunk(
  'product/fetchData',
  async (id, { rejectWithValue }) => {
    try {
      const response = await createRequest(`/items/${id}`);
      const json = await response.json();
      return json;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSelectedSize: (state, action) => {
      state.selectedSize = action.payload;
    },
    increaseNumber: (state) => {
      state.count += 1;
    },
    reduceNumber: (state) => {
      state.count -= 1;
    },
  },
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.waiting = true;
      state.data = null;
      state.count = 1;
      state.selectedSize = null;
      state.error = null;
    },
    [fetchData.fulfilled]: (state, action) => {
      state.waiting = false;
      state.data = action.payload;
    },
    [fetchData.rejected]: (state, action) => {
      state.waiting = false;
      state.error = action.payload;
    },
  },
});

export const { setSelectedSize, increaseNumber, reduceNumber } =
  productSlice.actions;
export default productSlice.reducer;
