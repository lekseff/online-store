import React, { useState } from 'react';
import Input from '../Input/Input';

function OrderForm({ onSend }) {
  // Данные полей формы
  const [formValues, setFormValues] = useState({ phone: '', address: '' });
  // Состояние чекбокса
  const [agreement, setAgreement] = useState(false);

  /**
   * Обработчик полей ввода формы
   * @param {*} event - event
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * ОТправка формы
   * @param {*} event - event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    onSend(formValues); //Отправляем форму
  };

  return (
    <section className='order'>
      <h2 className='text-center'>Оформить заказ</h2>
      <div className='card' style={{ maxWidth: '30rem', margin: '0 auto' }}>
        <form className='card-body' onSubmit={handleSubmit}>
          <div className='form-group'>
            <Input
              label='Телефон'
              id='phone'
              className='form-control'
              placeholder='Ваш телефон'
              value={formValues.phone}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <Input
              label='Адрес доставки'
              id='address'
              className='form-control'
              placeholder='Адрес доставки'
              value={formValues.address}
              onChange={handleChange}
            />
          </div>

          <div className='form-group form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='agreement'
              name='agreement'
              checked={agreement}
              onChange={() => setAgreement((prev) => !prev)}
            />
            <label className='form-check-label' htmlFor='agreement'>
              Согласен с правилами доставки
            </label>
          </div>

          <button
            type='submit'
            className='btn btn-outline-secondary'
            disabled={!agreement}
          >
            Оформить
          </button>
        </form>
      </div>
    </section>
  );
}

export default OrderForm;
