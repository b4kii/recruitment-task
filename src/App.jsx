import React from "react";
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";

import Home from "./pages/Home";
import MapResult from "./pages/MapResult";
import { mapResultLoaderData } from "./pages/MapResult";
import NotFound from "./pages/NotFound";

// const API_KEY = xubEW4OMIUsraTtYqak5OoFXNL-dqPNgnk6mUf_1YEU; // xd

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/map-result",
        element: <MapResult />,
        loader: mapResultLoaderData,
      },
      {
        path: "*",
        element: <NotFound />
      }
    ],
  },
]);

function Layout() {
  return (
    <div className="h-screen bg-slate-400 grid place-content-center">
      <Outlet />
    </div>
  );
}

export default function App() {
  return <RouterProvider router={router} />;
}
