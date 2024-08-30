import './App.css';
import ErrorPage from './ErrorPage';
import { Contacts, Customer, Customers } from './Pages';
import mbLogo from './assets/mb-logo.svg';

import {
  NavLink,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter
} from "react-router-dom";

const Root = () => {
  return (
    <Routes>
      <Route path='/' element={(
        <>
          <div id="app-sidebar" className='p-3'>
            <NavLink to="/" className="link-body-emphasis text-decoration-none text-center">
              <b className="fs-5">MB-Challenge</b>
            </NavLink>
            <hr />
            <nav className='mb-auto overflow-y-auto d-flex flex-column flex-grow-1'>
              <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                  <NavLink to='customers' className="nav-link link-body-emphasis" >
                    Customers
                  </NavLink>
                </li>
                <li>
                  <NavLink to='contacts' className="nav-link link-body-emphasis">
                    Contacts
                  </NavLink>
                </li>
              </ul>
            </nav>
            <hr />
            <div className="d-flex flex-shrink-0">
              <a href="https://madbooster.com" className="d-flex align-items-center link-body-emphasis text-decoration-none"
                target='_blank'
                rel='noopener noreferrer'>
                <img src={mbLogo} alt="" width="32" height="32" className="rounded-circle me-2" />
                <strong>Mad Booster</strong>
              </a>
            </div>
          </div>
          <div className="app-divider app-vr"></div>
          <main>
            <Outlet />
          </main>
        </>
      )}
      >
        <Route index element={(
          <div className='m-5'>
            <h1 className='fw-bold'>MB-Challenge</h1>
            <p className="fs-3">Welcome to Mad Booster&apos;s recruit challenge!</p>
            <p><i>Add instructions here</i></p>
          </div>
        )}
        />
        <Route path='customers' element={<Customers />} />
        <Route path='customers/:customerId' element={<Customer />} />
        <Route path='contacts' element={<Contacts />} />
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  )
}

const router = createBrowserRouter([
  { path: '*', Component: Root }
])

const App = () => (
  <RouterProvider router={router} />
)


export default App
