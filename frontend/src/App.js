import './App.css';

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import About from './screens/about.js';
import Home from './screens/home.js';
import Register from './screens/Register.js';
import Login from './screens/Login.js';
import RouteLayout from './screens/RouteLayout.js';
import Cart from './components/cart.js';

import AdminProfile from './adminComponents/AdminProfile.js';
import UserProfile from './components/UserProfile.js';
import AddProduct from './adminComponents/addProduct.js';
function App() {
  let browserRouter = createBrowserRouter([
    {
      path: '',
      element: <RouteLayout />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path:'/about',
          element:<About/>
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path:'/cart',
          element:<Cart/>
        },
        {
           path:'/admin-profile',
           element:<AdminProfile/>,
           children:[
            {
              path:'add-product',
              element:<AddProduct/>
            }
           ] 
        },
        {
          path:'/user-profile',
          element:<UserProfile/>
        }
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={browserRouter}></RouterProvider>
    </div>
  );
}

export default App;
