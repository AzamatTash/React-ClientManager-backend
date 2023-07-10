const Router = require('express');
const router = new Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, eventController.create);
router.get('/', authMiddleware, eventController.getAll);
router.get('/:id', authMiddleware, eventController.getOne);
router.delete('/:id', authMiddleware, eventController.remove);
router.put('/:id', authMiddleware, eventController.update);

module.exports = router;
