import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerContacts, selectCustomerContacts, selectCustomerLoading } from './customersSlice';
import { useContact } from '../contacts/hooks';

const CustomerContactRow = ({ id, index }) => {
  const contact = useContact(id);

  if (!contact) return null;

  return (
    <tr key={contact.id}>
      <td scope='row'>{index + 1}</td>
      <td>{`${contact.firstName} ${contact.lastName}`}</td>
      <td>
        <button className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  );
};

CustomerContactRow.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const useCustomerContacts = id => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomerContacts(id));
  }, [id, dispatch]);

  const contactIds = useSelector(state => selectCustomerContacts(state, id));
  const loading = useSelector(selectCustomerLoading);

  return { contactIds, loading };
};

const CustomerContactTable = ({ customerId }) => {
  // MB-TODO: Implement fetch customer's contacts
  // MB-TODO: Implement add contact to customer
  // MB-TODO: Implement remove contact of customer
  const { contactIds, loading } = useCustomerContacts(customerId);

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
          <CustomerContactRow key={contactId} id={contactId} index={index} />
        ))}
      </tbody>
    </table>
  );
};

CustomerContactTable.propTypes = {
  customerId: PropTypes.string.isRequired,
};

export default CustomerContactTable;
