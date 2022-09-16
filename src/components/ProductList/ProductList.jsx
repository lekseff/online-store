import React from 'react'
import ProductCard from '../ProductCard/ProductCard';
import PropTypes from 'prop-types';

function ProductList({items}) {
  return (
    <div className="row">
      {items.map(item => <ProductCard item={item} key={item.id}/>)}
    </div>
  )
}

export default React.memo(ProductList);

ProductList.propTypes = {
  items: PropTypes.array.isRequired,
}