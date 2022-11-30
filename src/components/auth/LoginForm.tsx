import React from "react";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

import { ErrorMessage, Formik, FormikProps } from "formik";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase.config";
import { useLazyGetUserQuery } from "../../redux/api/authApi";
import { useAppDispatch } from "../../redux/reduxHooks";
import { addAuthUser, authIsLoading } from "../../redux/slices/authSlice";
import { loginInSchema } from "../../schemas";

import { signInWithEmailAndPassword } from "firebase/auth";

type InitialValues = {
  email: string;
  password: string;
};

/**
 * Handles login state and manages user login
 *
 * @export LoginForm
 *
 */
export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [getUser, { isLoading, isError }] = useLazyGetUserQuery();

  const initialValues: InitialValues = {
    email: "",
    password: "",
  };

  const onSubmitHandler = async (values: InitialValues) => {
    const { email, password } = values;
    console.log(email, password);
    try {
      dispatch(authIsLoading(true));
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (!result) throw new Error("Not able to login user");
      const { data } = await getUser({
        by: "email",
        user: email,
      });
      if (!data?.username) throw new Error("Not able to get username");
      dispatch(
        addAuthUser({
          userName: data?.username,
          email,
        })
      );
      navigate(`/${data?.username}`);
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(authIsLoading(false));
    }
  };

  return (
    <Box width="full">
      <Formik
        initialValues={initialValues}
        validationSchema={loginInSchema}
        onSubmit={onSubmitHandler}
      >
        {(props: FormikProps<any>) => {
          const {
            touched,
            errors,
            handleBlur,
            handleChange,
            isValid,
            handleSubmit,
            dirty,
          } = props;

          return (
            <VStack spacing={6}>
              <FormControl>
                <FormLabel htmlFor="email" fontSize="xs" color="white">
                  Email Address
                </FormLabel>
                <Input
                  width="full"
                  autoFocus={false}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={props.values.email}
                />
                {errors.email && touched.email && (
                  <Text color="red.500" pt={1} ml={2} fontSize="sm">
                    <ErrorMessage name="email" />
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password" fontSize="xs" color="white">
                  Password
                </FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={props.values.password}
                />
                {errors.password && touched.password && (
                  <Text color="red.500" pt={1} ml={2} fontSize="sm">
                    <ErrorMessage name="password" />
                  </Text>
                )}
              </FormControl>
              {isError && <Text color="white">ERROR</Text>}
              <Box width="full" pt={2}>
                <Button
                  isLoading={isLoading}
                  disabled={!(isValid && dirty)}
                  type="submit"
                  onClick={() => handleSubmit()}
                  variant="secondary"
                  width="full"
                  rounded="md"
                >
                  Login
                </Button>
              </Box>
            </VStack>
          );
        }}
      </Formik>
      {/* <PressableNoticeText
        link="/auth/signup"
        textContent="Don't have an account? Sign up"
        textAlign="center"
        py="4"
        color={ThemeColorModeComponents("baseBg")}
      /> */}
    </Box>
  );
}
