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
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { Outlet, useNavigate } from "react-router-dom";
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
            <div className="ml-10 space-x-2">
              <Avatar
                name="Wes"
                size="sm"
                bg="yellow"
                color="primary.600"
                cursor="pointer"
                onClick={onOpen}
              />
            </div>
          </div>
        </nav>
      </Box>
      <main className="w-full h-[calc(100vh_-_70px)] pt-20">
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
            <Button colorScheme="blue" rounded="full">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default BaseNav;
