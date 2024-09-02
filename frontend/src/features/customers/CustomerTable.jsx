import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import MBTodo from '../../components/MBTodo';
import { useMemo, useState } from 'react';

const FilterState = Object.freeze({
  ALL: 'all',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
});

const filterValues = Object.values(FilterState);

const useTableFilters = customers => {
  const [filter, setFilter] = useState(FilterState.ALL);
  const filteredCustomers = useMemo(() => {
    switch (filter) {
      case FilterState.ALL: {
        return customers;
      }
      case FilterState.ACTIVE: {
        return customers.filter(customer => customer.isActive);
      }
      case FilterState.INACTIVE: {
        return customers.filter(customer => !customer.isActive);
      }
      default: {
        return customers;
      }
    }
  }, [filter, customers]);
  const handleFilterClick = newFilter => {
    setFilter(() => newFilter);
  };
  return { filter, filteredCustomers, handleFilterClick };
};

const Table = ({ customers }) => {
  const navigate = useNavigate();
  const { filter, filteredCustomers, handleFilterClick } = useTableFilters(customers);

  const handleCustomerClick = customer => {
    navigate(customer.id);
  };

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
          {filteredCustomers.map((customer, index) => {
            return (
              <tr key={index} className='' onClick={() => handleCustomerClick(customer)}>
                <th scope='row'>{index + 1}</th>
                <td>{customer.name}</td>
                <td>{customer.country}</td>
                <td>{customer.isActive ? '✅' : '❌'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

Table.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      country: PropTypes.string,
      isActive: PropTypes.bool,
    })
  ),
};

export default Table;
