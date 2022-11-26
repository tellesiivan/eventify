import { Box, Button, Image, useDisclosure } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Icon, ImageUploadWithPreview, Modal } from "../../components/shared";
import { useSelectFile } from "../../hooks";

interface UserBackgroundCoverImageProps {
  canManage: boolean;
}

export const UserBackgroundCoverImage = ({
  canManage = false,
}: UserBackgroundCoverImageProps) => {
  const { selectedFile, setSelectedFile, onSelectedFile } = useSelectFile();

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
        {canManage && (
          <Button
            variant="iconButton"
            position="absolute"
            bottom={4}
            right={4}
            onClick={() => onOpen()}
          >
            <Icon iconName="EditPencil" />
          </Button>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} title="Update cover image">
        {useMemo(
          () => (
            <ImageUploadWithPreview
              selectedImageUrl={selectedFile}
              onDeleteClick={setSelectedFile}
              onUploadChange={onSelectedFile}
            />
          ),
          [onSelectedFile, selectedFile, setSelectedFile]
        )}
      </Modal>
    </>
  );
};

export default UserBackgroundCoverImage;
