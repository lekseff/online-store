import React from 'react'

function SearchForm(props) {

  // Скрывается классом visible и invisible
  const [isOpen, setIsOpen] = React.useState('visible');

  const onOpen = ()=> {
    setIsOpen((prev)=> prev === 'invisible' ? 'visible' : 'invisible');
  }

  return (
      <form
        data-id='search-form'
        className={`header-controls-search-form form-inline ${isOpen}`}
      >
        <input className='form-control' placeholder='Поиск' />
      </form>
  );
}

export default SearchForm;
