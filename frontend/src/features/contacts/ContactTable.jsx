import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectContactIds, selectContactsError, selectContactsLoading } from './contactsSlice';
import { useContact } from './hooks';

const ContactRow = ({ id, index }) => {
  const contact = useContact(id);

  return (
    <tr key={id}>
      <th scope='row'>{index + 1}</th>
      <td>{`${contact.firstName} ${contact.lastName}`}</td>
      <td>{contact.country}</td>
    </tr>
  );
};

ContactRow.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

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
