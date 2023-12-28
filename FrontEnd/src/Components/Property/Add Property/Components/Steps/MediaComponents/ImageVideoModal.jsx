import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Player } from "react-tuby";
const ImageVideoModal = ({ModelOpen,setModelOpen,ModalViewer}) => {

    const handleModal = () => {
        setModelOpen(false);
    }
    console.log(ModalViewer);
  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal
        isOpen={ModelOpen}
        size="lg"
        placement="center"
        classNames={{
          body: "p-0",
          closeButton: "bg-white z-10",
        }}
        onClose={handleModal}
      >
        <ModalContent>
          {
          (onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">Preview</ModalHeader> */}
              <ModalBody>
                {
                    ModalViewer ? (
                        ModalViewer.type === "image" ? (<img class="h-auto max-w-full" src={ModalViewer.url} alt="image description" />) : (<div className="aspect-video">
                        <Player
                          className="h-full w-full max-w-full object-cover rounded-xl"
                          src={ModalViewer.url}
                          dimensions={{ width: "100%", height: "100%" }}
                        />
                      </div>)
                    ) : ""
                }
                {/*  */}
                
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageVideoModal;
