import photo from '../../assets/products/сlassic_sneakers.jpg'

function ProductCard(props) {
  const {item} = props;
  
  return (
    <div className='col-4'>
      <div className='card catalog-item-card'>
        <img
          src={item.images[0]}
          className='card-img-top img-fluid'
          alt={''}
        />
        <div className='card-body'>
          <p className='card-text'>{item.title}</p>
          <p className='card-text'>{item.price} руб.</p>
          <a href='/products/1.html' className='btn btn-outline-primary'>
            Заказать
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

ProductCard.defaultProps = {
  item: {
    title: '',
    images: '',
    price: '',
  }
}
