# react-render-prop
Simple package for creating react render prop components


## usage
```js
import createReproc from 'react-render-prop';

const NameProvider = createReproc(props => ({fullName: props.name + " Doe"}));

const Content = () => <div>
  <NameProvider name="John" render={({fullName}) => <span>Hello {fullName}</span>} />
</div>
```