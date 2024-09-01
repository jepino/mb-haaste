import express from 'express';

import { BadRequest, NotFound } from './errorHandler.js';
import { Contacts, CustomerContacts, Customers } from './models.js';

const routes = express.Router();

const HttpStatus = {
  CREATED: 201,
  NO_CONTENT: 204,
};

routes.get('/ping', (_req, res) => {
  return res.send({ message: 'pong' });
});

// Customers
routes.get('/api/customers', async (_req, res) => {
  const customers = await Customers.getAll();
  return res.send(customers);
});

routes.get('/api/customers/:customerId', async (req, res) => {
  const { customerId } = req.params;
  const customer = await Customers.get(customerId);
  if (!customer) {
    throw new NotFound('Customer Not Found');
  }
  return res.send(customer);
});

routes.post('/api/customers', async (req, res) => {
  const customers = await Customers.add(req.body);
  return res.send(customers);
});

// MB-DONE: Create route for updating customer
/** @todo Validate request body */
routes.put('/api/customers/:customerId', async (req, res) => {
  const { customerId } = req.params;
  const { name, country, isActive } = req.body;
  return res.send(
    await Customers.update(customerId, {
      id: customerId,
      name,
      country,
      isActive,
    })
  );
});

// Contacts
routes.get('/api/contacts', async (_req, res) => {
  const contacts = await Contacts.getAll();
  return res.send(contacts);
});

routes.get('/api/contacts/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contacts.get(contactId);
  if (!contact) {
    throw new NotFound('Contact not found');
  }
  return res.send(contact);
});

routes.post('/api/contacts', async (req, res) => {
  const contacts = await Contacts.add(req.body);
  return res.send(contacts);
});

/**
 *  MB-DONE: Let's assume application uses relation database (like PostgreSQL). The database has following tables:
 *  - customer (customer_id SERIAL PRIMARY KEY, name TEXT NOT NULL, country TEXT, is_active BOOLEAN)
 *  - contact (contact_id SERIAL PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL)
 *  - customer_contact (customer_id REFERENCES customer, contact_id REFERENCES contact, PRIMARY KEY(customer_id, contact_id))
 */

/**
 * MB-DONE: Write a SQL query in comment how to fetch a contacts of customer using provided database pseudo schema
 *
 * SELECT contact.contact_id, contact.first_name, contact.last_name
 * FROM contact
 * JOIN customer_contact AS cc
 *   ON contact.contact_id = cc.contact_id
 * WHERE cc.customer_id = <<SANITIZED_CUSTOMER_ID>>;
 */

// MB-DONE: Create route for fetching contacts of a customer `/api/customers/:customerId/contacts`
routes.get('/api/customers/:customerId/contacts', async (req, res) => {
  const { customerId } = req.params;
  return res.send(await CustomerContacts.getAll(customerId));
});

/**
 * MB-DONE: Write a SQL query in comment how to upsert a contacts to a customer using provided database pseudo schema
 *
 * -- Using transaction to prevent creating unlinked contact if second insert fails.
 * -- This might happen for example due to incorrect `customer_id` violating foreign key constraint on `customer_contact`.
 * BEGIN;
 * WITH created_contact_id AS (
 *   -- Assuming autogenerated `contact_id` for new contacts
 *   INSERT INTO contact (first_name, last_name)
 *     VALUES (<<SANITIZED_FIRST_NAME>>, <<SANITIZED_LAST_NAME>>)
 *     -- Assuming UNIQUE(first_name, last_name) constraint on the `contact` table based on the "upsert" instruction in the task specification
 *     ON_CONFLICT (first_name, last_name)
 *     DO UPDATE SET
 *       contact_id = contact.contact_id
 *     -- Using PostgreSQL syntax
 *     RETURNING contact_id
 * )
 * INSERT INTO customer_contact (customer_id, contact_id)
 *   SELECT <<SANITIZED_CUSTOMER_ID>>, contact_id FROM created_contact_id;
 * COMMIT;
 */
// MB-DONE: Create route for adding contact to a customer `/api/customers/:customerId/contacts`
routes.post('/api/customers/:customerId/contacts', async (req, res) => {
  const { customerId } = req.params;
  const { contactId } = req.body;

  if (!contactId) {
    throw new BadRequest(
      `Required field 'contactId' missing from request body`
    );
  }

  return res
    .status(HttpStatus.CREATED)
    .send(await CustomerContacts.add(customerId, contactId));
});

/**
 * MB-DONE: Write a SQL query in comment how to delete a contact of customer using provided database pseudo schema
 *
 * -- Assumptions made before:
 * -- * DB is PostgreSQL
 * -- * `contact` has unique naming constraint (=> m2m relation between `customer` and `contact`)
 *
 * -- Transaction just in case :)
 * BEGIN;
 * -- Delete link from relation table
 * DELETE FROM customer_contact
 * WHERE customer_id = <<SANITIZED_CUSTOMER_ID>> AND contact_id = <<SANITIZED_CONTACT_ID>>;
 *
 * -- Delete contact entry if no foreign key references to it in `customer_contact`
 * DELETE FROM contact
 * WHERE contact_id = <<SANITIZED_CONTACT_ID>>
 *   AND NOT EXISTS (
 *       SELECT 1 FROM customer_contact
 *       WHERE contact_id = <<SANITIZED_CONTACT_ID>>
 *   );
 * COMMIT;
 */
// MB-DONE:s Create route for deleting contact of customer `/api/customers/:customerId/contacts/:contactId`
routes.delete(
  '/api/customers/:customerId/contacts/:contactId',
  async (req, res) => {
    const { customerId, contactId } = req.params;
    await CustomerContacts.delete(customerId, contactId);
    res.sendStatus(HttpStatus.NO_CONTENT);
  }
);

export default routes;
