import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RentServer } from "../../../server";
import axios from "axios";
import useRazorpay from "react-razorpay";

const TenantMontlyRent = () => {
  const [Razorpay] = useRazorpay();

  const { user } = useSelector((state) => state.user);
  const userid = user?.user?._id;
  const [columns, setColumns] = useState([]);
  const [DisabledDays, setDisabledDays] = useState([]);
  useEffect(() => {
    if (userid) {
      const getMonthlyData = async () => {
        try {
          const { data } = await axios.get(
            `${RentServer}/tenant-rent/${userid}`
          );
          if (data.success) {
            const startDate = new Date(data.InAgreement[0].lease_start_date);
            const endDate = new Date(data.InAgreement[0].lease_end_date);
            const monthPairs = getMonthPairs(startDate, endDate);
            const newColumns = monthPairs.map((value) => ({
              Month: value,
              Amount: "4220",
              Date: "",
              Method: "",
              Status: "",
            }));
            setColumns(newColumns);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      getMonthlyData();
    }
  }, [userid]);

  function getMonthPairs(startDate, endDate) {
    const monthPairs = [];
    let currentDate = new Date(startDate);

    // Loop until currentDate is less than or equal to endDate
    while (currentDate < endDate) {
      const startMonth = currentDate.toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      });
      currentDate.setMonth(currentDate.getMonth() + 1); // Move to the next month
      const endMonth = currentDate.toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      });
      monthPairs.push(`${startMonth} - ${endMonth}`);
    }

    return monthPairs;
  }

  const handlePay = (amount, key) => {
    console.log(amount);
    console.log(key);
    // const order = await createOrder(params); //  Create order on your backend

    const options = {
      key: "rzp_test_cA6wZvVTsahL8l", // Enter the Key ID generated from the Dashboard
      amount: amount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Rent Me",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      // order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: function (response) {
        console.log(response);
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
  
    const rzp1 = new Razorpay(options);
  
    rzp1.on("payment.failed", function (response) {
      console.log(response);
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
  
    rzp1.open();
  };
  return (
    <div className="lg:mx-16 mt-5 mx-3 min-h-screen">
      <h5 class="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Your Monthly Rent Payment
      </h5>
      <p>
        2 BHK House in Ramchandra Builiding, svd svd, Along, Arunachal Pradesh
      </p>
      <div className="my-10">
        <Table
          aria-label="Example static collection table"
          align="center"
          fullWidth
          isStriped
          disabledKeys={DisabledDays}
        >
          <TableHeader>
            <TableColumn>Month</TableColumn>
            <TableColumn>Amount</TableColumn>
            <TableColumn>Date Paid</TableColumn>
            <TableColumn>Method</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            {columns.map((value, key) => (
              <TableRow key={key}>
                <TableCell>{value?.Month}</TableCell>
                {/* Use the correct way to access the Amount property */}
                <TableCell>{value && `₹${value.Amount}`}</TableCell>
                <TableCell>{value?.Date}</TableCell>
                <TableCell>{value?.Method}</TableCell>
                <TableCell>{value?.Status}</TableCell>
                <TableCell>
                  {value?.Status !== "Paid" ? (
                    <Button
                      color="success"
                      variant="flat"
                      onClick={() => handlePay(value.Amount * (key + 1), key)}
                    >
                      Pay Now
                    </Button>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default TenantMontlyRent;
