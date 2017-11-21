export const createRenderer = (fnc, { propName = 'render' } = {}) => {

  if (typeof fnc !== 'function') {
    throw new Error('Renderer #1 argument must be a function');
  }

  if (typeof propName !== 'string') {
    throw new Error('propName option must be a string');
  }

  return function Renderer(props) {
    return props[propName](fnc(props));
  }
};

export default createRenderer;