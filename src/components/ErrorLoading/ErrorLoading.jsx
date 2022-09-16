import images from '../../assets/error-loading.svg';
import styles from './style.module.css';
import React from 'react';
import PropTypes from 'prop-types';

function ErrorLoading({ message }) {
  return (
    <div className={styles.error}>
      <div className={styles.image}>
        <img className={styles.pic} src={images} alt='Error' />
      </div>
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default ErrorLoading;

ErrorLoading.propTypes = {
  message: PropTypes.string,
};

ErrorLoading.defaultProps = {
  message: 'Ошибка загрузки. Попробуйте обновить страницу',
};
