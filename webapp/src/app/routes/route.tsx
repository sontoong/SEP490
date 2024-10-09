import { Suspense } from "react";
import {
  Outlet,
  ScrollRestoration,
  createBrowserRouter,
} from "react-router-dom";

import { ROLE } from "../../constants/role";

import PrivateRoute from "./pRoute";
import AdminLayout from "../layout/admin-layout";
import ManagerLayout from "../layout/manager-layout";

//public
import LoginPage from "../pages/public/LoginPage";
import ChangePasswordPage from "../pages/public/ChangePasswordPage";
import ForgotPasswordPage from "../pages/public/ForgotPasswordPage";

//admin
import UserManagementPage from "../pages/admin/UserManagementPage";

//manager
import DashboardPage from "../pages/manager/DashboardPage";
import LeaderManagementPage from "../pages/manager/LeaderManagementPage";

//other page
import NotFoundPage from "../pages/404Page";
import TestPage from "../pages/TestPage";
import { NormalizeUrl } from "./NormalizeUrl";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<></>}>
        <NormalizeUrl>
          <Outlet />
        </NormalizeUrl>
        <ScrollRestoration />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: <PrivateRoute inverted={true} children={<></>} />,
      },
      //admin
      {
        path: "user-manage",
        element: (
          <Suspense fallback={<></>}>
            <PrivateRoute inverted={false} requiredRoles={[ROLE.admin]}>
              <AdminLayout>
                <UserManagementPage />
              </AdminLayout>
            </PrivateRoute>
          </Suspense>
        ),
      },
      //manager
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<></>}>
            {/* <PrivateRoute inverted={false} requiredRoles={[ROLE.admin]}> */}
            <ManagerLayout>
              <DashboardPage />
            </ManagerLayout>
            {/* </PrivateRoute> */}
          </Suspense>
        ),
      },
      {
        path: "leader-manage",
        element: (
          <Suspense fallback={<></>}>
            {/* <PrivateRoute inverted={false} requiredRoles={[ROLE.admin]}> */}
            <ManagerLayout>
              <LeaderManagementPage />
            </ManagerLayout>
            {/* </PrivateRoute> */}
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
  {
    path: "/login",
    element: (
      <Suspense fallback={<></>}>
        <PrivateRoute inverted={true}>
          <LoginPage />
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <Suspense fallback={<></>}>
        <PrivateRoute inverted={true}>
          <ForgotPasswordPage />
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/change-password",
    element: (
      <Suspense fallback={<></>}>
        <PrivateRoute inverted={true}>
          <ChangePasswordPage />
        </PrivateRoute>
      </Suspense>
    ),
  },
]);
