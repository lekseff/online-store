import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue, fetchCatalog} from '../../containers/Catalog/catalogSlice';

function NavControls() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Поиск скрывается классом visible и invisible
  const [isOpen, setIsOpen] = useState('invisible');
  // Текст в поле ввода
  const [value, setValue] = useState('');
  // Общее количество товара в корзине
  const {totalCount} = useSelector(({basket}) => basket);

  /**
   * Действие по кнопке открыть
   */
  const onOpen = (event) => {
    event.preventDefault();
    if (value) {
      navigate('/catalog');
      dispatch(setSearchValue(value));
      dispatch(fetchCatalog());
       // Устанавливаем значение поиска из header в catalog
      setValue('');
    }
    // Если в поле есть текст отправляем на страницу каталога
    setIsOpen((prev) => (prev === 'invisible' ? 'visible' : 'invisible'));
  };

  /**
   * Обработчик поля ввода
   * @param {String} value
   */
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <div className='header-controls-pics'>
        <div
          onClick={onOpen}
          className='header-controls-pic header-controls-search'
        ></div>
        <form
          onSubmit={onOpen}
          data-id='search-form'
          className={`header-controls-search-form form-inline ${isOpen}`}
        >
          <input
            className='form-control'
            placeholder='Поиск'
            value={value}
            onChange={handleChange}
          />
        </form>
        <div
          onClick={() => navigate('/cart')}
          className='header-controls-pic header-controls-cart'
        >
          {totalCount > 0 && <div className='header-controls-cart-full'>{totalCount}</div>}
          <div className='header-controls-cart-menu'></div>
        </div>
      </div>
    </>
  );
}

export default React.memo(NavControls);
