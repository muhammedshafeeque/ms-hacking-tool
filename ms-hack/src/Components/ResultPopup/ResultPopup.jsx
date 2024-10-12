import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function ResultPopup({ response }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState("xl");

  useEffect(() => {
    if (response) {
      onOpen();
    }
  }, [response]);

  return (
    <>
      {/* Modal Component */}
      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          {/* Dynamic Modal Header */}
          <ModalHeader>{response?.error ? "Error" : "Result"}</ModalHeader>
          <ModalCloseButton />
          {/* Dynamic Modal Body */}
          <ModalBody dangerouslySetInnerHTML={{ __html: response }} />
          {/* Modal Footer with Close Button */}
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ResultPopup;
