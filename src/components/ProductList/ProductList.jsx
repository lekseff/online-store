import ProductCard from '../ProductCard/ProductCard';

function ProductList({items}) {
  return (
    <div className="row">
      {items.map(item => <ProductCard item={item} key={item.id}/>)}
    </div>
  )
}

export default ProductList;
