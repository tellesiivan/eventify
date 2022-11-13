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
  useColorModeValue,
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

  const bg = useColorModeValue("primary.100", "secondary.200");

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
        rounded="2xl"
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
                bg="black"
                color="primary.600"
                cursor="pointer"
                onClick={onOpen}
              />
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
        <DrawerContent bg="primary.600">
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
