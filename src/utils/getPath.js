import {HOME_PAGE} from '../constants';

/**
 * Создает путь для github pages
 * @param {String} path - пусть к странице ('/home')
 * @returns - string
 */
function getPath (path) {
  return path ? HOME_PAGE + path : HOME_PAGE;
}

export default getPath;
