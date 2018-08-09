export default (name, suffix) => {
  const split = name.split('.');
  return (
    split.slice(0, split.length - 1).join('.') +
    suffix +
    '.' +
    split[split.length - 1]
  );
};
