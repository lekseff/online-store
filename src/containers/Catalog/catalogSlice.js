import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import queryString from 'query-string';

//Начальное состояние
const initialState = {
  items: [],
  filter: {
    items: [],
  },
  waiting: true,
  error: null,
  loadMore: {
    show: true,
    waiting: false,
  },
};

// Загрузка списка фильтров категорий
export const fetchFilters = createAsyncThunk(
  'catalog/fetchFilters',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:7070/api/categories');
      if (!response.ok) {
        throw new Error('Ошибка получения категорий фильтра');
      }
      const json = await response.json();
      return json;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//Запрос на получение каталога
export const fetchCatalog = createAsyncThunk(
  'catalog/fetchCatalog',
  async (id = null, { rejectWithValue, dispatch }) => {
    try {
      const query = id ? `?categoryId=${id}` : ''; //! Посмотреть по параметрам + попробовать добавить поиск
      const response = await fetch(`http://localhost:7070/api/items${query}`);
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных "Каталог"');
      }
      const json = await response.json();
      if (json.length < 6) dispatch(hideLoadMore()); // Если пришло меньше 6 элементов, скрываем кнопку
      console.log('get catalog:', json)
      return json;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Подгрузка каталога по кнопке ещё
export const fetchMoreCatalog = createAsyncThunk(
  'catalog/fetchMoreCatalog',
  async (catalog, { rejectWithValue, dispatch }) => {
    try {
      const { id, offset } = catalog;
      // Формируем параметры запроса
      const params = queryString.stringify(
        {
          categoryId: id,
          offset: offset,
        },
        { skipNull: true, skipEmptyString: true }
      );
      console.log('Params:', params);
      const response = await fetch(`http://localhost:7070/api/items?${params}`);
      if (!response.ok) {
        throw new Error('Ошибка загрузки дополнительных товаров')
      }
      const json = await response.json();
      console.log('moreLoad', json);
      if (json.length < 6) dispatch(hideLoadMore()); // Если пришло меньше 6 элементов, скрываем кнопку
      return json;
    } catch (err) {
        return rejectWithValue(err.message);
    }    
  }
);

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    hideLoadMore: (state) => {
      state.loadMore.show = false;
    },
  },
  extraReducers: {
    [fetchCatalog.pending]: (state) => {
      state.items = [];
      state.waiting = true;
      state.error = null;
      state.loadMore.show = true;
      // state.offset = null;
    },
    [fetchCatalog.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.waiting = false;
    },
    [fetchCatalog.rejected]: (state, action) => {
      state.waiting = false;
      state.error = action.payload;
      console.warn(action.payload);
    },
    [fetchFilters.fulfilled]: (state, action) => {
      state.filter.items = action.payload;
    },
    [fetchFilters.rejected]: (state, action) => {
      state.error = action.payload;
      console.warn(action.payload);
    },
    [fetchMoreCatalog.pending]: (state, action) => {
      state.loadMore.waiting = true;
      state.error = '';
    },
    [fetchMoreCatalog.fulfilled]: (state, action) => {
      state.items = state.items.concat(action.payload);
      state.loadMore.waiting = false;
    },
    [fetchMoreCatalog.rejected]: (state, action) => {           
      state.loadMore.waiting = false;
      state.error = action.payload; 
      console.warn(action.payload);
    },
  },
});

export const { hideLoadMore } = catalogSlice.actions;
export default catalogSlice.reducer;
