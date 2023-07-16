import { Table, Pagination } from "flowbite-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import Clock from "react-live-clock";
import AuthComponent from "../AuthComponent";

const GeneratePayrollComponent = () => {
  const token = localStorage.getItem("token");
  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [response, setResponse] = useState("");
  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/allemployee?page=${currentPage}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEmployeeData(response.data.data);
        setTotalPage(response.data.pagination.totalPages);
      });
  }, [currentPage]);

  const handleClick = async (id) => {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    if (window.confirm("are you sure you want proceed?")) {
      await axios
        .post(
          "http://localhost:8000/api/generatepayroll",
          {
            id: id,
            month: month + 1,
            year: year,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setResponse(response.data);
        });
    }
  };
  return (
    <div
      className="flex justify-center items-center bg-slate-100"
      style={{ paddingLeft: "52px" }}
    >
      <div
        style={{
          width: "1000px",
          alignItems: "center",
          backgroundColor: "white",
          height: "auto",
          minHeight: "94vh",
          display: "flex",
          flexDirection: "column",
          paddingLeft: "24px",
        }}
      >
        <Table>
          <Table.Head>
            <Table.HeadCell>no.</Table.HeadCell>
            <Table.HeadCell>first name</Table.HeadCell>
            <Table.HeadCell>last name</Table.HeadCell>
            <Table.HeadCell>join date</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {employeeData.map((data, key) => {
              return (
                <Table.Row
                  key={key}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {key + 1}
                  </Table.Cell>
                  <Table.Cell>{data.first_name}</Table.Cell>
                  <Table.Cell>{data.last_name}</Table.Cell>
                  <Table.Cell>{data.join_date}</Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => handleClick(data.user_id)}>
                      generate payroll
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={totalPage}
        />
      </div>
    </div>
  );
};

export default GeneratePayrollComponent;
