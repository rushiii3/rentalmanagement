import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { LeaseServer } from "../../../server";
import toast from "react-hot-toast";
const RemoveDeleteModal = ({ type,message,id }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const handleSubmit = async(action,action_id) => {

        console.log(action);
        const toastId = toast.loading('Registeringg...');

        const {data} = await axios.put(`${LeaseServer}/delete-terminate`,{action,action_id});
        if(data.success){

        }
    }
  return (
    <>
      <Button onPress={onOpen} color="danger">{type}</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        classNames={{
          closeButton: "hidden",
        }}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="p-4" >
                <div class="bg-white rounded-lg">
                  <div class="md:flex items-center">
                    <div class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                      <i class="bx bx-error text-3xl">&#9888;</i>
                    </div>
                    <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                      <p class="font-bold">Warning!</p>
                      <p class="text-sm text-gray-700 mt-1">
                        {message}
                      </p>
                    </div>
                  </div>
                  <div class="text-center md:text-right mt-4 md:flex md:justify-end">
                    <Button
                    onClick={() => (handleSubmit(type,id))}
                      class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                    >
                      {type}
                    </Button>
                    <Button
                      color="default"
                      variant="light"
                      onPress={onClose}
                      
                      class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RemoveDeleteModal;
