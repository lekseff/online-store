import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

function Search({ value, handleChange, onSearch }) {
  console.log('Search')

  const callbacks = {
    handleChange: (value) => {
      handleChange(value);
      if (!value) onSearch(); // Если ничего нет в поиске запрос делаем запрос
    },
    handleSubmit: (event) => {
      event.preventDefault();
      onSearch();
    },
  };

  useEffect(() => {
    return () => callbacks.handleChange('')
  }, [])

  return (
    <div className={'catalog-search'}>
      <form
        onSubmit={callbacks.handleSubmit}
        className={`catalog-search-form form-inline`}
      >
        <input
          className='form-control'
          placeholder='Поиск'
          value={value}
          onChange={(e) => callbacks.handleChange(e.target.value)}
          required
        />
        <button className='header-controls-pic catalog-controls-search'></button>
      </form>
    </div>
  );
}

export default React.memo(Search);

Search.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};
