import createRenderer from "./index";

describe('createRenderer', () => {
  it('Should be a function', () => {
    expect(typeof createRenderer).toBe('function');
  });

  it('Should throw an error when no function is provided', () => {
    expect(() => createRenderer('')).toThrow(/function/);
  });

  it('Should throw an error when second argument is null', () => {
    expect(() => createRenderer('', null)).toThrow();
  });

  it('Should throw an error when second arguments property `propName` is not the type of string', () => {
    expect(() => createRenderer(() => { }, { propName: 'test' })).not.toThrow();
    expect(() => createRenderer(() => { }, { propName: null })).toThrow(/string/);
    expect(() => createRenderer(() => { }, { propName: 1 })).toThrow(/string/);
    expect(() => createRenderer(() => { }, { propName: true })).toThrow(/string/);
  });

  it('Should have a default property for option `propName`', () => {
    expect(() => createRenderer(() => { }, { propName: undefined })).not.toThrow();
  });

  it('Should return a function', () => {
    expect(typeof createRenderer(() => { })).toBe('function');
  });

  it('Should pass the params to the renderer function', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    fn1.mockReturnValueOnce(456);
    fn2.mockReturnValueOnce(123);

    const params = { test: true, render: fn2 };

    const Renderer = createRenderer(fn1);

    // <Renderer render={fn2} test={true} />
    const result = Renderer(params);

    expect(fn1).toBeCalledWith(params);

    expect(fn2).toBeCalledWith(456);
  });

  it('Should call the function from render property with renderer result', () => {
    const result = {};
    const Renderer = createRenderer(() => result);
    const fn = jest.fn();
    Renderer({ test: true, render: fn });
    expect(fn).toBeCalledWith(result);
  });

  it('Should return the renderer func value', () => {
    const expectedResult = {};
    const params = { test: true, render: () => expectedResult };

    const Renderer = createRenderer(() => 1);

    const finalResult = Renderer(params);

    expect(finalResult).toBe(expectedResult);
  });

  it('Should allow using custom render property', () => {
    const fn = jest.fn();
    const params = { test: true, children: fn };

    const Renderer = createRenderer(() => 1, { propName: 'children' });

    Renderer(params);

    expect(fn).toBeCalled();
  });

  it('Should throw an error if the renderProperty is not a function', () => {
    const Renderer = createRenderer(() => 1, { propName: 'children' });

    expect(() => Renderer({ children: true })).toThrow(/function/);
    expect(() => Renderer({ children: 1 })).toThrow(/function/);
    expect(() => Renderer({ children: undefined })).toThrow(/function/);
    expect(() => Renderer({ children: "" })).toThrow(/function/);
    expect(() => Renderer({ children: () => { } })).not.toThrow();
  });
});