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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
