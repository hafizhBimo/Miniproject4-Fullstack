import { Sidebar } from "flowbite-react";
import { HiOutlineClipboard } from "react-icons/hi";

const SidebarComponent = () => {
  return (
    <Sidebar aria-label="Sidebar with content separator example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiOutlineClipboard}>
            <p>Registration form</p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup />
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SidebarComponent;
