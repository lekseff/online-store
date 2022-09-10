import FilterItem from '../FilterItem/FilterItem';

function Filter(props) {
  const {items, active} = props;

  if (items.length <= 1) return null;
  
  return(
    <ul className="catalog-categories nav justify-content-center">
      {items.map(item => (
        <FilterItem
          item={item}
          active={active}
          key={item.id}
          onFilter={props.onFilter}
        />))}
  </ul>
  )
}

export default Filter;
