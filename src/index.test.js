import createReproc from "./index";

describe('createReproc', () => {
  it('Should be a function', () => {
    expect(typeof createReproc).toBe('function');
  });

  it('Should throw an error when no function is provided', () => {
    expect(() => createReproc('')).toThrow(/function/);
  });

  it('Should throw an error when second argument is null', () => {
    expect(() => createReproc('', null)).toThrow();
  });

  it('Should throw an error when second arguments property `propName` is not the type of string', () => {
    expect(() => createReproc(() => { }, { propName: 'test' })).not.toThrow();
    expect(() => createReproc(() => { }, { propName: null })).toThrow(/string/);
    expect(() => createReproc(() => { }, { propName: 1 })).toThrow(/string/);
    expect(() => createReproc(() => { }, { propName: true })).toThrow(/string/);
  });

  it('Should have a default property for option `propName`', () => {
    expect(() => createReproc(() => { }, { propName: undefined })).not.toThrow();
  });

  it('Should return a function', () => {
    expect(typeof createReproc(() => { })).toBe('function');
  });

  it('Should pass the params to the renderer function', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    fn1.mockReturnValueOnce(456);
    fn2.mockReturnValueOnce(123);

    const params = { test: true, render: fn2 };

    const Renderer = createReproc(fn1);

    // <Renderer render={fn2} test={true} />
    const result = Renderer(params);

    expect(fn1).toBeCalledWith(params);

    expect(fn2).toBeCalledWith(456);
  });

  it('Should call the function from render property with renderer result', () => {
    const result = {};
    const Renderer = createReproc(() => result);
    const fn = jest.fn();
    Renderer({ test: true, render: fn });
    expect(fn).toBeCalledWith(result);
  });

  it('Should return the renderer func value', () => {
    const expectedResult = {};
    const params = { test: true, render: () => expectedResult };

    const Renderer = createReproc(() => 1);

    const finalResult = Renderer(params);

    expect(finalResult).toBe(expectedResult);
  });

  it('Should allow using custom render property', () => {
    const fn = jest.fn();
    const params = { test: true, children: fn };

    const Renderer = createReproc(() => 1, { propName: 'children' });

    Renderer(params);

    expect(fn).toBeCalled();
  });

  it('Should throw an error if the renderProperty is not a function', () => {
    const Renderer = createReproc(() => 1, { propName: 'children' });

    expect(() => Renderer({ children: true })).toThrow(/function/);
    expect(() => Renderer({ children: 1 })).toThrow(/function/);
    expect(() => Renderer({ children: undefined })).toThrow(/function/);
    expect(() => Renderer({ children: "" })).toThrow(/function/);
    expect(() => Renderer({ children: () => { } })).not.toThrow();
  });
});