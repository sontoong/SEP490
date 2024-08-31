import { Suspense } from "react";
import {
  Navigate,
  Outlet,
  ScrollRestoration,
  createBrowserRouter,
} from "react-router-dom";

import PrivateRoute from "./pRoute";
import PublicLayout from "../layout/public-layout";

//public
import HomePage from "../pages/public/HomePage";

//other page
import NotFoundPage from "../pages/404Page";
import TestPage from "../pages/TestPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<></>}>
        <PublicLayout>
          <Outlet />
        </PublicLayout>
        <ScrollRestoration />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <PrivateRoute inverted={true} children={<Navigate to="/cities" />} />
        ),
      },
      {
        path: "cities",
        element: (
          <Suspense fallback={<></>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "test",
        element: (
          <Suspense fallback={<></>}>
            <TestPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<></>}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);
