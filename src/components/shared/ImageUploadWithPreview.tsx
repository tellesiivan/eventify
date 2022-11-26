import {
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import ThemeColorModeComponents from "../../theme/ThemeColorModeComponents";

interface ImageUploadWithPreviewProps {
  selectedImageUrl: string;
  onUploadChange: (event: { target: HTMLInputElement }) => void;
  onDeleteClick: React.Dispatch<React.SetStateAction<string>>;
  size?: number;
}

export const ImageUploadWithPreview = ({
  selectedImageUrl,
  onUploadChange,
  onDeleteClick,
  size,
}: ImageUploadWithPreviewProps) => {
  return (
    <VStack width="full">
      <Flex
        width="full"
        justifyContent="center"
        alignItems="center"
        border="1px"
        borderColor={ThemeColorModeComponents("borderColor")}
        minHeight={size ?? 48}
        bg={ThemeColorModeComponents("accentThemeBg")}
        _hover={{
          opacity: selectedImageUrl ? 1 : 0.7,
        }}
        rounded="lg"
        position="relative"
        overflow="hidden"
      >
        {selectedImageUrl ? (
          <Image
            src={selectedImageUrl}
            position="absolute"
            top={0}
            objectFit="cover"
            objectPosition="center"
            height="full"
            width="full"
            bgImage="cover"
          />
        ) : (
          <>
            <Input
              accept="image/png, image/jpeg"
              cursor="pointer"
              type="file"
              h={size ?? 48}
              w="full"
              position="absolute"
              bg="red.200"
              opacity={0}
              onChange={(event) => onUploadChange(event)}
            />
            <Text variant="s1">Upload Image</Text>
          </>
        )}
      </Flex>
      {selectedImageUrl && (
        <HStack width="full" spacing={2} pt={4}>
          <Button flex={1} variant="solid" onClick={() => onDeleteClick("")}>
            Delete
          </Button>
          <Button flex={1} variant="solid">
            Upload
          </Button>
        </HStack>
      )}
    </VStack>
  );
};

export default ImageUploadWithPreview;
