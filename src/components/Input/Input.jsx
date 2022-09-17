import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
  const handleChange = (event) => {
    props.onChange(event);
  };

  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        className={props.className}
        type={props.type}
        id={props.id}
        name={props.id}
        placeholder={props.placeholder}
        required
        value={props.value}
        onChange={handleChange}
      />
    </>
  );
}

export default Input;

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  type: 'text',
  className: '',
  placeholder: '',
  value: '',
};
