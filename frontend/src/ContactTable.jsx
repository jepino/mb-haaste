import PropTypes from 'prop-types'

const Table = ({ contacts }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{`${contact.firstName} ${contact.lastName}`}</td>
              <td>{contact.country}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

Table.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string
  }))
}


export default Table