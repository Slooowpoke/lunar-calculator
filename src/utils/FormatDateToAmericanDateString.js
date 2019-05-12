export default date => {
  // Month needs re-assigning as Javascript dates start from 0.
  const month = date.getMonth() + 1;
  return `${month}/${date.getDate()}/${date.getFullYear()}`;
};
