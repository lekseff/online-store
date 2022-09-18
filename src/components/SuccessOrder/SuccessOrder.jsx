import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/shipping_success.svg';
import styles from './SuccessOrder.module.css';

function SuccessOrder() {
  return (
    <div className={styles.success}>
        <div className={styles.image}>
          <img className={styles.pic} src={logo} alt='Success' />
        </div>
        <h3 className={styles.title}>Заказ оформлен</h3>
        <p className={styles.info}>
          Ваш заказ успешно оформлен. В ближайшее время по указанному телефону с
          Вами свяжется наш менеджер
        </p>
        <Link to='/catalog' className={styles.button}>
          Продолжить покупки
        </Link>
    </div>
  );
}

export default SuccessOrder;
