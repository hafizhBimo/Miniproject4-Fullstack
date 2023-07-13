import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Button, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { useState } from "react";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const createSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be 6 characters at minimum")
      .required("Password is required"),
  });
  const handleSubmit = (value) => {
    axios
      .post("http://localhost:8000/api/auth/login", value)
      .then((response) => {
        localStorage.setItem("token", response.data.loginToken);
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };
  return (
    <div className=" flex justify-center mt-48">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={createSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form
            className="flex max-w-md flex-col gap-4 w-96 px-7 py-24 border"
            onSubmit={props.handleSubmit}
          >
            <div>
              <h1 className=" font-bold">Sign in</h1>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                name="email"
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
              {errorMessage ? (
                <div>
                  <TextInput
                    color="failure"
                    helperText={
                      <>
                        <span className="font-medium">Oops!</span>
                        {errorMessage}
                      </>
                    }
                    id="password"
                    required
                    type="password"
                    onChange={props.handleChange}
                    value={props.values.password}
                  />
                </div>
              ) : (
                <TextInput
                  id="password"
                  required
                  type="password"
                  onChange={props.handleChange}
                  value={props.values.password}
                />
              )}
            </div>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
