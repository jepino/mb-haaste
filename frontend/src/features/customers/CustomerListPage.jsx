import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from './customersSlice';
import CustomerTable from './CustomerTable';
import NewCustomer from './NewCustomer';

const useCustomers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);
  const refetch = () => dispatch(fetchCustomers());
  const { data, status, error } = useSelector(state => state.customers);
  return { data, status, error, refetch };
};

const CustomerListPage = () => {
  const { data: customers, status, error, refetch } = useCustomers();
  return (
    <div className='m-5'>
      <h1 className='fw-bold'>Customers</h1>
      <div className='d-flex justify-content-between'>
        <button className='btn btn-success' onClick={refetch}>
          <i className='bi bi-arrow-clockwise' /> Refresh
        </button>
        <NewCustomer />
      </div>
      <div>
        {error ? (
          <div className='alert alert-danger d-block mt-3' role='alert'>
            {error.message}
          </div>
        ) : null}
        {status === 'pending' ? 'Loading...' : <CustomerTable customers={customers} />}
      </div>
    </div>
  );
};

export default CustomerListPage;
