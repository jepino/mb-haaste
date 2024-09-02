import './App.css';
import ErrorPage from './components/ErrorPage';
import NavBar from './components/NavBar';
import CustomerPage from './features/customers/CustomerPage';
import CustomerListPage from './features/customers/CustomerListPage';
import ContactListPage from './features/contacts/ContactListPage';

import { Outlet, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';

const Root = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <>
            <NavBar />
            <div className='app-divider app-vr'></div>
            <main>
              <Outlet />
            </main>
          </>
        }
      >
        <Route
          index
          element={
            <div className='m-5'>
              <h1 className='fw-bold'>MB-Challenge</h1>
              <p className='fs-3'>Welcome to Mad Booster&apos;s recruit challenge!</p>
              <p>
                <i>Add instructions here</i>
              </p>
            </div>
          }
        />
        <Route path='customers' element={<CustomerListPage />} />
        <Route path='customers/:customerId' element={<CustomerPage />} />
        <Route path='contacts' element={<ContactListPage />} />
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

const router = createBrowserRouter([{ path: '*', Component: Root }]);

const App = () => <RouterProvider router={router} />;

export default App;
