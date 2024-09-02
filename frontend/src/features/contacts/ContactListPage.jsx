import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './contactsSlice';
import ContactTable from './ContactTable';

const useContacts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const refetch = () => dispatch(fetchContacts());
  const { data, status, error } = useSelector(state => state.contacts);
  return { data, status, error, refetch };
};

const ContactListPage = () => {
  const { data: contacts, status, error, refetch } = useContacts();
  return (
    <div className='m-5'>
      <h1 className='fw-bold'>Contacts</h1>
      <button className='btn btn-success' onClick={refetch}>
        <i className='bi bi-arrow-clockwise' /> Refresh
      </button>
      {error ? (
        <div className='alert alert-danger d-inline-block' role='alert'>
          {error.message}
        </div>
      ) : null}
      <div>{status === 'pending' ? 'Loading...' : <ContactTable contacts={contacts} />}</div>
    </div>
  );
};

export default ContactListPage;
