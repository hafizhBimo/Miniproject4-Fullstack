import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Button, Label, TextInput } from "flowbite-react";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ConfirmationModalComponent from "../../component/ConfirmationModalComponent";
import rupiah from "../../utils/rupiah";

const EmployeeRegistrationPage = () => {
  const [birthDate, setBirthDate] = useState(new Date());
  const [joinDate, setJoinDate] = useState(new Date());
  const handleSubmit = () => {};
  return (
    <div className=" flex justify-center mt-8">
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          birth_date: "",
          join_date: "",
          email: "",
          salary: "",
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form className="flex max-w-md flex-col gap-4 w-96 px-7 pt-8 pb-14 border">
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
                id="birth_date"
                required
                selected={birthDate}
                onChange={(date) => setBirthDate(date)}
                value={birthDate}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="join_date" value="Join date" />
              </div>
              <DatePicker
                id="join_date"
                required
                selected={joinDate}
                onChange={(date) => setJoinDate(date)}
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
                <Label htmlFor="salary" value="Salary" />
              </div>
              <TextInput
                id="salary"
                required
                placeholder={rupiah(6000000)}
                onChange={props.handleChange}
                value={props.values.salary}
              />
            </div>

            <ConfirmationModalComponent />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmployeeRegistrationPage;
