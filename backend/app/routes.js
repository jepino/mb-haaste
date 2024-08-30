import express from 'express';
import { Contacts, CustomerContacts, Customers } from './models.js';
import { NotFound, NotImplemented } from './errorHandler.js';

const routes = express.Router()

routes.get('/ping', (_req, res) => {
  return res.send({ message: 'pong' })
})

// Customers
routes.get('/api/customers', async (_req, res) => {
  const customers = await Customers.getAll()
  return res.send(customers)
})

routes.get('/api/customers/:customerId', async (req, res) => {
  const { customerId } = req.params
  const customer = await Customers.get(customerId)
  if(!customer) {
    throw new NotFound('Customer Not Found')
  }
  return res.send(customer)
})

routes.post('/api/customers', async (req, res) => {
  const customers = await Customers.add(req.body)
  return res.send(customers)
})

// MB-TODO: Create route for updating customer
routes.put('/api/customers/:customerId', async (req, res) => {
  throw new NotImplemented()
})

// Contacts
routes.get('/api/contacts', async (_req, res) => {
  const contacts = await Contacts.getAll()
  return res.send(contacts)
})

routes.get('/api/contacts/:contactId', async (req, res) => {
  const { contactId } = req.params
  const contact = await Contacts.get(contactId)
  if(!contact) {
    throw new NotFound('Contact not found')
  }
  return res.send(contact)
})

routes.post('/api/contacts', async (req, res) => {
  const contacts = await Contacts.add(req.body)
  return res.send(contacts)
})

/**
 *  MB-TODO: Let's assume application uses relation database (like PostgreSQL). The database has following tables:
 *  - customer (customer_id SERIAL PRIMARY KEY, name TEXT NOT NULL, country TEXT, is_active BOOLEAN)
 *  - contact (contact_id SERIAL PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL)
 *  - customer_contact (customer_id REFERENCES customer, contact_id REFERENCES contact, PRIMARY KEY(customer_id, contact_id))
*/

// MB-TODO: Write a SQL query in comment how to fetch a contacts of customer using provided database pseudo schema
// MB-TODO: Create route for fetching contacts of a customer `/api/customers/:customerId/contacts`
routes.get('/api/customers/:customerId/contacts', async (req, res) => {
  throw new NotImplemented()
})

// MB-TODO: Write a SQL query in comment how to upsert a contacts to a customer using provided database pseudo schema
// MB-TODO: Create route for adding contact to a customer `/api/customers/:customerId/contacts`
routes.post('/api/customers/:customerId/contacts', async (req, res) => {
  throw new NotImplemented()
})

// MB-TODO: Write a SQL query in comment how to delete a contact of customer using provided database pseudo schema
// MB-TODO:s Create route for deleting contact of customer `/api/customers/:customerId/contacts/:contactId`
routes.delete('/api/customers/:customerId/contacts/:contactId', async (req, res) => {
  throw new NotImplemented()
})

export default routes
