import { useEffect, useState } from "react";
import axios from "axios";

const AttendanceReportComponent = () => {
  const token = localStorage.getItem("token");
  const [attendanceData, setAttendanceData] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/attendancereport", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAttendanceData(response.data.data);
        console.log(response.data.data)
      });
  }, []);
  return <div>hehe</div>;
};

export default AttendanceReportComponent;
