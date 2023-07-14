import { useEffect, useState } from "react";
import axios from "axios";

import NavbarComponent from "../../component/NavbarComponent";
import SidebarComponent from "../../component/SidebarComponent";
import WelcomeMenuComponent from "../../component/WelcomeMenuComponent";

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
        setRoleId(response.data.data.role_id);
        setUser(response.data.data.email);
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

export default DashboardPage;
