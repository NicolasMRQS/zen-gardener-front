/* eslint-disable import/prefer-default-export */
import moment from 'moment';

/**
 * @param {number} monthNumber Zero based number of the month (0-11)
 * @param {string} locale Optional locale code ('fr' or 'en'...)
 * See docs : https://momentjs.com/docs/#/displaying/format/
 */
export const getMonthName = (monthNumber, locale = 'fr') => moment().locale(locale).month(monthNumber).format('MMMM');

/**
 * @param {Date} date Date to format
 * @returns {string} Date formatted as "YYYY-MM-DD"
 */
export const toDateInputFormat = (date) => date.toISOString().split('T')[0];
// export const toDateInputFormat = (date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;

/**
 * @param {number} monthNumber One based number of the month (1-12)
 * @param {Date} fromDate Date from which the next month date is calculated
 */
export const getDateByMonthNumber = (monthNumber, fromDate = new Date(), setLastDay) => {
  const date = new Date();
  if (setLastDay) {
    date.setDate(31);
  }
  else {
    date.setDate(1);
  }
  date.setMonth(monthNumber);
  if (date < fromDate) {
    date.setFullYear(date.getFullYear() + 1);
  }
  return date;
};

export const dateInputFormat = (date) => moment(date).format('yyyy-MM-DD');
