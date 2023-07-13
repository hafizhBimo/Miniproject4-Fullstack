import NavbarComponent from "../../component/NavbarComponent";
import SidebarComponent from "../../component/SidebarComponent";

const DashboardPage = () => {
  return (
    <div className=" grid grid-cols-2">
      <div className=" cols-span-1">
        <SidebarComponent />
      </div>
      <div className="cols-span-2">
        <NavbarComponent />
        <p>halo admin</p>
      </div>
    </div>
  );
};

export default DashboardPage;
