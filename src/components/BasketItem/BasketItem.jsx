import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function BasketItem(props) {
  const { id, title, price, count, size } = props.item;

  return (
    <tr>
      <td>{props.index}</td>
      <td>
        <Link to={`/catalog/${id}`}>{title}</Link>
      </td>
      <td>{size}</td>
      <td>{count}</td>
      <td>{price}</td>
      <td>{price * count}</td>
      <td>
        <button
          className='btn btn-outline-danger btn-sm'
          onClick={() => props.onRemove(props.item)}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
}

export default BasketItem;

BasketItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,
  }),
};
