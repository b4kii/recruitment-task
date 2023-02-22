import React from "react";
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";

import Home from "./pages/Home";
import MapResult from "./pages/MapResult";

// const API_KEY = xubEW4OMIUsraTtYqak5OoFXNL-dqPNgnk6mUf_1YEU; // xd

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/map-result",
        element: <MapResult />
      }
    ]
  }
]);

function Layout() {
  return (
    <Outlet />
  );
}

export default function App() {
  return <RouterProvider router={router} />
}
