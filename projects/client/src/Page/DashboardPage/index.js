import { useEffect, useState } from "react";
import axios from "axios";

import NavbarComponent from "../../component/NavbarComponent";
import SidebarComponent from "../../component/SidebarComponent";

const DashboardPage = () => {
  const token = localStorage.getItem("token");
  const [roleId, setRoleId] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/auth/keeplogin", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setRoleId(response.data.data.role_id);
      });
  }, []);
  return (
    <div className=" grid grid-cols-2">
      <div className=" cols-span-1">
        <SidebarComponent roleId={roleId} />
      </div>
      <div className="cols-span-2">
        <NavbarComponent />
        <p>halo admin</p>
      </div>
    </div>
  );
};

export default DashboardPage;
