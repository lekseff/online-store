/**
 * Получает данные по API
 * @param {*} url - параметры запроса
 * @param {*} method - метод
 * @param {*} options - дополнительные опции
 * @returns - ответ от сервера
 */
export const createRequest = async (url, method = 'GET', options = {}) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
    method,
    ...options,
  });
  if (!response.ok) {
      throw new Error('Ошибка загрузки данных');
    }
  return response;
}






