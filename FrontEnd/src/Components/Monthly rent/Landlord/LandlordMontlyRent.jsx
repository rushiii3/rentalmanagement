import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { RentServer, propertServer } from "../../../server";
import {
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import ConfirmModalLandlord from "./ConfirmModalLandlord";
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
const LandlordMontlyRent = () => {
  const { user } = useSelector((state) => state.user);
  const userid = user?.user?.email;
  const [PropertyData, setPropertyData] = useState([]);
  const [SelectedProperty, setSelectedProperty] = useState(null);
  const [LeaseData, setLeaseData] = useState(null);
  const [columns, setColumns] = useState([]);
  const [NotPaidMonths, setNotPaidMonths] = useState([]);
  var count = 1;
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
    setNotPaidMonths(not_paid_months);
  };
  const getRent = async (id) => {
    try {
      const { data } = await axios.get(`${RentServer}/property-rents/${id}`);
      if (data.success) {
        if (data?.lease[0]) {
          setLeaseData(data?.lease[0]);
          console.log(data?.lease[0]);
          const startDate = new Date(data.lease[0].lease_start_date);
          const endDate = new Date(data.lease[0].lease_end_date);
          const monthPairs = getMonthPairs(startDate, endDate);
          const newColumns = monthPairs.map((value) => ({
            Month: value,
            Amount: data.lease[0].rent_amount,
            Date: "",
            Method: "",
            Status: "",
          }));
          const rent = data.Rents;
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
        }else{
          setLeaseData(null);
        }
      } else {
        
        setLeaseData(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (userid) {
      const getProperties = async () => {
        try {
          const { data } = await axios.get(
            `${propertServer}/landlord-property/${userid}`
          );
          setPropertyData(data.property);
          if (data.property) {
            const property_ids = data.property.map((value) => value?._id);
            const property_id = property_ids[0];
            getRent(property_id);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      getProperties();
    }
  }, [userid]);
  const handlePropertyChange = async (e) => {
    setSelectedProperty(e);
    getRent(e);
    // SetLeaseData(e);
  };

  return (
    <div className="lg:mx-16 mt-5 mx-3 min-h-screen">
      <h5 class="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Your Rents
      </h5>
      <Tabs
        color="secondary"
        aria-label="Tabs sizes"
        selectedKey={SelectedProperty}
        onSelectionChange={handlePropertyChange}
      >
        {PropertyData.map((value, key) => (
          <Tab key={value._id} title={value.building_name} />
        ))}
      </Tabs>
      <div className="mt-5 flex flex-col w-full">
      {LeaseData!==null ? (
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
                        {/* <ConfirmModal
                          amount={value.Amount * count}
                          id={key}
                          month={NotPaidMonths}
                          count={count}
                          columns={columns}
                          
                          user_id={user?.user?._id}
                          property_id={LeaseData?.property_id._id}
                          setColumns={setColumns}
                          get_not_paid_months={get_not_paid_months}
                        /> */}
                        <ConfirmModalLandlord  
                        
                        amount={value.Amount * count}
                          id={key}
                          month={NotPaidMonths}
                          count={count}
                          columns={columns}
                          
                          user_id={user?.user?._id}
                          property_id={LeaseData?.property_id}
                          setColumns={setColumns}
                          get_not_paid_months={get_not_paid_months}/>
                        <p className="hidden">{(count = count + 1)}</p>
                      </React.Fragment>
                    ) : value?.Status ? (
                      "Paid"
                    ) : (
                      <React.Fragment>
                        {/* <ConfirmModal
                          amount={value.Amount * count}
                          id={key}
                          month={NotPaidMonths}
                          count={count}
                          columns={columns}
                          CreditPoints={user?.user?.creditPoint}
                          user_id={user?.user?._id}
                          property_id={LeaseData?.property_id._id}
                          setColumns={setColumns}
                        /> */}
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

export default LandlordMontlyRent;
