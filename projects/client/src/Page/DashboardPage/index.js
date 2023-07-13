import SidebarComponent from "../../component/SidebarComponent";

const DashboardPage = () => {
  return (
    <div className=" grid grid-cols-2">
      <div className=" cols-span-1">
        <SidebarComponent />
      </div>
      <div className="cols-span-2">
        ini grid 2
      </div>
    </div>
  );
};

export default DashboardPage;
