import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import MBTodo from '../../components/MBTodo';
import { useSelector } from 'react-redux';
import { selectCustomerById, selectCustomerError, selectCustomerLoading, selectFilteredCustomerIds } from './customersSlice';

export const FilterState = Object.freeze({
  ALL: 'all',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
});

const filterValues = Object.values(FilterState);

const useCustomerTable = () => {
  const [filter, setFilter] = useState(FilterState.ALL);
  const filteredIds = useSelector(state => selectFilteredCustomerIds(state, filter));
  const loading = useSelector(selectCustomerLoading);
  const error = useSelector(selectCustomerError);

  const handleFilterClick = newFilter => {
    setFilter(() => newFilter);
  };
  return { filteredIds, loading, error, filter, handleFilterClick };
};

const CustomerTable = () => {
  const { filteredIds: customerIds, loading, error, filter, handleFilterClick } = useCustomerTable();

  if (error) {
    return (
      <div className='alert alert-danger d-block mt-3' role='alert'>
        {error.message}
      </div>
    );
  } else if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='card my-3'>
        <div className='card-body'>
          <i className='bi bi-filter' /> Filters
          <div>
            <MBTodo isCompleted={true} task='Create solution to filters customers by activity' />
          </div>
          <div className='btn-group mt-2' role='group' aria-label='activity status filters'>
            {filterValues.map(filterValue => (
              <button
                key={filterValue}
                type='button'
                className={`btn btn-secondary text-capitalize ${filterValue === filter ? 'active' : null}`}
                onClick={() => handleFilterClick(filterValue)}
              >
                {filterValue}
              </button>
            ))}
          </div>
        </div>
      </div>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Country</th>
            <th scope='col'>Is Active</th>
          </tr>
        </thead>
        <tbody>
          {customerIds.map((id, index) => (
            <CustomerRow key={id} id={id} index={index} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CustomerTable;

const CustomerRow = ({ id, index }) => {
  const customer = useSelector(state => selectCustomerById(state, id));

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(id);
  };

  return (
    <tr key={id} className='' onClick={handleClick}>
      <th scope='row'>{index + 1}</th>
      <td>{customer.name}</td>
      <td>{customer.country}</td>
      <td>{customer.isActive ? '✅' : '❌'}</td>
    </tr>
  );
};

CustomerRow.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number,
};
