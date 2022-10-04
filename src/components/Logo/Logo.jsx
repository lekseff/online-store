import { Link } from 'react-router-dom';
import logo from '../../assets/header-logo.png';
import {HOME_PAGE} from '../../constants';

function Logo() {
  return (
    <Link to={`${HOME_PAGE}`} className='navbar-brand'>
      <img src={logo} alt='BosaNoga' />
    </Link>
  );
}

export default Logo;
