import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";
import { GiConfirmed } from "react-icons/gi";
const ConfirmModal = ({ amount, month, id }) => {
  console.log(month);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleSubmit = async (amounts, ids) => {
    console.log(amounts);
    console.log(ids);
    // const toastId = toast.loading('Registeringg...');
    // const {data} = await axios.put(`${}/delete-terminate`,{action,action_id});
    // if(data.success){
    // }
  };
  return (
    <>
      <Button onPress={onOpen} color="success" variant="flat">
        Pay Now
      </Button>
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
              <ModalBody className="p-4">
                <div class=" rounded-lg md:max-w-md md:mx-auto  md:relative ">
                  <div class="md:flex items-center">
                    <div class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                      <GiConfirmed className="h-full w-full text-green-500" />
                    </div>
                    <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                      <p class="font-bold">Confirmation!</p>
                      <p class="text-sm text-gray-700 mt-1">
                        You will lose your <b>₹{amount}</b> credits from you
                        account by doing this. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                  <div class="text-center md:text-right mt-4 md:flex md:justify-end">
                    <Button
                      onClick={() => handleSubmit(amount, id)}
                      class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-green-200 text-green-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                    >
                      Confirm
                    </Button>
                    <Button
                      color="default"
                      variant="light"
                      onPress={onClose}
                      class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
                    >
                      Cancel
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

export default ConfirmModal;
