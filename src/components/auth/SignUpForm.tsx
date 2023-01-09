import React, { useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";

import { ErrorMessage, Formik, FormikProps } from "formik";

import { PressableNoticeText } from "@simplimods/components";
import { auth } from "@simplimods/firebase";
import {
  addAuthUser,
  authIsLoading,
  selectAuthLoading,
  useAddUserMutation,
  useAppDispatch,
  useAppSelector,
} from "@simplimods/redux";
import { SignUpSchema } from "@simplimods/schemas";
import { ThemeColorModeComponents } from "@simplimods/theme";
import {
  ExtractNameFromEmail,
  InitialAdminProfileConfig,
  InitialPublicProfileConfig,
  InitialSettingsConfig,
} from "@simplimods/utils";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserPublicProfile } from "@simplimods/types";

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
  const [showPassword, setShowPassWord] = useState<boolean>(false);
  const [showVerifyPassword, setShowVerifyPassWord] = useState<boolean>(false);
  const loginUserInLoadingState = useAppSelector(selectAuthLoading);

  // RTK
  const [addUserDoc, { isError, isLoading }] = useAddUserMutation();

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

      const {
        email: authEmail,
        displayName: authUserName,
        uid,
      } = registerUser.user;

      if (authUserName && authEmail && uid) {
        // add user defaults(settings, profile etc...)
        const publicProfileData: UserPublicProfile = {
          ...InitialPublicProfileConfig,
          username: authUserName,
          memberSinceTimestamp: Date.now(),
          contactInformation: {
            email: authEmail,
            phoneNumber: null,
          },
        };
        await addUserDoc({
          user: {
            email: authEmail,
            username: authUserName,
            uid,
          },
          settings: InitialSettingsConfig,
          publicProfile: publicProfileData,
          adminProfile: InitialAdminProfileConfig,
        });

        dispatch(
          addAuthUser({
            userName: authUserName,
            email: authEmail,
            uid,
          })
        );
        navigate(`/${authUserName}`);
      } else throw new Error("Unable to login at this time");
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
          const { handleBlur, handleChange, isValid, handleSubmit, values } =
            props;

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
                <InputGroup
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    variant="v1"
                    placeholder="Password..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <InputRightElement width="4.5rem" h="full">
                    <Button
                      variant="unstyled"
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowPassWord((prev) => !prev)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <Text color="red.500" pt={1} ml={2} fontSize="sm">
                  <ErrorMessage name="password" />
                </Text>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="verifyPassword" variant="base">
                  Verify Password
                </FormLabel>
                <InputGroup
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Input
                    id="verifyPassword"
                    name="verifyPassword"
                    type={showVerifyPassword ? "text" : "password"}
                    variant="v1"
                    placeholder="Verify Password..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.verifyPassword}
                  />
                  <InputRightElement width="4.5rem" h="full">
                    <Button
                      variant="unstyled"
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowVerifyPassWord((prev) => !prev)}
                    >
                      {showVerifyPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Text color="red.500" pt={1} ml={2} fontSize="sm">
                  <ErrorMessage name="verifyPassword" />
                </Text>
              </FormControl>

              <Box width="full" pt={2}>
                <Button
                  isLoading={loginUserInLoadingState || isLoading}
                  disabled={!(isValid || loginUserInLoadingState)}
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
        mt={2}
        color={ThemeColorModeComponents("reverseBaseBg")}
      />
    </Box>
  );
}
