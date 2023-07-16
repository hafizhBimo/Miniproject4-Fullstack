import { Formik, Form } from "formik";
import { Button, Label, TextInput } from "flowbite-react";
import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import rupiah from "../../utils/rupiah";
import AuthComponent from "../../component/AuthComponent";

const EmployeeVerificationPage = () => {
  const { accessToken } = useParams();
  const [birthDate, setBirthDate] = useState(new Date());
  const [employeeData, setEmployeeData] = useState({});
  const navigate = useNavigate();
  //BIKIN API UNTUK GET EMPLOYEE DATA BUAT MASUKIN KE VALUE
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/employee/${accessToken}`)
      .then((response) => {
        setEmployeeData(response.data.data);
        console.log(response.data.data);
      });
  }, []);
  const formattedDate = (data) => {
    return `${data.getMonth() + 1}/${data.getDate()}/${data.getFullYear()}`;
  };
  const handleChange = (value, type) => {
    if (type == "birth") {
      setBirthDate(value);
    }
  };
  const handleSubmit = (value) => {
    let data = {
      ...value,
      birth_date: employeeData.birth_date,
    };
    axios
      .patch(`http://localhost:8000/api/verification/${accessToken}`, data)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error, "ini error");
      });
  };
  return (
    <div className=" flex justify-center mt-8 bg-slate-100">
      <Formik
        initialValues={{
          first_name: employeeData.first_name,
          last_name: employeeData.last_name,
          birth_date: employeeData.birth_date,
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form className="flex max-w-md flex-col gap-4 w-96 px-7 pt-8 pb-14 bg-white">
            <div>
              <h1 className=" font-bold">Employee Verification Form</h1>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="first_name" value="First name" />
              </div>
              <TextInput
                id="first_name"
                placeholder="first_name"
                required
                type="text"
                onChange={(event) =>
                  setEmployeeData({
                    ...employeeData,
                    first_name: event.target.value,
                  })
                }
                value={employeeData.first_name}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="last_name" value="Last name" />
              </div>
              <TextInput
                id="last_name"
                placeholder="last_name"
                required
                type="text"
                onChange={(event) =>
                  setEmployeeData({
                    ...employeeData,
                    last_name: event.target.value,
                  })
                }
                value={employeeData.last_name}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="birth_date" value="Birth date" />
              </div>
              <DatePicker
                dateFormat="yyyy/MM/dd"
                id="birth_date"
                required
                selected={birthDate}
                onChange={(event) =>
                  setEmployeeData({
                    ...employeeData,
                    birth_date: event.target.value,
                  })
                }
                value={employeeData.birth_date}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="password" />
              </div>
              <TextInput
                id="password"
                required
                type="password"
                placeholder="password"
                onChange={props.handleChange}
                value={props.values.password}
              />
            </div>
            <Button type="submit">submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthComponent(EmployeeVerificationPage);
