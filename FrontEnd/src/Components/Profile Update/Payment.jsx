import { Button } from "@nextui-org/react";
import React, { useRef, useState } from "react";
import useRazorpay from "react-razorpay";
import Store from "../../Redux/store";
import { LoadUser } from "../../Redux/action/user";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import axios from "axios";
import { TransactionServer } from "../../server";
const Payment = ({ points, userEmail }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [price, setprice] = useState(0);
  const [Error, setError] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [Razorpay] = useRazorpay();
  const handlePay = async () => {
    
    
    const options = {
      key: "rzp_test_cA6wZvVTsahL8l", // Enter the Key ID generated from the Dashboard
      amount: price * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Rent Me",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      handler: function (response) {
        console.log(response);
        alert(response.razorpay_payment_id);
        sendPayment(response.razorpay_payment_id, price);
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);


    if (price > 1000 && price<=100000) {
      rzp1.open();
      onOpenChange(isOpen);
    }
    if (price===0) {
      setError(true);
      seterrorMessage("Amount should be greater than ₹1000");
    }
  };

  const sendPayment = async (pay_id, amount) => {
    const toastId = toast.loading("Adding funds to your account...");
    try {
      
      const { data } = await axios.post(
        `${TransactionServer}/add-transaction`,
        { pay_id, amount, userEmail }
      );
      if (data.success) {
        toast.success("Funds Added successfully", {
          id: toastId,
        });
        Store.dispatch(LoadUser());
      }
    } catch (error) {
      toast.error(error.message, {
        id: toastId,
      });
    }
  };

  const handlePrice = async (e) => {
    setprice(parseInt(e));
  };
  const handlePriceInput = (e) => {
    const inputValue = parseInt(e.target.value);
    setprice(inputValue);
    if (inputValue === 0) {
      setError(true);
      seterrorMessage("Amount should be greater than ₹1000");
    }
    if (inputValue < 1000) {
      setError(true);
      seterrorMessage("Amount should be greater than ₹1000");
    } else {
      setError(false);
      seterrorMessage("");
    }
    if(inputValue>100000){
      setError(true);
      seterrorMessage("Amount should be less than ₹100000");
    }else{
      setError(false);
      seterrorMessage("");
    }
  };

  return (
    <div className="w-full">
      <div class="w-full p-8 bg-white text-center rounded-3xl pr-16 shadow-2xl">
        <h1 class="text-black font-semibold text-2xl">Current Balance</h1>
        <p class="pt-2 tracking-wide">
          <span class="text-gray-400 align-top">₹ </span>
          <span class="text-3xl font-semibold">{points}</span>
        </p>
        <Button
          color="success"
          className="px-5 mt-3"
          variant="flat"
          onPress={onOpen}
        >
          Add Funds
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add Funds
                </ModalHeader>
                <ModalBody>
                  <div class="mt-6">
                    <div class="font-semibold">
                      How much would you like to add funds?
                    </div>
                    <div>
                      <input
                        class="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2"
                        value={price}
                        type="number"
                        placeholder="100"
                        onInput={(e) => handlePriceInput(e)}
                      />
                    </div>
                    {Error ? (
                      <div>
                        <p className="text-red-500">
                          {errorMessage}
                        </p>
                      </div>
                    ) : null}

                    <div class="flex justify-between">
                      <div
                        className={`mt-[14px] cursor-pointer truncate rounded-[4px] border p-3 text-[#191D23] ${
                          price === 5000
                            ? "border-green-700"
                            : "border-[#E7EAEE]"
                        }`}
                        onClick={() => handlePrice(5000)}
                      >
                        ₹5,000
                      </div>

                      <div
                        className={`mt-[14px] cursor-pointer truncate rounded-[4px] border p-3 text-[#191D23] ${
                          price === 10000
                            ? "border-green-700"
                            : "border-[#E7EAEE]"
                        }`}
                        onClick={() => handlePrice(10000)}
                      >
                        ₹10,000
                      </div>
                      <div
                        className={`mt-[14px] cursor-pointer truncate rounded-[4px] border p-3 text-[#191D23] ${
                          price === 15000
                            ? "border-green-700"
                            : "border-[#E7EAEE]"
                        }`}
                        onClick={() => handlePrice(15000)}
                      >
                        ₹15,000
                      </div>
                      <div
                        className={`mt-[14px] cursor-pointer truncate rounded-[4px] border p-3 text-[#191D23] ${
                          price === 20000
                            ? "border-green-700"
                            : "border-[#E7EAEE]"
                        }`}
                        onClick={() => handlePrice(20000)}
                      >
                        ₹20,000
                      </div>
                    </div>
                  </div>
                  <div className="my-5 flex flex-row justify-end">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color="primary" onClick={handlePay}>
                      Add Funds
                    </Button>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default Payment;
