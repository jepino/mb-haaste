import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MBTodo from '../../components/MBTodo';
import { fetchCustomerById, selectCustomerById, selectCustomerError, selectCustomerLoading, updateCustomer } from './customersSlice';
import CustomerContactTable from './CustomerContactTable';

const useCustomer = id => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchCustomerById(id));
    }
  }, [id, dispatch]);

  const update = (name, country, isActive) => dispatch(updateCustomer({ id, name, country, isActive }));

  const customer = useSelector(state => selectCustomerById(state, id));
  const loading = useSelector(selectCustomerLoading);
  const error = useSelector(selectCustomerError);

  return { customer, loading, error, update };
};

const FormIdentifiers = Object.freeze({
  NAME: 'nameInput',
  COUNTRY: 'countryInput',
  ACTIVITY: 'activityInput',
});

const SelectValues = Object.freeze({
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
});

const CustomerPage = () => {
  const { customerId } = useParams();
  const { customer, loading, error, update } = useCustomer(customerId);

  const handleSubmit = event => {
    // MB-DONE: Handle customer update
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get(FormIdentifiers.NAME);
    const country = formData.get(FormIdentifiers.COUNTRY);
    const isActive = formData.get(FormIdentifiers.ACTIVITY) === SelectValues.ACTIVE;

    update(name, country, isActive);
  };

  return (
    <div className='m-5'>
      <h1 className='fw-bold'>Customer</h1>
      {customer ? (
        <div>
          <form className='mb-3' onSubmit={handleSubmit}>
            <MBTodo
              isCompleted={true}
              task='Create solution to update customers `isActivity` field. NOTE: update api `/api/customer/:customerId` expects complete customer data to be sent along request body'
            />
            <div className='d-flex flex-row gap-4 mb-3'>
              <div className='form-group'>
                <label htmlFor={FormIdentifiers.NAME} className='form-label'>
                  Name
                </label>
                <input
                  className='form-control disabled'
                  id={FormIdentifiers.NAME}
                  name={FormIdentifiers.NAME}
                  value={customer.name || ''}
                  readOnly
                />
              </div>
              <div className='form-group'>
                <label htmlFor={FormIdentifiers.COUNTRY} className='form-label'>
                  Country
                </label>
                <input
                  className='form-control'
                  id={FormIdentifiers.COUNTRY}
                  name={FormIdentifiers.COUNTRY}
                  value={customer.country || ''}
                  readOnly
                />
              </div>
              <div className='form-group'>
                <label htmlFor={FormIdentifiers.ACTIVITY} className='form-label'>
                  Activity
                </label>
                <select
                  className='form-select'
                  name={FormIdentifiers.ACTIVITY}
                  id={FormIdentifiers.ACTIVITY}
                  defaultValue={customer.isActive ? SelectValues.ACTIVE : SelectValues.INACTIVE}
                  disabled={loading}
                >
                  <option value={SelectValues.ACTIVE}>{SelectValues.ACTIVE}</option>
                  <option value={SelectValues.INACTIVE}>{SelectValues.INACTIVE}</option>
                </select>
              </div>
            </div>
            <button className='btn btn-primary' type='submit' disabled={loading}>
              Save
            </button>
          </form>

          <div className={`alert alert-danger d-block ${error ? 'visible' : 'invisible'}`} role='alert'>
            {error ? error.message : null}
          </div>

          <div>
            <p className='fw-bold'>Customer contacts</p>
            <MBTodo isCompleted={true} task='Continue CustomerContact table implementation' />
            <CustomerContactTable customerId={customerId} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CustomerPage;
