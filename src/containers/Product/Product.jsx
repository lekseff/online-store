import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchData,
  setSelectedSize,
  increaseNumber,
  reduceNumber,
} from '../Product/productSlice';
import { addToBasket } from '../Basket/basketSlice';
import ProductLoader from '../../components/ProductLoader/ProductLoader';
import getPath from '../../utils/getPath';


function Product() {
  const MAX_COUNT = 10; // Максимальное количество товара при добавлении в корзину
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, count, selectedSize, waiting, error } = useSelector(
    ({ product }) => product
  );

  useEffect(() => {
    dispatch(fetchData(id));
  }, [id, dispatch]);

  // if (!data) return null; // Пока товаров нет ничего не показываем

  const callbacks = {
    onSelectSize: (size) => {
      dispatch(setSelectedSize(size));
    },
    incNumber: () => {
      dispatch(increaseNumber());
    },
    decNumber: () => {
      dispatch(reduceNumber());
    },
    addProduct: () => {
      const item = {
        id: data.id,
        title: data.title,
        price: data.price,
        count: count,
        size: selectedSize,
      };
      dispatch(addToBasket(item));
      navigate(getPath('/cart'));
    },
  };

  if (waiting) return <ProductLoader />;

  // Доступные размеры
  const availableSizes = data.sizes.filter((size) => size.avalible);

  return (
    <section className='catalog-item'>
      <h2 className='text-center'>{data.title}</h2>
      <div className='row'>
        <div className='col-5'>
          <img src={data.images[0]} className='img-fluid' alt={data.title} />
        </div>
        <div className='col-7'>
          <table className='table table-bordered'>
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{data.sku}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{data.manufacturer}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{data.color}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{data.material}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{data.season}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{data.reason}</td>
              </tr>
            </tbody>
          </table>

          {availableSizes.length ? (
            <div className='text-center'>
              <p>
                Размеры в наличии:{' '}
                {availableSizes.map((item) => (
                  <span
                    className={`catalog-item-size ${
                      selectedSize === item.size ? 'selected' : ''
                    }`}
                    key={item.size}
                    onClick={() => callbacks.onSelectSize(item.size)}
                  >
                    {item.size}
                  </span>
                ))}
              </p>
              <p>
                Количество:{' '}
                <span className='btn-group btn-group-sm pl-2'>
                  <button
                    className='btn btn-secondary'
                    onClick={callbacks.decNumber}
                    disabled={count === 1}
                  >
                    -
                  </button>
                  <span className='btn-group-counter'>{count}</span>
                  <button
                    className='btn btn-secondary'
                    onClick={callbacks.incNumber}
                    disabled={count === MAX_COUNT}
                  >
                    +
                  </button>
                </span>
              </p>
            </div>
          ) : null}
          <button
            className='btn btn-danger btn-block btn-lg'
            disabled={!selectedSize}
            onClick={callbacks.addProduct}
          >
            {availableSizes.length ? 'В корзину' : 'Товар недоступен'}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Product;
