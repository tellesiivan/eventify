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
  Spinner,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import ThemeColorModeComponents from "../theme/ThemeColorModeComponents";

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
  const bg = useColorModeValue("secondary.900", "secondary.800");

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
          <Flex alignItems="center" gap={3}>
            <ThemeToggler />
            {isAuthLoading || loading ? (
              <Spinner size="md" color="wzp.500" />
            ) : user ? (
              <Avatar
                name="Wes"
                size="sm"
                bg="pink.600"
                cursor="pointer"
                onClick={onOpen}
              />
            ) : (
              <Avatar size="sm" bg="green.200" cursor="pointer" />
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
