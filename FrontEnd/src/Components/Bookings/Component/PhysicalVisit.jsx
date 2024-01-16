import React, { useState } from "react";
import { BsFilterCircle } from "react-icons/bs";
import DatePicker from "react-multi-date-picker";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";
import { LuCalendarOff } from "react-icons/lu";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import PhysicalVisitCard from "./PhysicalVisitCard";
const PhysicalVisitTab = ({
  PhysicalVisit,
  setFilteredPhysicalVisit,
  FilteredPhysicalVisit,
  input,
  setinput,
}) => {
  const [SelectedStatus, setSelectedStatus] = useState("");
  const [Value, setValue] = useState(new Date());
  const onChangeInput = (e) => {
    setinput(e.target.value);
    const searchValue = e.target.value.toLowerCase();
    const filtered = PhysicalVisit.filter(
      (value) =>
        value.property_id.property_state.toLowerCase().includes(searchValue) ||
        value.property_id.property_city.toLowerCase().includes(searchValue) ||
        value.property_id.property_locality.toLowerCase().includes(searchValue)
    );
    setFilteredPhysicalVisit(filtered);
  };
  const handleSelectionChange = (e) => {
    const selectedValue = e.target.value;
    const filtered = PhysicalVisit.filter((value) =>
      value.pv_status.toLowerCase().includes(selectedValue.toLowerCase())
    );
    setFilteredPhysicalVisit(filtered);
    setSelectedStatus(selectedValue);
  };
  function handleChangeDate(value) {
    setValue(value);
    const filtered = PhysicalVisit.filter(
      (item) => item.pv_date.split("T")[0] === value.format("YYYY-MM-DD")
    );
    setFilteredPhysicalVisit(filtered);
  }
  return (
    <div>
      <div className="mb-5 flex justify-center items-center flex-row w-full gap-6">
        <div class=" bg-white w-full md:w-1/2 mx-auto flex flex-row  items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300">
          <input
            id="search-bar"
            placeholder="your keyword here"
            class="px-6 py-2 w-full rounded-md  outline-none bg-white"
            onInput={onChangeInput}
            value={input}
          />
        </div>
        <div className="flex items-center justify-center">
          <Popover placement="bottom" showArrow offset={10}>
            <PopoverTrigger>
              <Button color="white" isIconOnly>
                <BsFilterCircle size={30} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px]">
              {(titleProps) => (
                <div className="px-1 py-2 w-full">
                  <p
                    className="text-small font-bold text-foreground"
                    {...titleProps}
                  >
                    Dimensions
                  </p>
                  <div className="mt-2 flex flex-col gap-2 w-full">
                    <div class="flex flex-col">
                      <label
                        htmlFor="status"
                        class="text-stone-600 text-sm font-medium"
                      >
                        Status
                      </label>

                      <select
                        value={SelectedStatus}
                        onChange={handleSelectionChange}
                        id="status"
                        class="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      >
                        <option value="any" selected>
                          Any
                        </option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Booked">Booked</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                    <div class="flex flex-col">
                      <label
                        htmlFor="manufacturer"
                        class="text-stone-600 text-sm font-medium"
                      >
                        Date
                      </label>
                      <DatePicker
                        value={Value}
                        onChange={handleChangeDate}
                        plugins={[<DatePickerHeader />]}
                        render={
                          <input
                            placeholder="Select date"
                            class="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {FilteredPhysicalVisit && FilteredPhysicalVisit.length === 0 ? (
        <NoBookings
          icon={
            <LuCalendarOff className="mx-auto h-56 w-auto text-black sm:h-64 dark:text-white" />
          }
        />
      ) : (
        <div>
          <div className="flex flex-col gap-y-5 mt-5">
            {FilteredPhysicalVisit.map((value, key) => (
              <PhysicalVisitCard key={key} value={value} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhysicalVisitTab;

const NoBookings = ({ icon }) => {
  return (
    <div className="flex items-center flex-col justify-center">
      {icon}
      <p>No Bookings yet!</p>
    </div>
  );
};
