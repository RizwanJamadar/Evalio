import React, { useEffect } from "react";

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import Interviews from "./pages/Interviews.jsx"
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Navbar from "./components/Navbar.jsx";
import Interview from "./pages/Interview.jsx"

const Layout = () => {
  return (
    <div className="root-layout">
      <Navbar/>
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Interviews/>,
      },{
        path:"/interview/:id",
        element:<Interview/>
      }
    ],
  },
  {
    path:"/sign-in",
    element: <SignIn/>
  },
  {
    path:"/sign-up",
    element: <SignUp/>
  }
]);

const App = () => {

  useEffect(() => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
