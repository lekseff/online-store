import React from 'react'
import { NavLink } from 'react-router-dom';

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
