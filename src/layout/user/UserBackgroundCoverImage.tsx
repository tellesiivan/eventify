import { Box, Button, Icon, Image, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { Modal } from "../../components/shared";

interface UserBackgroundCoverImageProps {}

export const UserBackgroundCoverImage = (
  props: UserBackgroundCoverImageProps
) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const imageSrc =
    "https://images.unsplash.com/photo-1624912150907-b85b9b6547c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1224&q=80";

  return (
    <>
      <Box width="full" height={48} position="relative">
        <Image
          src={imageSrc}
          position="absolute"
          top={0}
          objectFit="cover"
          objectPosition="center"
          height="full"
          width="full"
          bgImage="cover"
        />
        <Button
          variant="iconButton"
          position="absolute"
          bottom={4}
          right={4}
          onClick={() => onOpen()}
        >
          <Icon as={HiOutlinePencil} />
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} title="Upload Image">
        <></>
      </Modal>
    </>
  );
};

export default UserBackgroundCoverImage;
