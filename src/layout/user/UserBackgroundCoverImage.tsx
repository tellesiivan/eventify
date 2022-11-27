import { Box, Button, Image, useDisclosure } from "@chakra-ui/react";
import React from "react";
import {
  Icon,
  ImageUploadWithPreview,
  Modal,
  Skeleton,
} from "../../components/shared";
import { useSelectFile } from "../../hooks";

interface UserBackgroundCoverImageProps {
  canManage: boolean;
  isLoading: boolean;
  imageSrc: string | undefined;
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
        height={60}
        position="relative"
        overflow="hidden"
        rounded="sm"
      >
        <Image
          src={
            imageSrc
              ? imageSrc
              : "https://images.unsplash.com/photo-1605906457463-5eb60f753738?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1330&q=80"
          }
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
        <ImageUploadWithPreview
          selectedImageUrl={selectedFile}
          onDeleteClick={setSelectedFile}
          onUploadChange={onSelectedFile}
        />
      </Modal>
    </>
  );
};

export default UserBackgroundCoverImage;
