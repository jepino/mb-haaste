import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCustomers } from './customersSlice';
import CustomerTable from './CustomerTable';
import NewCustomer from './NewCustomer';

const useFetchCustomers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);
  const refetch = () => dispatch(fetchCustomers());
  return { refetch };
};

const CustomerListPage = () => {
  const { refetch } = useFetchCustomers();

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
        <CustomerTable />
      </div>
    </div>
  );
};

export default CustomerListPage;
