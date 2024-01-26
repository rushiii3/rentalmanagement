import React from "react";
import {  Button, } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import "./map.css";
import ScheduleComponent from "./Component/ScheduleComponent";


const Schedule = ({ id, Data, isAddressSet }) => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  return (
    <div>
      <div className="max-w-full h-auto hidden lg:block  p-6 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-zinc-900 dark:border-zinc-900">
        <h1 className="mb-8 text-3xl text-center">Schedule a tour</h1>
        <ScheduleComponent id={id} Data={Data} isAddressSet={isAddressSet}/>
      </div>
      <div class="lg:hidden block fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <Modal size="full" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Schedule a tour
                </ModalHeader>
                <ModalBody>
                  <ScheduleComponent id={id} Data={Data} isAddressSet={isAddressSet}/>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <div className="flex justify-between items-center">
          <div>
            <p className="pl-5 text-lg font-semibold text-black lg:text-xl sm:px-16 xl:px-48 dark:text-white">
              Schedule a tour now
            </p>
          </div>
          <div>
            <Button
              class="bg-black rounded-lg text-white text-md text-center self-center px-3 py-2 my-2 mx-2"
              onPress={onOpen}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;


