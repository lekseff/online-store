import Preloader from '../Preloader/Preloader';

function LoadMore(props) {
  const { show, isLoading, title } = props;

  //Если идет загрузка возвращаем лоадер
  if (isLoading) return <Preloader />;

  return (
    <>
      {!show ? null : (
        <div className='text-center'>
          <button
            className='btn btn-outline-primary'
            onClick={() => props.onLoadMore()}
          >
            {title}
          </button>
        </div>
      )}
    </>
  );
}

export default LoadMore;
