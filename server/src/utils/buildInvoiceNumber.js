module.exports = () => {
	const now = new Date();
	const year = now.getUTCFullYear();
	const random = Math.floor(100000 + Math.random() * 900000);

	return `INV-${year}-${random}`;
};
