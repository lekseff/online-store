import { Link } from 'react-router-dom';

function FilterItem(props) {

  const {item, active} = props;
  
  const handleClick = (e, id) => {
    e.preventDefault();
    props.onFilter(id)
  }

  return (
    <li className="nav-item">
      <Link
        to=''
        className={`nav-link ${active === item.id ? 'active' : ''}`}
        onClick={(e) => handleClick(e, item.id)}
      >
        {item.title}
      </Link>
    </li>
  )
}

export default FilterItem;
