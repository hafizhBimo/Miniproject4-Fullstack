import { useState } from "react";
import { Dropdown, Navbar } from "flowbite-react";
import EmployeeRegistrationPage from "../../Page/EmployeeRegistrationPage";
import WelcomeMenuComponent from "../WelcomeMenuComponent";
import "./style.css";
import AttendanceComponent from "../AttendanceComponent";
import AttendanceReportComponent from "../AttendanceReportComponent";
import { useNavigate } from "react-router-dom";
import PayrollReportComponent from "../PayrollReportComponent";

export default function NavbarComponent({ roleId, setMenu, user }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [activeNav, setActiveNav] = useState({
    home: false,
    registration: false,
  });
  const [activeNavEmp, setActiveNavEmp] = useState({
    home: false,
    attendance: false,
    attendanceReport: false,
    payrollReport: false,
  });
  return (
    <Navbar fluid rounded style={{minWidth:"448px"}}>
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
            <Navbar.Link
              className="hover"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              logout
            </Navbar.Link>
          ) : (
            <Navbar.Link href="#">login</Navbar.Link>
          )}
        </Navbar.Collapse>
      ) : (
        <Navbar.Collapse>
          <Navbar.Link
            className="hover"
            active={activeNavEmp.home}
            onClick={() => {
              setMenu(<WelcomeMenuComponent user={user} />);
              setActiveNavEmp({ home: true });
            }}
          >
            <p>Home</p>
          </Navbar.Link>
          <Navbar.Link
            className="hover"
            active={activeNavEmp.attendance}
            onClick={() => {
              setMenu(<AttendanceComponent user={user} />);
              setActiveNavEmp({ attendance: true });
            }}
          >
            attendance
          </Navbar.Link>
          <Navbar.Link
            className="hover"
            active={activeNavEmp.attendanceReport}
            onClick={() => {
              setMenu(<AttendanceReportComponent />);
              setActiveNavEmp({ attendanceReport: true });
            }}
          >
            attendance report
          </Navbar.Link>
          <Navbar.Link
            className="hover"
            active={activeNavEmp.payrollReport}
            onClick={() => {
              setMenu(<PayrollReportComponent />);
              setActiveNavEmp({ payrollReport: true });
            }}
          >
            payroll report
          </Navbar.Link>
          <Navbar.Link
            className="hover"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </Navbar.Link>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
}
