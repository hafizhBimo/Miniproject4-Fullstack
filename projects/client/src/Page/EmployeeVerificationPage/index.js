import { Formik, Form } from "formik";
import { Button, Label, TextInput } from "flowbite-react";
import DatePicker from "react-datepicker";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import ConfirmationModalComponent from "../../component/ConfirmationModalComponent";
import rupiah from "../../utils/rupiah";

const EmployeeVerificationPage = () => {
  const {accessToken} = useParams();
  const [birthDate, setBirthDate] = useState(new Date());
  //BIKIN API UNTUK GET EMPLOYEE DATA BUAT MASUKIN KE VALUE
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
      birth_date: formattedDate(birthDate),
    };
    axios
      .patch(`http://localhost:8000/api/verification/${accessToken}`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error, "ini error");
      });
  };
  return (
    <div className=" flex justify-center mt-8 bg-slate-100">
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          birth_date: "",
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
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                placeholder="name@flowbite.com"
                required
                type="email"
                value={props.values.email}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="password" />
              </div>
              <TextInput
                id="password"
                required
                placeholder={rupiah(6000000)}
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

export default EmployeeVerificationPage;
