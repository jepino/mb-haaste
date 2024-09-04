import PropType from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createCustomerContact, selectUnmappedContacts } from './customersSlice';
import { useEffect } from 'react';
import { fetchContacts } from '../contacts/contactsSlice';

const useNewCustomerContact = customerId => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const createContact = contactId => {
    dispatch(createCustomerContact({ customerId, contactId }));
  };

  const unmappedContacts = useSelector(state => selectUnmappedContacts(state, customerId));
  return { unmappedContacts, createContact };
};

const NewCustomerContact = ({ customerId }) => {
  const { unmappedContacts, createContact } = useNewCustomerContact(customerId);

  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const contactId = formData.get('selectCustomer');
    createContact(contactId);
  };

  if (!unmappedContacts) return null;

  return (
    <form className='mb-5' onSubmit={handleSubmit}>
      <div className='row mb-3'>
        <div className='col form-group'>
          <label className='form-label' htmlFor='selectCustomer'>
            Select Contact
          </label>
          <select className='form-select' id='selectCustomer' name='selectCustomer'>
            {unmappedContacts.map(c => (
              <option key={c.id} value={c.id}>
                {`${c.firstName} ${c.lastName}`}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className='btn btn-primary' type='submit'>
        Add Contact
      </button>
    </form>
  );
};
NewCustomerContact.propTypes = {
  customerId: PropType.string.isRequired,
};

export default NewCustomerContact;
