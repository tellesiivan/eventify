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

import { PressableNoticeText } from "@simplimods/components";
import { auth } from "@simplimods/firebase";
import {
  addAuthUser,
  authIsLoading,
  useAppDispatch,
  useAppSelector,
} from "@simplimods/redux";
import { SignUpSchema } from "@simplimods/schemas";
import { ThemeColorModeComponents } from "@simplimods/theme";
import { ExtractNameFromEmail } from "@simplimods/utils";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

type InitialValues = {
  email: string;
  password: string;
  verifyPassword: string;
};

export default function SignUpForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initialValues: InitialValues = {
    email: "",
    password: "",
    verifyPassword: "",
  };
  const logginUserInLoadingState = useAppSelector(
    (state) => state.auth.isAuthLoading
  );

  const signupHandler = async (values: InitialValues) => {
    const username = ExtractNameFromEmail({
      email: values.email,
    });
    try {
      dispatch(authIsLoading(true));
      const registerUser = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      await updateProfile(registerUser.user, {
        displayName: username,
      });

      const { email: authEmail, displayName: authUserName } = registerUser.user;

      if (authUserName && authEmail) {
        dispatch(
          addAuthUser({
            userName: authUserName,
            email: authEmail,
          })
        );

        navigate(`/${authUserName}`);
      }
    } catch (error: string | any) {
      console.log(error.message);
    } finally {
      dispatch(authIsLoading(false));
    }
  };

  return (
    <Box width="full">
      <Formik
        isInitialValid={false}
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmit={(values) => signupHandler(values)}
      >
        {(props: FormikProps<any>) => {
          const {
            touched,
            errors,
            handleBlur,
            handleChange,
            isValid,
            handleSubmit,
            values,
            dirty,
          } = props;

          return (
            <VStack spacing={4}>
              <FormControl>
                <FormLabel htmlFor="email" variant="base">
                  Email Address
                </FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  variant="v1"
                  placeholder="Your email..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />

                <Text color="red.500" pt={1} ml={2} fontSize="sm">
                  <ErrorMessage name="email" />
                </Text>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password" variant="base">
                  Password
                </FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  variant="v1"
                  placeholder="Password..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />

                <Text color="red.500" pt={1} ml={2} fontSize="sm">
                  <ErrorMessage name="password" />
                </Text>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="verifyPassword" variant="base">
                  Verify Password
                </FormLabel>
                <Input
                  id="verifyPassword"
                  name="verifyPassword"
                  type="password"
                  variant="v1"
                  placeholder="Verify Password..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.verifyPassword}
                />

                <Text color="red.500" pt={1} ml={2} fontSize="sm">
                  <ErrorMessage name="verifyPassword" />
                </Text>
              </FormControl>

              <Box width="full" pt={2}>
                <Button
                  isLoading={logginUserInLoadingState}
                  disabled={!(isValid || logginUserInLoadingState)}
                  type="submit"
                  onClick={() => handleSubmit()}
                  variant="secondary"
                  width="full"
                >
                  Sign up
                </Button>
              </Box>
            </VStack>
          );
        }}
      </Formik>
      <PressableNoticeText
        link="/auth/login"
        textContent="Already have an account? Login"
        textAlign="center"
        py="4"
        color={ThemeColorModeComponents("reverseBaseBg")}
      />
    </Box>
  );
}
