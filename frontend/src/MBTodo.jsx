import PropTypes from 'prop-types'

const MBTodo = ({ task, isCompleted }) =>
isCompleted
 ? null
 : (
  <b>
    <i className="bi bi-check2-circle" />
    {' '}
    <i className='text-muted'>MB-TODO: {task} </i>
  </b>

)

MBTodo.propTypes = {
  isCompleted: PropTypes.bool,
  task: PropTypes.string.isRequired
}

export default MBTodo
