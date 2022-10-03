import { ButtonWithIcon } from "../components/shared";
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
import { FcGoogle } from "react-icons/fc";

import { ErrorMessage, Form, Formik, FormikProps } from "formik";

type InitialValues = {
  email: string;
  password: string;
  verifyPassword: string;
};

export default function SignUpForm() {
  const initialValues: InitialValues = {
    email: "",
    password: "",
    verifyPassword: "",
  };

  return (
    <Box width="full">
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
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
              <ButtonWithIcon
                onSubmit={() => console.log("SignUpForm submit")}
                Text="Sign up with Google"
                Icon={<FcGoogle />}
                isLoading={false}
              />
              <Box width="full" height="0.25" bg="primary.200" rounded="full" />
              <Form className="w-full">
                <VStack spacing={4} align="flex-start">
                  <FormControl>
                    <FormLabel htmlFor="email" fontSize="xs" color="white">
                      Email Address
                    </FormLabel>
                    <Input
                      id="email"
                      rounded="xl"
                      name="email"
                      color="white"
                      type="email"
                      bg="primary.600"
                      variant="ghost"
                      placeholder="Your email..."
                      _placeholder={{
                        opacity: 1,
                        color: "gray.500",
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
                      rounded="xl"
                      id="password"
                      color="white"
                      name="password"
                      bg="primary.600"
                      type="password"
                      variant="ghost"
                      placeholder="Password..."
                      _placeholder={{
                        opacity: 1,
                        color: "gray.500",
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
                      rounded="xl"
                      id="verifyPassword"
                      color="white"
                      name="verifyPassword"
                      bg="primary.600"
                      type="password"
                      variant="ghost"
                      placeholder="Verify Password..."
                      _placeholder={{
                        opacity: 1,
                        color: "gray.500",
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
                      disabled={!(isValid && dirty)}
                      type="submit"
                      bg="razz.600"
                      onClick={() => handleSubmit()}
                      color="white"
                      width="full"
                      _hover={{ bg: "razz.500" }}
                      rounded="xl"
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
