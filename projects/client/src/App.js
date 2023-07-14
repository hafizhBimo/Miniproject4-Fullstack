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
import EmployeeRegistrationPage from "./Page/EmployeeRegistrationPage";
import EmployeeVerificationPage from "./Page/EmployeeVerificationPage";
import DashboardPage from "./Page/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/registrationform",
    element: <EmployeeRegistrationPage />,
  },
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
