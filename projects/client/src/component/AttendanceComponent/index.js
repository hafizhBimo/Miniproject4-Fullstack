import { useState, useEffect } from "react";
import { Button, Alert } from "flowbite-react";
import axios from "axios";
import Clock from "react-live-clock";

const AttendanceComponent = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState("");
  const [attendanceData, setAttendanceData] = useState({});
  const token = localStorage.getItem("token");
  const condition = {
    1: "success",
    2: "success",
    3: "failure",
    4: "failure",
    5: "failure",
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/attendancereport", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAttendanceData(response.data.data);
      });
  }, []);

  const handleClickIn = async () => {
    await axios
      .post("http://localhost:8000/api/clockin", null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAlert(response.data.data);
        setShowAlert(true);
      })
      .catch((error) => {
        setAlert(error.response.data);
        setShowAlert(true);
        
      });
  };

  const handleClickOut = async () => {
    await axios
      .post("http://localhost:8000/api/clockout", null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAlert(response.data.data);
        setShowAlert(true);
        
      })
      .catch((error) => {
        setAlert(error.response.data);
        setShowAlert(true);
        
      });
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
          paddingLeft: "55px",
        }}
      >
        <div>
          {showAlert && (
            <Alert color={condition[alert.code]}>
              <span>
                <p>
                  <span className="font-medium">Info alert!</span>
                  {alert.message}
                </p>
              </span>
            </Alert>
          )}
        </div>
        <Clock
          format={"HH:mm:ss"}
          ticking={true}
          style={{ fontSize: "70px" }}
        />
        <Clock
          date={new Date()}
          format={"dddd, MMMM Do YYYY"}
          ticking={true}
          style={{ fontSize: "20px" }}
        />
        <div className="flex gap-4 p-10">
          <Button onClick={() => handleClickIn()}>clock in</Button>
          <Button onClick={() => handleClickOut()}>clock out</Button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceComponent;
