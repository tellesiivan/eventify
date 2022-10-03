import * as Yup from "yup";

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email address")
    .required("Required"),
  password: Yup.string().required("Required"),
});
