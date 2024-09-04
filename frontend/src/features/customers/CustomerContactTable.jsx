import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerContacts, removeCustomerContact, selectCustomerContacts, selectCustomerLoading } from './customersSlice';
import { useContact } from '../contacts/hooks';

const CustomerContactRow = ({ id, index, onDelete }) => {
  const contact = useContact(id);

  if (!contact) return null;

  return (
    <tr key={contact.id}>
      <td scope='row'>{index + 1}</td>
      <td>{`${contact.firstName} ${contact.lastName}`}</td>
      <td>
        <button className='btn btn-danger' onClick={() => onDelete(id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

CustomerContactRow.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const useCustomerContacts = customerId => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomerContacts(customerId));
  }, [customerId, dispatch]);

  const deleteCustomerContact = contactId => {
    dispatch(removeCustomerContact({ customerId, contactId }));
  };

  const contactIds = useSelector(state => selectCustomerContacts(state, customerId));
  const loading = useSelector(selectCustomerLoading);

  return { contactIds, loading, deleteCustomerContact };
};

const CustomerContactTable = ({ customerId }) => {
  // MB-DONE: Implement fetch customer's contacts
  // MB-TODO: Implement add contact to customer
  // MB-DONE: Implement remove contact of customer
  const { contactIds, loading, deleteCustomerContact } = useCustomerContacts(customerId);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <table className='table table-hover'>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Name</th>
          <th scope='col'>Action</th>
        </tr>
      </thead>
      <tbody>
        {contactIds.map((contactId, index) => (
          <CustomerContactRow key={contactId} id={contactId} index={index} onDelete={deleteCustomerContact} />
        ))}
      </tbody>
    </table>
  );
};

CustomerContactTable.propTypes = {
  customerId: PropTypes.string.isRequired,
};

export default CustomerContactTable;
