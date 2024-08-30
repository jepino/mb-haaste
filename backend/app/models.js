/**
 * Simple ORM using regular json file as "database".
 */
import { JsonDB, Config } from 'node-json-db'

const db = new JsonDB(new Config('database', true, true, '.'))

const getId = () => `id-${+(new Date()).getTime()}`

const createModel = key => ({
  getAll: async () => {
    const items = await db.getObjectDefault(`.${key}`, {})
    return Object.values(items)
  },
  get: async (id) => db.getObject(`.${key}.${id}`),
  add: async (data) => {
    const id = getId()
    const newItem = { ...data, id }
    await db.push(`.${key}`, { [id]: newItem }, false)
    return newItem
  },
  update: async (id, data) => {
    await db.push(`.${key}`, {
      [id]: data
    }, false)
    return data
  },
  delete: async (id) => db.delete(`.${key}.${id}`)
})

const createOneToManyModel = (key, modifier) => ({
  getAll: async (parentId) => {
    const items = await db.getObjectDefault(`.${key}.${parentId}`, [])
    return items.map(modifier)
  },
  add: async (parentId, subId) => {
    const newItem = { parentId, subId }
    await db.push(`.${key}.${parentId}[]`, newItem)
    return modifier(newItem)
  },
  delete: async (parentId, subId) => {
    const items = await db.getObjectDefault(`.${key}.${parentId}`, [])
    const filtered = items.filter(items => items.subId !== subId)
    await db.push(`.${key}.${parentId}`, filtered, true)
    return
  },
  deleteAll: async (parentId) => db.delete(`.${key}.${parentId}`),
})


export const Customers = createModel('customers')
export const Contacts = createModel('contacts')
export const CustomerContacts = createOneToManyModel('customerContacts', ({ parentId, subId }) => ({ customerId: parentId, contactId: subId }))