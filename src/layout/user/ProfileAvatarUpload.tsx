import { Avatar, Button, HStack, Input, VStack } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useSelectFile } from "../../hooks";

interface ProfileAvatarUploadProps {}

export const ProfileAvatarUpload = (props: ProfileAvatarUploadProps) => {
  const avatarUploadRefBtn = useRef<HTMLInputElement>(null);

  const { selectedFile, setSelectedFile, onSelectedFile } = useSelectFile();
  // TODO: Fix bug when deleting an uploaded image and reuploading the same image previously uploaded does not show
  const onDeleteImageHandler = () => setSelectedFile("");

  return (
    <VStack width="full">
      <Avatar
        bg="wzy.600"
        name="Oshigaki Kisame"
        src={selectedFile && selectedFile}
        size="xl"
      />
      <HStack pt={4}>
        {selectedFile ? (
          <>
            <Button variant="secondary" onClick={onDeleteImageHandler}>
              Delete
            </Button>
            <Button
              variant="secondary"
              onClick={() => avatarUploadRefBtn.current?.click()}
            >
              Upload
            </Button>
          </>
        ) : (
          <Button
            variant="secondary"
            onClick={() => avatarUploadRefBtn.current?.click()}
          >
            Update Image
          </Button>
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
      </HStack>
    </VStack>
  );
};

export default ProfileAvatarUpload;
