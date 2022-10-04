import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import getPath from '../../utils/getPath';

function ProductCard({ item }) {
  return (
    <div className='col-4'>
      <div className='card catalog-item-card'>
        <div className='card-image'>
          <img
            src={item.images[0]}
            className='card-img-top img-fluid card-image-catalog'
            alt={item.title}
          />
        </div>
        <div className='card-body'>
          <p className='card-text'>{item.title}</p>
          <p className='card-text'><strong>{item.price}</strong> <span>руб.</span></p>
          <Link to={getPath(`/catalog/${item.id}`)} className='btn btn-outline-primary'>
            Заказать
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired,
  }),
};
