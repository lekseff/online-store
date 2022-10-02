import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import log from 'loglevel';
import { createRequest } from '../../services/api'

// Начальное состояние
const initialState = {
  items: [],
  active: null,
};

// В логах показываем WARN и ERROR
const categoriesLog = log.getLogger('Categories');
categoriesLog.setLevel(3); 

/**
 * Загрузка списка фильтров категорий
 */
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      // Запрос на получение данных с API
      const response = await createRequest('/categories');
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
      categoriesLog.warn(action.payload);
    },
  },
});

export const { setActiveCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
