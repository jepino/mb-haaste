import { useSelector } from 'react-redux';
import { selectContactIds, selectContactsError, selectContactsLoading } from './contactsSlice';
import ContactRow from './ContactRow';

const ContactTable = () => {
  const contactIds = useSelector(selectContactIds);
  const loading = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);

  if (loading) {
    return 'Loading...';
  } else if (error) {
    return (
      <div className='alert alert-danger d-inline-block' role='alert'>
        {error.message}
      </div>
    );
  }

  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Name</th>
        </tr>
      </thead>
      <tbody>
        {contactIds.map((id, index) => (
          <ContactRow key={id} id={id} index={index} />
        ))}
      </tbody>
    </table>
  );
};

export default ContactTable;
