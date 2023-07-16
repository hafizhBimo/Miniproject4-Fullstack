import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Card, Pagination } from "flowbite-react";
import "boxicons";
import avatar from "../../asset/pngegg.png";
import rupiah from "../../utils/rupiah";


const PayrollReportComponent = () => {
  const token = localStorage.getItem("token");
  const [payrollData, setPayrollData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/payrolldata?page=${currentPage}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPayrollData(response.data.data);
        setTotalPage(response.data.pagination.totalPages);
        console.log(response.data.data);
      });
  }, [currentPage]);
  return (
    <div className="flex justify-center items-center bg-slate-100">
      <div
        style={{
          width: "1000px",
          alignItems: "center",
          backgroundColor: "white",
          height: "auto",
          minHeight: "94vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Card horizontal className="my-10">
          <div className="flex">
            <div>
              <img src={avatar} style={{ width: "130px" }} />
            </div>
            <div className="p-8">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>{payrollData[0]?.User.Employee_detail.first_name}</p>
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <p>
                  <b>join date: </b>
                  {payrollData[0]?.User.Employee_detail.join_date}
                </p>
              </p>
            </div>
          </div>
        </Card>
        <Table>
          <Table.Head>
            <Table.HeadCell>no.</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Total deduction</Table.HeadCell>
            <Table.HeadCell>Total Payroll</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {payrollData.map((data, key) => {
              return (
                <Table.Row
                  key={key}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {key + 1}
                  </Table.Cell>
                  <Table.Cell>
                    {data.User.Employee_detail.first_name}
                  </Table.Cell>
                  <Table.Cell style={{ color: "red" }}>
                    {rupiah(data.total_deduction)}
                  </Table.Cell>
                  <Table.Cell>{rupiah(data.total_payroll)}</Table.Cell>
                  <Table.Cell>{data.date}</Table.Cell>
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

export default PayrollReportComponent;
