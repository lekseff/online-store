import Preloader from '../Preloader/Preloader';
import PropTypes from 'prop-types';

function LoadMore({ show, isLoading, title, onLoadMore }) {
  //Если идет загрузка возвращаем лоадер
  if (isLoading) return <Preloader />;

  return (
    <>
      {!show ? null : (
        <div className='text-center'>
          <button
            className='btn btn-outline-primary'
            onClick={() => onLoadMore()}
          >
            {title}
          </button>
        </div>
      )}
    </>
  );
}

export default LoadMore;

LoadMore.propTypes = {
  show: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};
