/**
 * Управляет LocalStorage
 */

const storage = {
  getStorage(key = 'basket') {
    const data = localStorage.getItem(key);
    if (!data) return null;

    let json = null;
    try {
      json = JSON.parse(data);
    } catch (err) {
      console.warn(err);
      localStorage.removeItem(key);
    }
    return json;
  },
  setStorage(key, value) {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(value));
  },
};

export default storage;
