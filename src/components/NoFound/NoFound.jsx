import { Link } from 'react-router-dom';

function NoFound() {
  return (
    <section className='top-sales'>
      <h2 className='text-center'>Страница не найдена</h2>
      <p>Извините, такая страница не найдена!</p>
      <Link to={'/'} style={{ color: 'blue' }}>
        На главную
      </Link>
    </section>
  );
}

export default NoFound;
