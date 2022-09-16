import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Начальное состояние
const initialState = {
  items: [],
  active: null,
};

/**
 * Загрузка списка фильтров категорий
 */
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    // console.warn('Загрузка фильтров')
    try {
      const response = await fetch('http://localhost:7070/api/categories');
      if (!response.ok) {
        throw new Error('Ошибка получения списка категорий');
      }
      const json = await response.json();
      return json;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.active = action.payload;
    },
  },
  extraReducers: {
    [fetchCategories.fulfilled]: (state, action) => {
      state.items = [{ id: null, title: 'Все' }].concat(action.payload);
    },
    [fetchCategories.rejected]: (state, action) => {
      console.warn(action.payload);
    },
  },
});

export const { setActiveCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
