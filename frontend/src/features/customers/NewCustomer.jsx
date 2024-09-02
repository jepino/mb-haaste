import { useDispatch } from 'react-redux';
import { createCustomer } from './customersSlice';

const NewCustomer = () => {
  const dispatch = useDispatch();

  const createNewDummyCustomer = () => {
    dispatch(createCustomer({ name: 'Dummy', country: 'Finland', isActive: false }));
  };

  return (
    <button className='btn btn-outline-primary' onClick={createNewDummyCustomer}>
      <i className='bi bi-plus' /> Add new dummy customer
    </button>
  );
};

NewCustomer.propTypes = {};

export default NewCustomer;
