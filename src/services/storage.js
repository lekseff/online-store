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
    this.clearStorage(key);
    localStorage.setItem(key, JSON.stringify(value));
  },
  clearStorage(key) {
    localStorage.removeItem(key);
  }
};

export default storage;
