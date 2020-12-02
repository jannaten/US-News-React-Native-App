export const getTime = (el) => {
  const hourSet = el.publishedAt.split('T')[1].split(':');
  const setAMPM = Number(hourSet[0]) >= 12 ? 'PM' : 'AM';
  const hour = hourSet[0] + '.' + hourSet[1] + '.' + setAMPM;
  const yearSet = el.publishedAt.split('T')[0].split('-');
  const year = yearSet[2] + '-' + yearSet[1] + '-' + yearSet[0];
  return hour + ' ' + year;
};
