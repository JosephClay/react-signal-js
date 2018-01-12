const React = require('react');
const displayName = require('./displayName');

module.exports = function signalRoot(signal, Component) {
	const name = displayName(Component);

	const ComposedComponent = class extends React.Component {
		getChildContext() {
			return { signal };
		}

		render() {
			return React.createElement(Component, this.props);;
		}
	};

	ComposedComponent.displayName = `SignalRooted${name}`;
	ComposedComponent.childContextTypes = Object.assign(Component.childContextTypes || {}, {
		signal(props, propName) {
			if (propName in props) return;
			return new Error('missing signal: root');
		}
	});

	return ComposedComponent;
};