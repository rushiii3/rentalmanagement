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
import ConfirmModal from "./ConfirmModal";

const TenantMontlyRent = () => {
  const { user } = useSelector((state) => state.user);
  const userid = user?.user?._id;
  const [columns, setColumns] = useState([]);
  let pay_months = [];
  var count = 1;
  useEffect(() => {
    if (userid) {
      const getMonthlyData = async () => {
        try {
          const { data } = await axios.get(
            `${RentServer}/tenant-rent/${userid}`
          );
          if (data.success) {
            console.log(data.InAgreement[0].rent_amount);
            const startDate = new Date(data.InAgreement[0].lease_start_date);
            const endDate = new Date(data.InAgreement[0].lease_end_date);
            const monthPairs = getMonthPairs(startDate, endDate);
            const newColumns = monthPairs.map((value) => ({
              Month: value,
              Amount: data.InAgreement[0].rent_amount,
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
                    <React.Fragment>
                      <p>{
                        pay_months =  columns.map((value, keymonth) => {
                          if(keymonth === key)
                          {
                            return value
                          }
                        })
                      }</p>
                      <ConfirmModal
                        amount={value.Amount * count}
                        id={key}
                        month={pay_months}
                      />
                      <p className="hidden">{(count = count + 1)}</p>
                    </React.Fragment>
                  ) : value?.Status === "Paid" ? (
                    "Paid"
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
