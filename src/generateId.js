// doesn't need to be a good id, just an id
module.exports = function generateId() {
	return Math.round(Math.random() * 100000000000);
};
