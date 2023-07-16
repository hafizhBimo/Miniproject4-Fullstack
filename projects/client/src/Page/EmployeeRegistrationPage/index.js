import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Button, Label, TextInput } from "flowbite-react";
import DatePicker from "react-datepicker";
import { useState } from "react";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";
import rupiah from "../../utils/rupiah";
import AuthComponent from "../../component/AuthComponent";

const EmployeeRegistrationPage = () => {
  const [birthDate, setBirthDate] = useState(new Date());
  const [joinDate, setJoinDate] = useState(new Date());

  const token = localStorage.getItem("token");

  const formattedDate = (data) => {
    return `${data.getMonth() + 1}/${data.getDate() + 1}/${data.getFullYear()}`;
  };
  const handleChange = (value, type) => {
    if (type == "birth") {
      setBirthDate(value);
    } else {
      setJoinDate(value);
    }
  };
  const handleSubmit = (value) => {
    if (window.confirm("are you sure you want to proceed?")) {
      let data = {
        ...value,
        birth_date: formattedDate(birthDate),
        join_date: formattedDate(joinDate),
      };

      axios
        .post("http://localhost:8000/api/registration", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response);
          alert(response.data.message);
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data.message);
        });
    }
  };
  return (
    <div className=" flex justify-center mt-8 bg-slate-100">
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          birth_date: "",
          join_date: "",
          email: "",
          basic_salary: "",
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form className="flex max-w-md flex-col gap-4 w-96 px-7 pt-8 pb-14 bg-white">
            <div>
              <h1 className=" font-bold">Employee Registration Form</h1>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="first_name" value="First name" />
              </div>
              <TextInput
                id="first_name"
                placeholder="Jake"
                required
                type="text"
                onChange={props.handleChange}
                value={props.values.first_name}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="last_name" value="Last name" />
              </div>
              <TextInput
                id="last_name"
                placeholder="Sulley"
                required
                type="text"
                onChange={props.handleChange}
                value={props.values.last_name}
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
                onChange={(date) => handleChange(date, "birth")}
                value={birthDate}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="join_date" value="Join date" />
              </div>
              <DatePicker
                dateFormat="yyyy/MM/dd"
                id="join_date"
                required
                selected={joinDate}
                onChange={(date) => handleChange(date, "join")}
                value={joinDate}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                placeholder="name@flowbite.com"
                required
                type="email"
                onChange={props.handleChange}
                value={props.values.email}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="basic_salary" value="Basic salary" />
              </div>
              <TextInput
                id="basic_salary"
                required
                placeholder={rupiah(6000000)}
                onChange={props.handleChange}
                value={props.values.basic_salary}
              />
            </div>
            <Button type="submit">submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthComponent(EmployeeRegistrationPage);
