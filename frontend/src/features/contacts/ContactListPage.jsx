import { useEffect, useMemo } from 'react';
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
  const contactsLoading = useMemo(() => status === 'pending', [status]);
  return { data, loading: contactsLoading, error, refetch };
};

const ContactListPage = () => {
  const { data: contacts, loading, error, refetch } = useContacts();
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
      <div>{loading ? 'Loading...' : <ContactTable contacts={contacts} />}</div>
    </div>
  );
};

export default ContactListPage;
