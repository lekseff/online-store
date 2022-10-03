import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import queryString from 'query-string';
import log from 'loglevel';
import { createRequest } from '../../services/api';
import { MAX_COUNT_CARD } from '../../constants'; // 6

//Начальное состояние
const initialState = {
  items: [],
  params: {
    search: '',
    page: 1,
  },
  waiting: true,
  error: null,
  loadMore: {
    show: true,
    waiting: false,
  },
};

// В логах показываем WARN и ERROR
const catalogLog = log.getLogger('Catalog');
log.setLevel(3);

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
          category: categories.active,
          title: catalog.params.search,
          page: 1,
          limit: MAX_COUNT_CARD,
        },
        { skipNull: true, skipEmptyString: true }
      );

      // Запрос на получение данных с API
      const response = await createRequest(`/items?${params}`);
      const json = await response.json();
      // Если пришло меньше 6 элементов, скрываем кнопку
      if (json.length < MAX_COUNT_CARD) dispatch(hideLoadMore());
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
      const { search, page } = catalog.params;
      // Формируем параметры запроса
      const params = queryString.stringify(
        {
          category: categories.active,
          title: search,
          limit: MAX_COUNT_CARD,
          page: page + 1,
        },
        { skipNull: true, skipEmptyString: true }
      );
      // Запрос на получение данных с API

      const response = await createRequest(`/items?${params}`);
      const json = await response.json();
      dispatch(setOffset());
      if (json.length < MAX_COUNT_CARD) dispatch(hideLoadMore()); // Если пришло меньше 6 элементов, скрываем кнопку
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
      state.params.page = 1;
    },
    [fetchCatalog.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.waiting = false;
    },
    [fetchCatalog.rejected]: (state, action) => {
      state.waiting = false;
      state.error = action.payload;
      catalogLog.warn(action.payload);
    },
    [fetchMoreCatalog.pending]: (state, action) => {
      state.loadMore.waiting = true;
      state.error = '';
    },
    [fetchMoreCatalog.fulfilled]: (state, action) => {
      state.items = state.items.concat(action.payload);
      state.params.page += 1;
      state.loadMore.waiting = false;
    },
    [fetchMoreCatalog.rejected]: (state, action) => {
      state.loadMore.waiting = false;
      state.error = action.payload;
      catalogLog.warn(action.payload);
    },
  },
});

export const { hideLoadMore, setSearchValue, setOffset, resetOffset } =
  catalogSlice.actions;
export default catalogSlice.reducer;
