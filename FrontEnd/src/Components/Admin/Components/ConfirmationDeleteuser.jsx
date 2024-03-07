import React from 'react'
import {
    Modal,
    ModalContent,
    ModalBody,
    Button,
    useDisclosure,
  } from "@nextui-org/react";
  import { MdOutlineDelete } from "react-icons/md";
import axios from 'axios';
import { AdminServer, userServer } from '../../../server';

const ConfirmationDeleteuser = ({id,type}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    console.log(id,type);
    const handleClick = async(user_type,user_id) => {
        console.log(user_id);
        console.log("User typee",user_type);
        const server = user_type==="admin" ? AdminServer : user_type==="user" ? userServer : null;
        try {
            const {data} = await axios.delete(`${server}/delete-${user_type}/${user_id}`);
            if (data.success) {
                console.log("deleted successfully");
                window.location.reload();
            }
        } catch (error) {
            
        }
    }
  return (
    <>
    <button type="button"  onClick={onOpen}>
        <MdOutlineDelete />
    </button>
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
                    Are you sure you want to delete this user? This action cannot be undone.
                    </p>
                  </div>
                </div>
                <div class="text-center md:text-right mt-4 md:flex md:justify-end">
                  <Button
                  onClick={() => (handleClick(type,id))}
                    class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                  >
                    Delete
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
  )
}

export default ConfirmationDeleteuser