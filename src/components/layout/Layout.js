import React from "react";
import Login from "../login/Login";
import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";
import Projects from "../projects/Projects";
import Tasks from "../tasks/Tasks";
import NotFound from "../not-found/NotFound";
import taskDetails from "../tasks/details/TaskDetails";

// Redirect invalid URLs before the '#' to the correct hash-based URL
if (window.location.pathname !== "/") {
  window.location.replace(
    `${window.location.origin}/#${window.location.pathname}`
  );
}

const Layout = () => {
  const router = createHashRouter([
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/projects/:userId",
      element: <Projects />
    },
    {
      path: "/projects/tasks/:projectId",
      element: <Tasks />
    },
    // Redirect the root path to /login
    {
      path: "/",
      element: <Navigate to="/login" />
    },
    // Optionally, redirect any unknown paths to /login
    {
      path: "*",
      element: <NotFound />
    }
  ]);
  return <RouterProvider router={router} />;
};

export default Layout;
