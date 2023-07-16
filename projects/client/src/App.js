import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import "./App.css";
import LoginPage from "./Page/LoginPage";

import EmployeeVerificationPage from "./Page/EmployeeVerificationPage";
import DashboardPage from "./Page/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  { path: "/verify/:accessToken", element: <EmployeeVerificationPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
