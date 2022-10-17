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
  useDisclosure,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { ThemeToggler } from "../components/shared/index";
import { auth } from "../firebase.config";

type Props = {};

const BaseNav = (props: Props) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logout = () => {
    signOut(auth);
    navigate("/auth");
    onClose();
  };

  return (
    <>
      <Box
        as="header"
        height="14"
        m="1%"
        width="98%"
        rounded="xl"
        position="fixed"
        top="0"
        bg="primary.500"
      >
        <nav
          className="h-full px-2 mx-auto max-w-7xl sm:px-4 lg:px-3"
          aria-label="Top"
        >
          <div className="flex items-center justify-between w-full h-full">
            <div>logo</div>
            <Flex alignItems="center" gap={3}>
              <ThemeToggler />
              <Avatar
                name="Wes"
                size="sm"
                bg="yellow"
                color="primary.600"
                cursor="pointer"
                onClick={onOpen}
              />
            </Flex>
          </div>
        </nav>
      </Box>
      <main className="w-full h-screen pt-20">
        <Outlet />
      </main>
      {/* Will handle navigation + auth and quick profile settings */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="secondary.500">
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
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
                navigate("/profile");
              }}
            >
              profile
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default BaseNav;
