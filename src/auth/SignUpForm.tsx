import { SignUpSchema } from "../schemas/index";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

import { ErrorMessage, Form, Formik, FormikProps } from "formik";

import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";
import { useAddUserMutation } from "../redux/api/authApi";
import { ExtractNameFromEmail } from "../utils";

type InitialValues = {
  email: string;
  password: string;
  verifyPassword: string;
};

export default function SignUpForm() {
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
      await addUser({
        email: values.email,
        username,
      });
      !isError && navigate(`/${username}`);
    } catch (error) {
      console.log(error);
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
            <VStack spacing={6}>
              <Form className="w-full">
                <VStack spacing={4} align="flex-start">
                  <FormControl>
                    <FormLabel htmlFor="email" fontSize="xs" color="white">
                      Email Address
                    </FormLabel>
                    <Input
                      id="email"
                      rounded="lg"
                      name="email"
                      py={6}
                      color="white"
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
                      rounded="lg"
                      id="password"
                      color="white"
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
                    {errors.password && touched.password && (
                      <Text color="red.500" pt={1} ml={2} fontSize="sm">
                        <ErrorMessage name="password" />
                      </Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      htmlFor="verifyPassword"
                      fontSize="xs"
                      color="white"
                    >
                      Verify Password
                    </FormLabel>
                    <Input
                      rounded="lg"
                      id="verifyPassword"
                      color="white"
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
                    {errors.verifyPassword && touched.verifyPassword && (
                      <Text color="red.500" pt={1} ml={2} fontSize="sm">
                        <ErrorMessage name="verifyPassword" />
                      </Text>
                    )}
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
              </Form>
            </VStack>
          );
        }}
      </Formik>
    </Box>
  );
}
