import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Button, Label, TextInput } from "flowbite-react";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const EmployeeRegistrationPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const handleSubmit = () => {
    //ngirim email verification ke email employee, buat ngisi data diri dan password
  };
  return (
    <div className=" flex justify-center mt-8">
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          birth_date: "",
          join_date: "",
          email: "",
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form className="flex max-w-md flex-col gap-4 w-96 px-7 pt-24 pb-14 border">
            <div>
              <h1 className=" font-bold">Employee Registration Form</h1>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="first_name" value="Your first name" />
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
                <Label htmlFor="last_name" value="Your last name" />
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
                <Label htmlFor="birth_date" value="Your birth date" />
              </div>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <TextInput
                id="birth_date"
                required
                type="text"
                onChange={props.handleChange}
                value={props.values.birth_date}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
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
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                id="password"
                required
                type="password"
                onChange={props.handleChange}
                value={props.values.password}
              />
            </div>

            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmployeeRegistrationPage;
