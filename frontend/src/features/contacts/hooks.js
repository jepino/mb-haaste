import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactById, selectContactById } from './contactsSlice';

export const useContact = contactId => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContactById(contactId));
  }, [contactId, dispatch]);

  return useSelector(state => selectContactById(state, contactId));
};
