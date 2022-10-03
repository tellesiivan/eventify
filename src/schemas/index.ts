import * as Yup from "yup";

export const loginInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email address")
    .required("Required"),
  password: Yup.string().required("Required"),
});

export const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email address")
    .required("Required"),
  password: Yup.string().required("This field is required"),
  verifyPassword: Yup.string()
    .required("This field is required")
    .when("password", {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      ),
    }),
});
