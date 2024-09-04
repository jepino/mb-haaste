import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from './contactsSlice';
import ContactTable from './ContactTable';

const useFetchContacts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const refetch = () => dispatch(fetchContacts());
  return { refetch };
};

const ContactListPage = () => {
  const { refetch } = useFetchContacts();
  return (
    <div className='m-5'>
      <h1 className='fw-bold'>Contacts</h1>
      <button className='btn btn-success' onClick={refetch}>
        <i className='bi bi-arrow-clockwise' /> Refresh
      </button>
      <div>
        <ContactTable />
      </div>
    </div>
  );
};

export default ContactListPage;
