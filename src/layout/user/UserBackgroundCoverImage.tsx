import { Box, Button, Image, useDisclosure } from "@chakra-ui/react";
import React from "react";

import {
  Icon,
  ImageUploadWithPreview,
  Modal,
  Skeleton,
} from "@simplimods/components";
import { useSelectFile } from "@simplimods/hooks";

interface UserBackgroundCoverImageProps {
  canManage: boolean;
  isLoading: boolean;
  imageSrc: string | null;
}

export const UserBackgroundCoverImage = ({
  canManage = false,
  isLoading,
  imageSrc,
}: UserBackgroundCoverImageProps) => {
  const { selectedFile, setSelectedFile, onSelectedFile } = useSelectFile();

  const { isOpen, onClose, onOpen } = useDisclosure();

  if (isLoading) {
    return <Skeleton height={60} speed={0.75} />;
  }

  return (
    <>
      <Box
        width="full"
        height={{
          base: 36,
          lg: 60,
        }}
        position="relative"
        overflow="hidden"
      >
        {imageSrc ? (
          <Image
            rounded="md"
            src={imageSrc}
            position="absolute"
            top={0}
            objectFit="cover"
            objectPosition="center"
            height="full"
            width="full"
            bgImage="cover"
          />
        ) : (
          <Box
            position="absolute"
            h="full"
            bgGradient="linear(to-l, wzp.900, wzp.600)"
            rounded="md"
            inset={0}
          />
        )}
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
        <ImageUploadWithPreview
          selectedImageUrl={selectedFile}
          onDeleteClick={setSelectedFile}
          onUploadChange={onSelectedFile}
          onUploadSubmit={() => console.log("Upload")}
        />
      </Modal>
    </>
  );
};

export default UserBackgroundCoverImage;
