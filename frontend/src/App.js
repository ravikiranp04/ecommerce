import './App.css';

import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import About from './screens/about.js';
import Home from './screens/home.js';
import Register from './screens/Register.js';
import Login from './screens/Login.js';
import RouteLayout from './screens/RouteLayout.js';
import Cart from './components/cart.js';
import OfflineCart from './components/OfflineCart.js';
import AdminProfile from './adminComponents/AdminProfile.js';
import UserProfile from './components/UserProfile.js';
import AddProduct from './adminComponents/addProduct.js';
import AdminCardDetail from './adminComponents/AdminCardDetail.js';
import ModifyProduct from './adminComponents/ModifyProduct.js';
import WishList from './components/WishList.js';
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
           path:'/admin-profile',
           element:<AdminProfile/>,
           
        },
        {
          path:'/admin-profile/add-product',
          element:<AddProduct/>
        },
        {
          path:'/user-profile/:username',
          element:<UserProfile/>,
          
        },
        {
          path:'/admin-profile/:productid',
          element:<AdminCardDetail/>,
          
        },
        {
          path:'/admin-profile/:productid/modify-product',
          element:<ModifyProduct/>
        },
        {
          path:'/user-profile/:username/cart',
          element:<Cart/>
        },
        {
          path:'/cart',
          element:<OfflineCart/>
        },
        {
          path:'/wishlist',
          element:<OfflineCart/>
        },
        {
          path:'/user-profile/:username/wishlist',
          element:<WishList/>
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
