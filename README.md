# react-render-prop
Simple package for creating react render prop components


## usage
```js
import createProvider from 'react-render-prop';

const NameProvider = createProvider(props => ({ fullName: props.name + " Doe" }));

const Content = () => <div>
  <NameProvider name="John" render={({fullName}) => <span>Hello {fullName}</span>} />
</div>
```