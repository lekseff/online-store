import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import queryString from 'query-string';

//Начальное состояние
const initialState = {
  items: [],
  params: {
    search: '',
    offset: 6,
  },
  waiting: true,
  error: null,
  loadMore: {
    show: true,
    waiting: false,
  },
};

//Запрос на получение каталога
export const fetchCatalog = createAsyncThunk(
  'catalog/fetchCatalog',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      dispatch(resetOffset()); // Оброс счетчика подгрузки

      const { categories, catalog } = getState();
      // Формируем параметры для загрузки
      const params = queryString.stringify(
        {
          categoryId: categories.active,
          q: catalog.params.search,
        },
        { skipNull: true, skipEmptyString: true }
      );
      const query = params ? '?' + params : '';
      // console.log('Params:', `http://localhost:7070/api/items${query}`);

      const response = await fetch(`http://localhost:7070/api/items${query}`);
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных "Каталог"');
      }
      const json = await response.json();
      // Если пришло меньше 6 элементов, скрываем кнопку
      if (json.length < 6) dispatch(hideLoadMore());
      return json;
    } catch (err) {
      return rejectWithValue('Упс, что-то пошло не так...');
    }
  }
);

// Подгрузка каталога по кнопке ещё
export const fetchMoreCatalog = createAsyncThunk(
  'catalog/fetchMoreCatalog',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const { categories, catalog } = getState();
      const { search, offset } = catalog.params;
      // Формируем параметры запроса
      const params = queryString.stringify(
        {
          categoryId: categories.active,
          q: search,
          offset: offset ? offset : '',
        },
        { skipNull: true, skipEmptyString: true }
      );
      console.log('Params:', params);
      const response = await fetch(`http://localhost:7070/api/items?${params}`);
      if (!response.ok) {
        throw new Error('Ошибка загрузки дополнительных товаров');
      }
      const json = await response.json();
      dispatch(setOffset());
      if (json.length < 6) dispatch(hideLoadMore()); // Если пришло меньше 6 элементов, скрываем кнопку
      return json;
    } catch (err) {
      return rejectWithValue('Упс, что-то пошло не так...');
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
    setSearchValue: (state, action) => {
      state.params.search = action.payload;
    },
    setOffset: (state) => {
      state.params.offset += 6;
    },
    resetOffset: (state) => {
      state.params.offset = 6;
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

export const { hideLoadMore, setSearchValue, setOffset, resetOffset } =
  catalogSlice.actions;
export default catalogSlice.reducer;
