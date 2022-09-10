import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Начальное состояние
const initialState = {
  items: [],
  waiting: true,
  error: null,
};

// Запрос на получение данных 'Хиты продаж'
export const fetchSales = createAsyncThunk('sales/fetchSales', async (_, {rejectWithValue} ) => {
  try {
    const response = await fetch('http://localhost:7070/api/top-sales');
    if (!response.ok) {
      throw new Error('Ошибка получения данных блока "Хиты продаж"');
    }
    const json = await response.json();
    return json;
  } catch (err) {
    return rejectWithValue(err.message)
  }  
});

const topSalesSlice = createSlice({
  name: 'sales',
  initialState,
  extraReducers: {
    [fetchSales.pending]: (state) => {
      state.waiting = true;
      state.error = null;
    },
    [fetchSales.fulfilled]: (state, action) => {
      state.waiting = false;
      state.items = action.payload;
    },
    [fetchSales.rejected]: (state, action) => {
      state.waiting = false;
      state.error = 'Ошибка получения данных';
      console.warn(action.payload, );
    },
  },
});

export default topSalesSlice.reducer;
