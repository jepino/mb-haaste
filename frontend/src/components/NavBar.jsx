import mbLogo from '../assets/mb-logo.svg';

import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div id='app-sidebar' className='p-3'>
      <NavLink to='/' className='link-body-emphasis text-decoration-none text-center'>
        <b className='fs-5'>MB-Challenge</b>
      </NavLink>
      <hr />
      <nav className='mb-auto overflow-y-auto d-flex flex-column flex-grow-1'>
        <ul className='nav nav-pills flex-column'>
          <li className='nav-item'>
            <NavLink to='customers' className='nav-link link-body-emphasis'>
              Customers
            </NavLink>
          </li>
          <li>
            <NavLink to='contacts' className='nav-link link-body-emphasis'>
              Contacts
            </NavLink>
          </li>
        </ul>
      </nav>
      <hr />
      <div className='d-flex flex-shrink-0'>
        <a
          href='https://madbooster.com'
          className='d-flex align-items-center link-body-emphasis text-decoration-none'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src={mbLogo} alt='Mad Booster logo' width='32' height='32' className='rounded-circle me-2' />
          <strong>Mad Booster</strong>
        </a>
      </div>
    </div>
  );
};

export default NavBar;
