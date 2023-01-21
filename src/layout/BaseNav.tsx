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
  SkeletonText,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { ThemeToggler } from "@simplimods/components/shared";
import { auth } from "@simplimods/firebase";
import {
  resetAuthState,
  selectCurrentAuthUser,
  useAppDispatch,
  useAppSelector,
  useGetUserPublicProfileQuery,
} from "@simplimods/redux";
import { signOut } from "firebase/auth";
import { Link as ReachLink, Outlet, useNavigate } from "react-router-dom";

type Props = {};

const BaseNav = (props: Props) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuthLoading = useAppSelector((state) => state.auth.isAuthLoading);
  const authUser = useAppSelector(selectCurrentAuthUser);

  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetUserPublicProfileQuery({
    uid: authUser.uid ?? "",
  });

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

  const logoutHandler = async () => {
    await signOut(auth);
    dispatch(resetAuthState());
    navigate("/home");
    onClose();
  };
  const bg = useColorModeValue("secondary.800", "secondary.800");
  const borderColor = useColorModeValue("transparent", "secondary.700");

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
        borderColor={borderColor}
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
            {isAuthLoading || isLoading ? (
              <SkeletonText />
            ) : authUser ? (
              <>
                <ThemeToggler />
                <Avatar
                  name={authUser.userName}
                  size="sm"
                  bg="wzp.400"
                  color="primary.50"
                  cursor="pointer"
                  src={data?.avatarImageSrc ?? undefined}
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

      {/* TODO: Will handle navigation + auth and quick profile settings */}
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
              onClick={logoutHandler}
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
