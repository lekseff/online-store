import { Link } from 'react-router-dom';
import {HOME_PAGE} from '../../constants';

function NoFound() {
  return (
    <section className='top-sales'>
      <h2 className='text-center'>Страница не найдена</h2>
      <p>Извините, такая страница не найдена!</p>
      <Link to={`${HOME_PAGE}`} style={{ color: 'blue' }}>
        На главную
      </Link>
    </section>
  );
}

export default NoFound;
