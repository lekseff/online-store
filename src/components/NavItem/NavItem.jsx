import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Элемент списка навигации
 * @param {*} param0
 * @returns
 */
function NavItem({ item }) {
  const { name, link } = item;

  return (
    <li className='nav-item'>
      <NavLink to={link} className='nav-link'>
        {name}
      </NavLink>
    </li>
  );
}

export default React.memo(NavItem);

NavItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }),
};
