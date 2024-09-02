import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MBTodo from '../../components/MBTodo';
import { fetchCustomerById } from './customersSlice';
import CustomerContactTable from './customerContacts/CustomerContactTable';

const useCustomer = id => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchCustomerById(id));
    }
  }, [id, dispatch]);
  const { data: customers, status, error } = useSelector(state => state.customers);
  const customer = customers.find(customer => customer.id === id);
  return { data: customer, status, error };
};

const CustomerPage = () => {
  const { customerId } = useParams();
  const { data: customer } = useCustomer(customerId);
  return (
    <div className='m-5'>
      <h1 className='fw-bold'>Customer</h1>
      {customer ? (
        <div>
          <form
            className='mb-5'
            onSubmit={event => {
              // MB-TODO: Handle customer update
              event.preventDefault();
            }}
          >
            <MBTodo
              isCompleted={false}
              task='Create solution to update customers `isActivity` field. NOTE: update api `/api/customer/:customerId` expects complete customer data to be sent along request body'
            />
            <div className='d-flex flex-row gap-4 mb-3'>
              <div>
                <label htmlFor='name' className='form-label'>
                  Name
                </label>
                <input className='form-control' id='name' value={customer.name || ''} readOnly />
              </div>
              <div>
                <label htmlFor='name' className='form-label'>
                  Country
                </label>
                <input className='form-control' id='country' value={customer.country || ''} readOnly />
              </div>
              <div>
                <label htmlFor='isActive' className='form-label'>
                  Activity
                </label>
                <input className='form-control' id='isActive' value={customer.isActive ? 'Active' : 'Inactive'} />
              </div>
            </div>
            <button className='btn btn-primary' type='submit'>
              Save
            </button>
          </form>
          <div>
            <p className='fw-bold'>Customer contacts</p>
            <MBTodo isCompleted={false} task='Continue CustomerContact table implementation' />
            <CustomerContactTable customerId={customerId} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CustomerPage;
