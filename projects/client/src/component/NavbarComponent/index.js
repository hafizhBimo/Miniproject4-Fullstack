import { useState } from "react";
import { Dropdown, Navbar } from "flowbite-react";
import EmployeeRegistrationPage from "../../Page/EmployeeRegistrationPage";
import WelcomeMenuComponent from "../WelcomeMenuComponent";
import "./style.css"

export default function NavbarComponent({ roleId, setMenu, user }) {
  const token = localStorage.getItem("token");
  const [activeNav, setActiveNav] = useState({
    home: false,
    registration: false,
  });
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com"></Navbar.Brand>
      <div className="flex md:order-2">
        <Navbar.Toggle />
      </div>
      {roleId == 1 ? (
        <Navbar.Collapse>
          <Navbar.Link
            className="hover"
            active={activeNav.home}
            onClick={() => {
              setMenu(<WelcomeMenuComponent user={user} />);
              setActiveNav({ home: true });
            }}
          >
            <p>Home</p>
          </Navbar.Link>
          <Navbar.Link
            className="hover"
            active={activeNav.registration}
            onClick={() => {
              setMenu(<EmployeeRegistrationPage />);
              setActiveNav({ registration: true });
            }}
          >
            registration form
          </Navbar.Link>
          {token ? (
            <Navbar.Link href="#">logout</Navbar.Link>
          ) : (
            <Navbar.Link href="#">login</Navbar.Link>
          )}
        </Navbar.Collapse>
      ) : (
        <Navbar.Collapse>
          <Navbar.Link active href="#">
            <p>Home</p>
          </Navbar.Link>
          <Navbar.Link href="#">attendance</Navbar.Link>
          <Navbar.Link href="#">attendance report</Navbar.Link>
          <Navbar.Link href="#">payroll report</Navbar.Link>
          <Navbar.Link href="#">Logout</Navbar.Link>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
}
