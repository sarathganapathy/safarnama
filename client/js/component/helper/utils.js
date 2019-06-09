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
