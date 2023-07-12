import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Button, Label, TextInput, Checkbox } from "flowbite-react";

export default function LoginPage() {
  const createSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be 6 characters at minimum")
      .required("Password is required"),
  });
  const handleSubmit = () => {};
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
        
        <Form className="flex max-w-md flex-col gap-4 w-96 px-7 py-24 border">
          <div>
            <h1 className=" font-bold">Sign in</h1>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              placeholder="name@flowbite.com"
              required
              type="email"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput id="password1" required type="password" />
          </div>
          <Button type="submit">Submit</Button>
        </Form>
      </Formik>
    </div>
  );
}
