const React = require('react');
const displayName = require('./displayName');
const generateId = require('./generateId');

module.exports = function signalBranch(Component) {
	const name = displayName(Component);

	const ComposedComponent = class extends React.Component {
		constructor(props, context) {
			super(props, context);

			this.onOn = this.onOn.bind(this);
			this.onTrigger = this.onTrigger.bind(this);

			this.signal = context.signal;
			this.id = generateId();
			this.subscriptions = [];
		}

		componentWillUnmount() {
			this.subscriptions.forEach(event => {
				this.signal.off(event);
			});
		}

		onOn(name, fn) {
			const event = `${name}.${this.id}`;
			this.signal.on(event, fn);
			this.subscriptions.push(event);
		}

		onTrigger(name, obj) {
			this.signal.trigger(name, obj);
		}

		render() {
			return (
				<Component
					{...this.props}
					on={ this.onOn }
					trigger={ this.onTrigger }
				/>
			);
		}
	};

	ComposedComponent.displayName = `SignalBranched${name}`;
	ComposedComponent.contextTypes = Object.assign(Component.contextTypes || {}, {
		signal(props, propName) {
			if (propName in props) return;
			return new Error('missing signal: branch');
		}
	});

	return ComposedComponent;
};
