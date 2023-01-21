import {
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ThemeColorModeComponents } from "@simplimods/theme";
import React from "react";

interface ImageUploadWithPreviewProps {
  selectedImageUrl: string;
  onUploadChange: (event: { target: HTMLInputElement }) => void;
  onDeleteClick: React.Dispatch<React.SetStateAction<string>>;
  size?: number;
  onUploadSubmit?: (imageSrc: string) => Promise<void>;
  isCircular?: boolean;
  isLoading?: boolean;
}

export const ImageUploadWithPreview = ({
  selectedImageUrl,
  onUploadChange,
  onUploadSubmit,
  onDeleteClick,
  size,
  isCircular = false,
  isLoading = false,
}: ImageUploadWithPreviewProps) => {
  return (
    <VStack width="full">
      <Flex
        width={isCircular ? 48 : "full"}
        justifyContent="center"
        alignItems="center"
        border="1px"
        borderColor={ThemeColorModeComponents("borderColor")}
        minHeight={isCircular ? 48 : size ?? 48}
        bg={ThemeColorModeComponents("accentThemeBg")}
        _hover={{
          opacity: selectedImageUrl ? 1 : 0.7,
        }}
        rounded={isCircular ? "full" : "lg"}
        position="relative"
        overflow="hidden"
      >
        {selectedImageUrl ? (
          <Image
            loading="lazy"
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
          <Button
            flex={1}
            variant="solid"
            onClick={() => onDeleteClick("")}
            disabled={isLoading}
          >
            Delete
          </Button>
          <Button
            flex={1}
            variant="solid"
            onClick={() =>
              onUploadSubmit ? onUploadSubmit(selectedImageUrl) : undefined
            }
            isLoading={isLoading}
          >
            Upload
          </Button>
        </HStack>
      )}
    </VStack>
  );
};

export default ImageUploadWithPreview;
