import { Box, Img, Input, useDisclosure } from "@chakra-ui/react";
import { ImageUploadWithPreview, Modal } from "@simplimods/components";
import { useSelectFile } from "@simplimods/hooks";
import {
  selectCurrentAuthUserUid,
  useAppSelector,
  useUploadProfileAvatarImageMutation,
} from "@simplimods/redux";
import React, { useEffect, useRef } from "react";

interface ProfileAvatarUploadProps {
  userAvatar: string | null;
}

export const ProfileAvatarUpload = ({
  userAvatar,
}: ProfileAvatarUploadProps) => {
  const avatarUploadRefBtn = useRef<HTMLInputElement>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { selectedFile, setSelectedFile, onSelectedFile } = useSelectFile();

  // Selectors
  const userUid = useAppSelector(selectCurrentAuthUserUid);

  // RTK: Upload Profile avatar image
  const [uploadAvatarImage, { isLoading }] =
    useUploadProfileAvatarImageMutation();

  // TODO: Fix bug when deleting an uploaded image and re-uploading the same image previously uploaded does not show
  const onDeleteImageHandler = () => {
    setSelectedFile("");
    onClose();
  };

  useEffect(() => {
    if (selectedFile !== "") {
      onOpen();
    }
  }, [onOpen, selectedFile]);

  const handleUserProfileAvatarUpload = async () => {
    try {
      if (userUid) {
        await uploadAvatarImage({
          userUid,
          imageDataUrl: selectedFile,
        });
      }
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      {userAvatar ? (
        <Img
          src={userAvatar}
          h={24}
          w={24}
          rounded="full"
          loading="lazy"
          _hover={{
            opacity: 0.76,
          }}
          cursor="pointer"
          onClick={() => avatarUploadRefBtn.current?.click()}
        />
      ) : (
        <Box
          h={24}
          w={24}
          _hover={{
            opacity: 0.76,
          }}
          cursor="pointer"
          bgGradient="linear(to-l, wzp.800, wzp.400)"
          rounded="full"
          onClick={() => avatarUploadRefBtn.current?.click()}
        />
      )}
      <Input
        onChange={(event) => onSelectedFile(event)}
        hidden
        ref={avatarUploadRefBtn}
        accept="image/png, image/jpeg"
        cursor="pointer"
        type="file"
        w="full"
      />
      <Modal isOpen={isOpen} onClose={onClose} title="Update your avatar">
        <ImageUploadWithPreview
          onUploadSubmit={handleUserProfileAvatarUpload}
          selectedImageUrl={selectedFile}
          onDeleteClick={onDeleteImageHandler}
          onUploadChange={onSelectedFile}
          isCircular={true}
          isLoading={isLoading}
        />
      </Modal>
    </React.Fragment>
  );
};

export default ProfileAvatarUpload;
