import React from 'react';
import { v4 } from 'uuid';
import NavItem from '../NavItem/NavItem';
import PropTypes from 'prop-types';

function NavList({ items }) {
  return (
    <ul className='navbar-nav mr-auto'>
      {items.map((item) => (
        <NavItem item={item} key={v4()} />
      ))}
    </ul>
  );
}

export default React.memo(NavList);

NavList.propTypes = {
  items: PropTypes.array.isRequired,
};
