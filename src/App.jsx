import React, { useEffect } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth"; // Firebase Auth import
import { auth } from "./firebase"; // Firebase setup
import { useUserStore } from "./lib/userStore.js"; // Your Zustand store

import Interviews from "./pages/Interviews.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Navbar from "./components/Navbar.jsx";
import Interview from "./pages/Interview.jsx";
import Generate from "./pages/Generate.jsx";

const Layout = () => {
  return (
    <div className="root-layout">
      <Navbar />
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
        element: <Interviews />,
      },
      {
        path: "/interview/:id",
        element: <Interview />,
      },
      {
        path: "/interview",
        element: <Generate />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore(); // Using Zustand store

  useEffect(() => {
    // Listen to the auth state changes
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user?.uid);
      } else {
        fetchUserInfo(null);
      }
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50 space-y-4">
        <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        <p className="text-white text-lg font-medium">Please wait!!</p>
      </div>
    );
  }

  return <RouterProvider router={router} />;
};

export default App;
