module.exports = function displayName(Component) {
	return Component.name || Component.displayName || 'Component';
};