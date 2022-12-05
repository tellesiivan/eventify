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

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { addAuthUser, authIsLoading } from "../../redux/slices/authSlice";
import { SignUpSchema } from "../../schemas";
import ThemeColorModeComponents from "../../theme/ThemeColorModeComponents";
import { ExtractNameFromEmail } from "../../utils";
import { PressableNoticeText } from "../shared";

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
                <FormLabel htmlFor="email" fontSize="xs" color="white">
                  Email Address
                </FormLabel>
                <Input
                  id="email"
                  name="email"
                  py={6}
                  color="seconday.200"
                  type="email"
                  bg="primary.600"
                  variant="ghost"
                  placeholder="Your email..."
                  _placeholder={{
                    opacity: 1,
                    color: "gray.700",
                    fontSize: "xs",
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />

                <Text color="red.500" pt={1} ml={2} fontSize="sm">
                  <ErrorMessage name="email" />
                </Text>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password" fontSize="xs" color="white">
                  Password
                </FormLabel>
                <Input
                  rounded="lg"
                  id="password"
                  color="seconday.200"
                  py={6}
                  name="password"
                  bg="primary.600"
                  type="password"
                  variant="ghost"
                  placeholder="Password..."
                  _placeholder={{
                    opacity: 1,
                    color: "gray.700",
                    fontSize: "xs",
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />

                <Text color="red.500" pt={1} ml={2} fontSize="sm">
                  <ErrorMessage name="password" />
                </Text>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="verifyPassword" fontSize="xs" color="white">
                  Verify Password
                </FormLabel>
                <Input
                  rounded="lg"
                  id="verifyPassword"
                  color="seconday.200"
                  py={6}
                  name="verifyPassword"
                  bg="primary.600"
                  type="password"
                  variant="ghost"
                  placeholder="Verify Password..."
                  _placeholder={{
                    opacity: 1,
                    color: "gray.700",
                    fontSize: "xs",
                  }}
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
                  bg="ichw.600"
                  onClick={() => handleSubmit()}
                  color="primary.600"
                  width="full"
                  _hover={{ bg: "ichw.500" }}
                  rounded="lg"
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
        color={ThemeColorModeComponents("baseBg")}
      />
    </Box>
  );
}
