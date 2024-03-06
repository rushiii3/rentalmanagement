import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { GiConfirmed } from "react-icons/gi";
import { RentServer } from "../../../server";
import Store from "../../../Redux/store";
import { LoadUser } from "../../../Redux/action/user";
const ConfirmModalLandlord = ({
    amount,
    month,
    id,
    count,
    columns,
    user_id,
    property_id,
    setColumns,
    get_not_paid_months,
  }) => {
    console.log(property_id);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { mode } = useSelector((state) => state.mode);
    const [PayingMonthPairs, setPayingMonthPairs] = useState([]);
    const [Loading, setLoading] = useState(false);
    const handleSubmit = async (amounts, ids, months) => {
        const toastId = toast.loading("Paying to rent...");
        setLoading(true);
        try {
            const { data } = await axios.post(`${RentServer}/landlord-update-rent`, {
              amounts,
              months,
              user_id,
              property_id,
            });
            if (data.success) {
              toast.success("Rent paid successfully", {
                id: toastId,
              });
              Store.dispatch(LoadUser());
              setLoading(false);
              onOpenChange(isOpen);
              const updatedColumns = columns.map((value, key) => {
                if (months.includes(value.Month)) {
                  return {
                    ...value,
                    Date: Date.now(),
                    Method: false,
                    Status: true,
                  };
                }
                return value;
              });
              get_not_paid_months(updatedColumns);
              setColumns(updatedColumns);
            }
        } catch (error) {
          toast.error(error.message, {
            id: toastId,
          });
          setLoading(false);
        }
      };
    const handleClick = (month_id) => {
        const index = month_id - 1;
        const previousValues = [];
        // Get previous values
        for (let i = index; i >= 0; i--) {
          previousValues.push(month[i]);
        }
        const filteredMonths = columns
          .filter((column, key) => previousValues.includes(key))
          .map((column) => column.Month);
        setPayingMonthPairs(filteredMonths);
        onOpenChange(isOpen);
      };


  return (
    <>
    <Button  onClick={() => handleClick(count)} color="secondary" variant="flat">
      Action
    </Button>
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      className={`${mode} border-white border-1`}
      classNames={{
        closeButton: "hidden",
      }}
      placement="center"
      size="lg"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="p-4">
              <div class=" rounded-lg md:max-w-md md:mx-auto  md:relative dark:bg-zinc-950">
                <div class="md:flex items-center">
                  <div class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                    <GiConfirmed className="h-full w-full text-green-500" />
                  </div>
                  <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                    <p class="font-bold">Confirmation!</p>
                    <p class="text-sm text-gray-700 mt-1 dark:text-white">
                    You are updating the rent amount for the tenant. The new rent amount will be <b>₹{amount}</b> for {PayingMonthPairs.length} months.
        This change will be effective immediately for future rent payments. This action cannot be undone.
                    </p>
                  </div>
                </div>
                <div class="text-center md:text-right mt-4 md:flex md:justify-end md:space-x-3  md:space-y-0 space-y-3">
                  <Button
                    // isLoading={Loading}
                    color="success"
                    variant="flat"
                    className="w-full md:w-auto"
                    onClick={() => handleSubmit(amount, id, PayingMonthPairs)}
                    // class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-green-200 text-green-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                  >
                    Confirm
                    {/* {Loading ? "Payingg" : "Confirm"} */}
                  </Button>
                  <Button
                    // isLoading={Loading}
                    color="danger"
                    variant="flat"
                    onPress={onClose}
                    className="w-full md:w-auto"
                    // class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
                  >
                    Cancel
                    {/* {Loading ? "You cant undo it" : "Cancel"} */}
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

export default ConfirmModalLandlord