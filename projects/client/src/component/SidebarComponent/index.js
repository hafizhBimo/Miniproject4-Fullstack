import { Sidebar } from "flowbite-react";
import { HiOutlineClipboard } from "react-icons/hi";
import "./style.css"


const SidebarComponent = ({ roleId }) => {
  return (
    <Sidebar className="blabla" aria-label="Sidebar with content separator example">
      <Sidebar.Items>
        {roleId == 1 ? (
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/registrationform" icon={HiOutlineClipboard}>
              <p>Registration form</p>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        ) : null}
        <Sidebar.ItemGroup />
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SidebarComponent;
