import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import Signup from "./screens/Signup";
import Signin from "./screens/Signin";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import ThemeContextProvider from "./contexts/ThemeContext";

//ROOT LAYOUT
const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

//AUTH LAYOUT
const AuthLayout = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center dark:bg-slate-900">
      <Outlet />
    </div>
  );
};

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Signin />,
        },
        {
          path: "/auth/signup",
          element: <Signup />,
        },
      ],
    },
  ]);

  return (
    <ThemeContextProvider>
      <main className="dark:bg-slate-900">
        <Toaster />
        <RouterProvider router={routes} />
      </main>
    </ThemeContextProvider>
  );
};

export default App;
