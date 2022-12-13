import React from "react";

import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Image,
  Input,
  Link,
  Spinner,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { ThemeColorModeComponents } from "@simplimods/theme";

import { ThemeToggler } from "@simplimods/components/shared";
import { auth } from "@simplimods/firebase";
import {
  resetAuthState,
  useAppDispatch,
  useAppSelector,
} from "@simplimods/redux";
import { signOut } from "firebase/auth";
import { Link as ReachLink, Outlet, useNavigate } from "react-router-dom";

type Props = {};

const BaseNav = (props: Props) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuthLoading = useAppSelector((state) => state.auth.isAuthLoading);
  const authUser = useAppSelector((state) => state.auth.user.email);

  const dispatch = useAppDispatch();

  type NavLink = {
    label: string;
    link: string;
  };

  const navLinks: NavLink[] = [
    {
      label: "Login",
      link: "/auth/login",
    },
    {
      label: "Sign Up",
      link: "/auth/signup",
    },
    {
      label: "Events",
      link: "/events",
    },
  ];

  const logout = () => {
    signOut(auth);
    dispatch(resetAuthState());
    navigate("/home");
    onClose();
  };
  const bg = useColorModeValue("secondary.900", "secondary.900");

  return (
    <>
      <Box
        zIndex="sticky"
        as="header"
        height={14}
        width="full"
        bg={bg}
        position="fixed"
        top="0"
        borderBottom="1px"
        borderColor={ThemeColorModeComponents("borderColor")}
      >
        <HStack
          as="div"
          px={4}
          height="full"
          width="full"
          aria-label="Top"
          alignItems="center"
          justifyContent="space-between"
        >
          <Image
            h={8}
            w={8}
            src="https://www.simplimods.app/_next/image?url=%2Flogo-512.png&w=48&q=75"
          />
          <Flex alignItems="center" justifyItems="center" gap={3}>
            {isAuthLoading ? (
              <Spinner size="md" color="wzp.500" />
            ) : authUser ? (
              <>
                <ThemeToggler />
                <Avatar
                  name={authUser}
                  size="sm"
                  bg="wzy.400"
                  color="secondary.900"
                  cursor="pointer"
                  // src={user.picture}
                  onClick={onOpen}
                />
              </>
            ) : (
              <HStack spacing={4} alignItems="center">
                {navLinks.map((navLink: NavLink) => (
                  <Link
                    as={ReachLink}
                    key={navLink.label}
                    to={navLink.link}
                    variant="nav"
                  >
                    {navLink.label}
                  </Link>
                ))}
              </HStack>
            )}
          </Flex>
        </HStack>
      </Box>
      <Box width="full" height="full" pt={14}>
        <Outlet />
      </Box>

      {/* Will handle navigation + auth and quick profile settings */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bg}>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." variant="base" />
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="primary"
              mr={3}
              onClick={logout}
              color="white"
              rounded="full"
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              rounded="full"
              onClick={() => {
                onClose();
                navigate("/manage");
              }}
            >
              manage
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default BaseNav;
