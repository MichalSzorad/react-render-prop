export const create = (fnc, { propName = 'render' } = {}) => {

  if (typeof fnc !== 'function') {
    throw new Error('Create render prop component #1 argument must be a function');
  }

  if (typeof propName !== 'string') {
    throw new Error('propName option must be a string');
  }

  return function Reproc(props) {
    return props[propName](fnc(props));
  }
};

export default create;