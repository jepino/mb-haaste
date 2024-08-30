import { useEffect } from 'react'
import CustomerTable from './CustomerTable'
import ContactTable from './ContactTable'
import CustomerContactTable from './CustomerContactTable'
import { useParams } from 'react-router-dom'
import MBTodo from './MBTodo'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomerById, fetchCustomers } from './customerSlices'
import { fetchContacts } from './contactSlices'
import NewCustomer from './NewCustomer'

const useCustomers = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCustomers())
  }, [dispatch])
  const refetch = () => dispatch(fetchCustomers())
  const { data, status, error } = useSelector(state => state.customers)
  return { data, status, error, refetch }
}

const useCustomer = (id) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if(id) {
      dispatch(fetchCustomerById(id))
    }
  }, [id, dispatch])
  const { data: customers, status, error } = useSelector(state => state.customers)
  const customer = customers.find(customer => customer.id === id)
  return { data: customer, status, error }
}

const useContacts = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])
  const refetch = () => dispatch(fetchContacts())
  const { data, status, error } = useSelector(state => state.contacts)
  return { data, status, error, refetch }
}

export const Customers = () => {
  const { data: customers, status, error, refetch } = useCustomers()
  return (
    <div className='m-5'>
      <h1 className='fw-bold'>Customers</h1>
      <div className='d-flex justify-content-between'>
        <button className='btn btn-success' onClick={refetch}>
          <i className="bi bi-arrow-clockwise" />
          {' '}
          Refresh
        </button>
        <NewCustomer />
      </div>
      <div>
        {error
          ? <div className="alert alert-danger d-inline-block" role="alert">{error.message}</div>
          : null
        }
        {status === 'pending'
          ? 'Loading...'
          : <CustomerTable customers={customers} />
        }
      </div>
    </div>
  )
}

export const Customer = () => {
  const { customerId } = useParams()
  const { data: customer } = useCustomer(customerId)
  return (
    <div className='m-5'>
      <h1 className='fw-bold'>Customer</h1>
      {customer
        ? <div>
          <form className='mb-5' onSubmit={event => {
            // MB-TODO: Handle customer update
            event.preventDefault()
          }}>
            <MBTodo
              isCompleted={false}
              task='Create solution to update customers `isActivity` field. NOTE: update api `/api/customer/:customerId` expects complete customer data to be sent along request body' />
            <div className='d-flex flex-row gap-4 mb-3'>
              <div>
                <label htmlFor="name" className="form-label">Name</label>
                <input className="form-control" id="name" value={customer.name || ''} readOnly />
              </div>
              <div>
                <label htmlFor="name" className="form-label">Country</label>
                <input className="form-control" id="country" value={customer.country || ''} readOnly />
              </div>
              <div>
                <label htmlFor="isActive" className="form-label">Activity</label>
                <input className="form-control" id="isActive" value={customer.isActive ? 'Active' : 'Inactive'} />
              </div>
            </div>
            <button className='btn btn-primary' type='submit'>Save</button>
          </form>
          <div>
            <p className='fw-bold'>Customer contacts</p>
            <MBTodo
              isCompleted={false}
              task='Continue CustomerContact table implementation' />
            <CustomerContactTable customerId={customerId} />
          </div>
        </div>
        : null
      }
    </div>
  )
}

export const Contacts = () => {
  const { data: contacts, status, error, refetch } = useContacts()
  return (
    <div className='m-5'>
      <h1 className='fw-bold'>Contacts</h1>
      <button className='btn btn-success' onClick={refetch}>
        <i className="bi bi-arrow-clockwise" />
        {' '}
        Refresh
      </button>
      {error
        ? <div className="alert alert-danger d-inline-block" role="alert">{error.message}</div>
        : null
      }
      <div>
        {status === 'pending'
          ? 'Loading...'
          : <ContactTable contacts={contacts} />
        }
      </div>
    </div>
  )
}