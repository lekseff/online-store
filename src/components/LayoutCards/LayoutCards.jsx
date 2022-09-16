import PropTypes from 'prop-types';

function LayoutCards({className, title, children}) {
  return (
    <section className={className}>
      <h2 className='text-center'>{title}</h2>
      {children}
    </section>
  );
}

export default LayoutCards;

LayoutCards.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
}
