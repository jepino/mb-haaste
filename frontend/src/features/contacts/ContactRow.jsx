import PropTypes from 'prop-types';
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

export default ContactRow;
