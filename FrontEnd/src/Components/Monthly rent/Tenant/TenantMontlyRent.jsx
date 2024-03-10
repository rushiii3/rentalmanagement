import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RentServer } from "../../../server";
import axios from "axios";
import ConfirmModal from "./ConfirmModal";
/**
 * The function `formatDateString` takes a date string as input, converts it to a Date object, and
 * formats it in a specific date format with the desired time zone.
 * @returns The `formatDateString` function takes a date string as input, converts it to a Date object,
 * and then formats it using the specified options. The formatted date string in the format "MMM DD,
 * YYYY" is being returned.
 */
const formatDateString = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC", // Set the desired time zone here
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(date);
};
const TenantMontlyRent = () => {
  const { user } = useSelector((state) => state.user);
  const userid = user?.user?._id;
  const [columns, setColumns] = useState([]);
  const [NotPaidMonths, setNotPaidMonths] = useState([]);
  const [LeaseData, setLeaseData] = useState();
  var count = 1;
  /* The `useEffect` hook in the provided code snippet is responsible for fetching monthly rent data for
 a specific tenant when the `userid` state variable changes. Here's a breakdown of what the
 `useEffect` is doing: */
  useEffect(() => {
    if (userid) {
      const getMonthlyData = async () => {
        try {
          const { data } = await axios.get(
            `${RentServer}/tenant-rent/${userid}`
          );
          if (data.success) {
            setLeaseData(data.InAgreement[0]);
            console.log(data);
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
            const rent = data.Rent;
            const mergedObjects = newColumns.map((item1) => {
              const matchingItem = rent.find(
                (item2) => item1.Month === item2.rent_month
              );
              if (matchingItem) {
                return {
                  ...item1,
                  Date: matchingItem.addedDate,
                  Method: matchingItem.payment_type,
                  Status: matchingItem.rent_status,
                };
              } else {
                return item1;
              }
            });
            setColumns(mergedObjects);
            get_not_paid_months(mergedObjects);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      getMonthlyData();
    }
  }, [userid]);
  /**
   * The function `getMonthPairs` generates pairs of short month names and years between a given start
   * and end date.
   * @returns The function `getMonthPairs` returns an array of month pairs in the format "startMonth -
   * endMonth" based on the input startDate and endDate.
   */
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
  /**
   * The function `get_not_paid_months` filters out months where the `Status` property is not true from
   * an array of objects and sets the result in state.
   */
  const get_not_paid_months = (mergedObjects) => {
    const not_paid_months = mergedObjects
      .map((value, key) => {
        console.log(value.Status);
        if (value.Status === true) {
          return null;
        } else {
          return key;
        }
      })
      .filter((index) => index !== null);
    console.log(not_paid_months);
    setNotPaidMonths(not_paid_months);
  };
  return (
    <div className="lg:mx-16 mt-5 mx-3 min-h-screen">
      <h5 class="pb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Your Monthly Rent Payment
      </h5>
      <p>
        2 BHK House in Ramchandra Builiding, svd svd, Along, Arunachal Pradesh
      </p>
      <div className="py-10">
        {columns ? (
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
                  <TableCell>
                    {value?.Date === "" ? "" : formatDateString(value?.Date)}
                  </TableCell>
                  <TableCell>
                    {value?.Method === ""
                      ? ""
                      : value?.Method === true
                      ? "Online"
                      : "Offline"}
                  </TableCell>
                  <TableCell>{value?.Status && "Paid"}</TableCell>
                  <TableCell>
                    {value?.Status === "" ? (
                      <React.Fragment>
                        <ConfirmModal
                          amount={value.Amount * count}
                          id={key}
                          month={NotPaidMonths}
                          count={count}
                          columns={columns}
                          CreditPoints={user?.user?.creditPoint}
                          user_id={user?.user?._id}
                          property_id={LeaseData?.property_id._id}
                          setColumns={setColumns}
                          get_not_paid_months={get_not_paid_months}
                        />
                        <p className="hidden">{(count = count + 1)}</p>
                      </React.Fragment>
                    ) : value?.Status ? (
                      "Paid"
                    ) : (
                      <React.Fragment>
                        <ConfirmModal
                          amount={value.Amount * count}
                          id={key}
                          month={NotPaidMonths}
                          count={count}
                          columns={columns}
                          CreditPoints={user?.user?.creditPoint}
                          user_id={user?.user?._id}
                          property_id={LeaseData?.property_id._id}
                          setColumns={setColumns}
                        />
                        <p className="hidden">{(count = count + 1)}</p>
                      </React.Fragment>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          "no"
        )}
      </div>
    </div>
  );
};
export default TenantMontlyRent;
