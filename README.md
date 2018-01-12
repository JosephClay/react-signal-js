# react-signal-js

React integration for [signal-js](https://github.com/JosephClay/signal-js)

## How to Use

### Rooting our top-level component

*main.jsx*

```js
import React, { Component } from 'react';
import { render } from 'react-dom';
import { root } from 'react-signal-js';
import signal from 'signal-js';

// We will write this component later
import Button from './Button.jsx';

// This instance's events
const pubsub = signal();

// a sample action
pubsub.on('toggle', name => {
	console.log(`toggling: ${name}`);
});

// Creating our top-level component
class App extends Component {
  render() {
    return <Button />;
  }
}

// Let's bind the component to the tree through the `root` higher-order component
const RootedApp = root(pubsub, App);

// Rendering the app
render(<RootedApp />, document.querySelector('#mount'));
```

### Branching our button

*button.jsx*

```js
import React, { Component } from 'react';
import { branch } from 'react-signal-js';

class Button extends Component {
  constructor() {
  	super();

	this.name = 'i am the button';
  	this.onClick = this.onClick.bind(this);
  }

  onClick() {
	// Thanks to the branch, `on` and `trigger` are passed to the component
	this.props.trigger('toggle', this.name);
  }

  render() {
    return (
    	<button onClick={ this.onClick }>
    		{ this.name }
    	</button>
	);
  }
}

// Branching the component gives access to signal
export default branch(Button);
```

## Support

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/JosephClay/react-signal-js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
