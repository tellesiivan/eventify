import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ErrorMessage, Formik, FormikProps } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PressableNoticeText } from "@simplimods/components/shared";
import { auth } from "@simplimods/firebase";
import {
  addAuthUser,
  authIsLoading,
  useAppDispatch,
  useAppSelector,
} from "@simplimods/redux";
import { loginInSchema } from "@simplimods/schemas";
import { ThemeColorModeComponents } from "@simplimods/theme";

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
  const logginUserInLoadingState = useAppSelector(
    (state) => state.auth.isAuthLoading
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  const initialValues: InitialValues = {
    email: "",
    password: "",
  };

  const onSubmitHandler = async (values: InitialValues) => {
    const { email, password } = values;
    try {
      dispatch(authIsLoading(true));
      setIsLoading(true);
      const loginUser = await signInWithEmailAndPassword(auth, email, password);

      if (!loginUser) throw new Error("Not able to login user");

      const userName = loginUser.user.displayName;
      const userEmail = loginUser.user.email;
      const userUid = loginUser.user.displayName;

      if (userName && userEmail) {
        dispatch(
          addAuthUser({
            email: userEmail,
            userName,
          })
        );
        navigate(`/${userName}`, { replace: true });
      }
    } catch (error: any) {
      console.log(error.code);
      setIsError(GetAuthErrorMessage(error.code));
    } finally {
      setIsLoading(false);
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
          } = props;

          return (
            <VStack spacing={6}>
              <FormControl>
                <FormLabel htmlFor="email" variant="base">
                  Email Address
                </FormLabel>
                <Input
                  width="full"
                  autoFocus={false}
                  variant="v1"
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
                <FormLabel htmlFor="password" variant="base">
                  Password
                </FormLabel>
                <Input
                  variant="v1"
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
              {isError && (
                <Box p={6} bg="red.100" w="full" rounded="md">
                  <Text color="red.900" fontSize="xs" textAlign="center">
                    {isError}
                  </Text>
                </Box>
              )}

              <Box width="full" pt={2}>
                <Button
                  isLoading={isLoading}
                  disabled={!(isValid || isLoading || isError)}
                  type="submit"
                  onClick={() => handleSubmit()}
                  variant="secondary"
                  width="full"
                >
                  Login
                </Button>
              </Box>
            </VStack>
          );
        }}
      </Formik>
      <PressableNoticeText
        link="/auth/signup"
        textContent="Don't have an account? Sign up"
        textAlign="center"
        py="4"
        color={ThemeColorModeComponents("reverseBaseBg")}
      />
    </Box>
  );
}

const GetAuthErrorMessage = (error: string) => {
  switch (error) {
    case (error = "auth/wrong-password"):
      return "Incorrect Password";
    case (error = "auth/user-not-found"):
      return "Please double check your email";
    default:
      return "Unable to login, please try again later.";
  }
};
