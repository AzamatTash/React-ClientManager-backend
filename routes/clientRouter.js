const Router = require('express');
const router = new Router();
const clientController = require('../controllers/clientController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, clientController.create);
router.get('/', authMiddleware, clientController.getAll);
router.get('/:id', authMiddleware, clientController.getOne);
router.delete('/:id', authMiddleware, clientController.remove);
router.put('/:id', authMiddleware, clientController.update);

module.exports = router;
