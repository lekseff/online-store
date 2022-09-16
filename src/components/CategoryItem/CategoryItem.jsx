import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function CategoryItem({item, active,onCategory}) {

  const handleClick = (id) => {
    onCategory(id);
  };

  return (
    <li className='nav-item'>
      <Link
        to=''
        className={`nav-link ${active === item.id ? 'active' : ''}`}
        onClick={() => handleClick(item.id)}
      >
        {item.title}
      </Link>
    </li>
  );
}

export default CategoryItem;

CategoryItem.propTypes = {
  item: PropTypes.object.isRequired,
  active: PropTypes.number,
  onCategory: PropTypes.func.isRequired,
};

CategoryItem.defaultProps = {
  active: null,
};
