import {Link} from 'react-router-dom';
import logo from '../../assets/header-logo.png';

function Logo() {
  return (
    <Link to='/' className='navbar-brand'>
      <img src={logo} alt='Bosa Noga' />
  </Link>
  )
}

export default Logo;
