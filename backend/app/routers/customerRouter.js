import express from 'express';

import { NotFound } from '../errorHandler.js';
import { Customers } from '../models.js';
import customerContactRouter from './customerContactRouter.js';

const customerRouter = express.Router();

customerRouter.get('/', async (_req, res) => {
  const customers = await Customers.getAll();
  return res.send(customers);
});

customerRouter.get('/:customerId', async (req, res) => {
  const { customerId } = req.params;
  const customer = await Customers.get(customerId);
  if (!customer) {
    throw new NotFound('Customer Not Found');
  }
  return res.send(customer);
});

customerRouter.post('/', async (req, res) => {
  const customers = await Customers.add(req.body);
  return res.send(customers);
});

// MB-DONE: Create route for updating customer
customerRouter.put('/:customerId', async (req, res) => {
  const { customerId } = req.params;
  const { name, country, isActive } = req.body;
  return res.send(
    await Customers.update(customerId, {
      name,
      country,
      isActive,
    })
  );
});

customerRouter.use('/:customerId/contacts', customerContactRouter);

export default customerRouter;
