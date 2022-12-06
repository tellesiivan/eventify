import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { ThemeColorModeComponents } from "@simplimods/theme";

interface SharedModalProps {
  title: string;
  isOpen: boolean;
  showCloseButton?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const SharedModal = ({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = false,
}: SharedModalProps) => {
  return (
    <Modal
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent bg={ThemeColorModeComponents("baseBg")} rounded="lg">
        <ModalHeader pb={0} fontSize="medium">
          {title}
        </ModalHeader>
        <ModalCloseButton rounded="full" />
        <ModalBody py={4}>{children}</ModalBody>

        {showCloseButton && (
          <ModalFooter>
            <Button variant="secondary">Close</Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SharedModal;
