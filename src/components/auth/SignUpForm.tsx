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

import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import { useAddUserMutation } from "../../redux/api/authApi";
import { useAppDispatch } from "../../redux/reduxHooks";
import { addAuthUser } from "../../redux/slices/authSlice";
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

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const initialValues: InitialValues = {
    email: "",
    password: "",
    verifyPassword: "",
  };

  const [addUser, { isError, isLoading }] = useAddUserMutation();

  const signupHandler = async (values: InitialValues) => {
    const username = ExtractNameFromEmail({
      email: values.email,
    });
    try {
      await createUserWithEmailAndPassword(values.email, values.password);
      if (error) throw new Error("Not able to create user");
      await addUser({
        email: values.email,
        username,
      });

      dispatch(
        addAuthUser({
          userName: username,
          email: values.email,
        })
      );
      !isError && navigate(`/${username}`);
    } catch (error: string | any) {
      console.log(error.message);
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
                  isLoading={isLoading || loading}
                  disabled={!(isValid && dirty)}
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
