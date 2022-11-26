import { Box, Button, Image, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Icon, Modal } from "../../components/shared";

interface UserBackgroundCoverImageProps {}

export const UserBackgroundCoverImage = (
  props: UserBackgroundCoverImageProps
) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const imageSrc =
    "https://momo.com/wp-contents/uploads/2019/07/momo-midnight-purple-bmw-e36-m3-momo-6-spoke-heritage-classic-sports-car-wheels-silver-rims-d.jpg";

  return (
    <>
      <Box width="full" height={60} position="relative">
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
          <Icon iconName="EditPencil" />
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} title="Upload Image">
        <></>
      </Modal>
    </>
  );
};

export default UserBackgroundCoverImage;
