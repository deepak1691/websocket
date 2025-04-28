import React from 'react';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './componets/home/Home';
import "./App.css"
import UserPage from './componets/landing/UserPage';
import Logout from './componets/landing/logout';
import Login from './componets/landing/Login';
import Signup from './componets/landing/Signup';


export default function App() {

  const router=createBrowserRouter([
      {
        path:"/",
        element:<UserPage/>,
      },
      {
        path:"/chat",
        element:<Home/>
      },
      {
        path:"/logout",
        element:<Logout/>
      },
      {
        path:"/login",
        element:<Login/>
      },
   
  ]);
  return<RouterProvider router={router}/>
}
