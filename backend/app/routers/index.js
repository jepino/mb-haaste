import express from 'express';

import contactRouter from './contactRouter.js';
import customerRouter from './customerRouter.js';

export const HttpStatus = {
  CREATED: 201,
  NO_CONTENT: 204,
};

const router = express.Router();

router.get('/ping', (_req, res) => {
  return res.send({ message: 'pong' });
});

router.use('/api/customers', customerRouter);
router.use('/api/contacts', contactRouter);

export default router;
