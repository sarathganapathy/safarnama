import i18n from '../../i18n/i18n';

/**
 * @desc generator function to crete a unique number
 * @return {Object} this function generator object containing next function.
 */
function* uniqueNumberGenerator() {
  let i = 0;
  while (true) {
    // eslint-disable-next-line no-plusplus
    yield ++i;
  }
}

/**
 * @constant
 * @type {Object} Object containing next function.
 */
const uniqueKey = uniqueNumberGenerator();

/**
 * @desc  function to returns unique key by calling generator
 * @return {String} this function returns unique key string
 */

export const getUniqueKey = () => (`unique${uniqueKey.next().value}`); // eslint-disable-line import/prefer-default-export

/**
 * @desc  function returns formated date string from ISO Date string
 * @param {String} dateString - ISO Date String
 * @return {String} this function returns formated date
 */
export const getFormatedDateFromISOString = (dateString) => {
  const d = new Date(dateString);
  const day = `${d.getDate()}`.length > 1 ? d.getDate() : `0${d.getDate()}`;
  const month = i18n.MONTHS[d.getMonth()];
  const year = d.getFullYear();
  const hour = `${d.getHours()}`.length > 1 ? d.getHours() : `0${d.getHours()}`;
  const minute = `${d.getMinutes()}`.length > 1 ? d.getMinutes() : `0${d.getMinutes()}`;
  return `${day}-${month}-${year} ${hour}:${minute}`;
};
