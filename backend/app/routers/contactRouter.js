import express from 'express';

import { NotFound } from '../errorHandler.js';
import { Contacts } from '../models.js';

const contactRouter = express.Router();

// Contacts
contactRouter.get('/', async (_req, res) => {
  const contacts = await Contacts.getAll();
  return res.send(contacts);
});

contactRouter.get('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contacts.get(contactId);
  if (!contact) {
    throw new NotFound('Contact not found');
  }
  return res.send(contact);
});

contactRouter.post('/', async (req, res) => {
  const contacts = await Contacts.add(req.body);
  return res.send(contacts);
});

export default contactRouter;
