import { Box, Flex, Image, useDisclosure } from "@chakra-ui/react";
import React from "react";

import { ImageUploadWithPreview, Modal } from "@simplimods/components";
import { useSelectFile } from "@simplimods/hooks";
import { ProfileAvatarUpload } from "@simplimods/layout";
import { ThemeColorModeComponents } from "@simplimods/theme";
import {
  selectCurrentAuthUserUid,
  useAppSelector,
  useUploadProfileCoverImageMutation,
} from "@simplimods/redux";

interface UserBackgroundCoverImageProps {
  canManage: boolean;
  imageSrc: string | null;
  avatarImgSrc: string | null;
}

export const UserBackgroundCoverImage = ({
  imageSrc,
  avatarImgSrc,
}: UserBackgroundCoverImageProps) => {
  const { selectedFile, setSelectedFile, onSelectedFile } = useSelectFile();
  const { isOpen, onClose, onOpen } = useDisclosure();
  // selectors
  const userUid = useAppSelector(selectCurrentAuthUserUid);

  const [uploadProfileCoverImage, { isLoading }] =
    useUploadProfileCoverImageMutation();
  const uploadBackgroundCoverImageHandler = async (imageSrc: string) => {
    try {
      await uploadProfileCoverImage({
        userUid: userUid ?? "",
        imageDataUrl: imageSrc,
      });
      setSelectedFile("");
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Box
        zIndex={1}
        width="full"
        height={{
          base: 48,
          lg: 60,
        }}
        position="relative"
      >
        {imageSrc ? (
          <Image
            onClick={() => onOpen()}
            _hover={{
              opacity: 0.76,
            }}
            height={{
              base: 48,
              lg: 60,
            }}
            width="full"
            cursor="pointer"
            alt={`Profile image cover`}
            src={imageSrc}
            objectFit="cover"
            objectPosition="center"
          />
        ) : (
          <Box
            onClick={() => onOpen()}
            _hover={{
              opacity: 0.76,
            }}
            cursor="pointer"
            position="absolute"
            h="full"
            bgGradient="linear(to-l, wzp.900, wzp.600)"
            rounded="md"
            inset={0}
          />
        )}
        <Flex
          backgroundColor={ThemeColorModeComponents("accentThemeBg")}
          position="absolute"
          left={6}
          bottom={-10}
          rounded="full"
          justifyContent="center"
          padding={1}
          zIndex={10}
          alignItems="center"
        >
          <ProfileAvatarUpload userAvatar={avatarImgSrc} />
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} title="Update cover image">
        <ImageUploadWithPreview
          isLoading={isLoading}
          selectedImageUrl={selectedFile}
          onDeleteClick={setSelectedFile}
          onUploadChange={onSelectedFile}
          onUploadSubmit={uploadBackgroundCoverImageHandler}
        />
      </Modal>
    </>
  );
};

export default UserBackgroundCoverImage;
