import React from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
  } from "@nextui-org/react";
const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

const LeaseViewModal = ({value}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        color="success"
        variant="solid"
        className="w-full"
        onPress={onOpen}
      >

          View
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        scrollBehavior="outside"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
          View Agreement
              </ModalHeader>
              <ModalBody>
                  <div class="bg-white overflow-hidden shadow rounded-lg border">
                    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                      <dl class="sm:divide-y sm:divide-gray-200">
                        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                            Start Date
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {formatDateString(value?.lease_start_date)}
                          </dd>
                        </div>
                        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                            End Date
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {formatDateString(value?.lease_end_date)}
                          </dd>
                        </div>
                        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                            Rent Price
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            ₹ {value?.rent_amount}
                          </dd>
                        </div>
                        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                            Security Deposit
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            ₹ {value?.security_deposit}
                          </dd>
                        </div>
                        <div class="py-3 sm:py-5  sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                            Agreement Document
                          </dt>
                          <dd class="mt-3 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <object
                              data={value?.agreement_doc}
                              className="w-full h-screen"
                            ></object>
                          </dd>
                        </div>
                      </dl>
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

export default LeaseViewModal