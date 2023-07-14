const Router = require('express');
const router = new Router();

router.get('/', (req, res) => {
	return res.json({ message: 'server is running', isLoading: false });
});

module.exports = router;
