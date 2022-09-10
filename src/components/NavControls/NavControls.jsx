import { useNavigate } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';

function NavControls() {
  const navigate = useNavigate();
  return (
    <div>
      <div className='header-controls-pics'>
        <div
          data-id='search-expander'
          className='header-controls-pic header-controls-search'
        ></div>
        <SearchForm />

        {/* Do programmatic navigation on click to /cart.html */}
        <div
          onClick={() => navigate('/cart')}
          className='header-controls-pic header-controls-cart'
        >
          <div className='header-controls-cart-full'>5</div>
          <div className='header-controls-cart-menu'></div>
        </div>
      </div>
    </div>
  );
}

export default NavControls;
