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
  Input,
  Spinner,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { ThemeToggler } from "../components/shared/index";
import { auth } from "../firebase.config";
import { useAppSelector } from "../redux/reduxHooks";

type Props = {};

const BaseNav = (props: Props) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuthLoading = useAppSelector((state) => state.auth.isAuthLoading);
  const [user, loading] = useAuthState(auth);

  const logout = () => {
    signOut(auth);
    navigate("/auth");
    onClose();
  };
  const bg = useColorModeValue("primary.500", "secondary.400");
  const borderColor = useColorModeValue("primary.800", "secondary.300");

  return (
    <>
      <Box
        as="header"
        height={16}
        m="1%"
        width="98%"
        bg={bg}
        position="fixed"
        top="0"
        border="1px"
        borderColor={borderColor}
        rounded="2xl"
      >
        <nav className="h-full px-2 mx-auto md:px-4" aria-label="Top">
          <div className="flex items-center justify-between w-full h-full">
            <div>logo</div>
            <Flex alignItems="center" gap={3}>
              <ThemeToggler />
              {isAuthLoading || loading ? (
                <Spinner size="md" color="wzp.500" />
              ) : user ? (
                <Avatar
                  name="Wes"
                  size="sm"
                  bg="yellow.500"
                  cursor="pointer"
                  onClick={onOpen}
                />
              ) : (
                <Avatar size="sm" bg="green.200" cursor="pointer" />
              )}
            </Flex>
          </div>
        </nav>
      </Box>
      <main className="w-full h-screen pt-16">
        <Outlet />
      </main>
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
