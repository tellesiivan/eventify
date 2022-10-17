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
  password: Yup.string()
    .required("Please enter your password")
    .matches(
      /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 6 characters, one uppercase, one number and one special case character"
    ),
  verifyPassword: Yup.string()
    .required("Please verify your password")
    .when("password", {
      is: (password: string | any[]) =>
        password && password.length > 0 ? true : false,
      then: Yup.string().oneOf([Yup.ref("password")], "Password doesn't match"),
    }),
});
