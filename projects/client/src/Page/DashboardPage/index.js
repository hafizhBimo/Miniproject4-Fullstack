import { useEffect, useState } from "react";
import axios from "axios";

import NavbarComponent from "../../component/NavbarComponent";
import WelcomeMenuComponent from "../../component/WelcomeMenuComponent";
import AuthComponent from "../../component/AuthComponent";

const DashboardPage = () => {
  const token = localStorage.getItem("token");
  const [roleId, setRoleId] = useState(0);
  const [user, setUser] = useState("");
  const [menu, setMenu] = useState(<WelcomeMenuComponent user={user} />);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/auth/keeplogin", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setRoleId(response.data.data.user.role_id);
        setUser(response.data.data.user.Employee_detail.first_name);
      });
  }, []);

  useEffect(() => {
    setMenu(<WelcomeMenuComponent user={user} />);
   
  }, [user]);

  return (
    <div>
      <NavbarComponent roleId={roleId} setMenu={setMenu} user={user} />
      {menu}
    </div>
  );
};

export default AuthComponent(DashboardPage);
