import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import log from 'loglevel';
import {createRequest} from '../../services/api';

// Начальное состояние
const initialState = {
  items: [],
  waiting: true,
  error: null,
};

// В логах показываем WARN и ERROR
const topSalesLog = log.getLogger('TopSales');
topSalesLog.setLevel(3);

// Запрос на получение данных 'Хиты продаж'
export const fetchSales = createAsyncThunk(
  'sales/fetchSales',
  async (_, { rejectWithValue }) => {
    try {
      // Запрос на получение данных с API
      const response = await createRequest('/top-sales');
      const json = await response.json();
      return json;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const topSalesSlice = createSlice({
  name: 'sales',
  initialState,
  extraReducers: {
    [fetchSales.pending]: (state) => {
      state.waiting = true;
      state.error = null;
      state.items = [];
    },
    [fetchSales.fulfilled]: (state, action) => {
      state.waiting = false;
      state.items = action.payload;
    },
    [fetchSales.rejected]: (state, action) => {
      state.waiting = false;
      state.error = 'Ошибка получения данных';
      topSalesLog.warn(action.payload);
    },
  },
});

export default topSalesSlice.reducer;
