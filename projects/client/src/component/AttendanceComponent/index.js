import dayjs from "dayjs";
import LiveClockComponent from "../LiveClockComponent";
import { useState } from "react";
import { Button } from "flowbite-react";
import axios from "axios";

const AttendanceComponent = () => {
  const [clock, setClock] = useState(<LiveClockComponent />);
  const [alert, setAlert] = useState("");
  const time = dayjs().format();
  const token = localStorage.getItem("token");

  const handleClickIn = () => {
    try {
      axios
        .post("http://localhost:8000/api/clockin", null, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setAlert(response.data.message);
        });
    } catch (error) {
      return;
    }
  };

  return (
    <div
      style={{ height: "94vh" }}
      className="flex justify-center items-center bg-slate-100"
    >
      <div
        style={{
          width: "1000px",
          alignItems: "center",
          backgroundColor: "white",
          height: "94vh",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {clock}
        <div className="flex gap-4 p-10">
          <Button onClick={() => handleClickIn()}>clock in</Button>
          <Button>clock out</Button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceComponent;
