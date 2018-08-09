import moment from 'moment';
export default (date, format, locale) =>
  moment(date)
    .locale(locale)
    .format(format);
