const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const eventRouter = require('./eventRouter');
const clientRouter = require('./clientRouter');
const serverRouter = require('./serverRouter');

router.use('/user', userRouter);
router.use('/clients', clientRouter);
router.use('/events', eventRouter);
router.use('/ping', serverRouter);

module.exports = router;
