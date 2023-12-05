import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Checkbox,
  Slider,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import {Select, SelectItem, Avatar} from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../Layouts/Footers/Footer";
import Listing from "./Card/Listing";
import { useNavigate, useLocation } from "react-router-dom";

const PropertyListing = () => {
  useEffect(() => {
    document.title = "Properties";
  }, []);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Newest"]));
  const [priceRange, setpriceRange] = React.useState([0, 500000]);
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const [MobileFilter, setMobileFilter] = useState(false);
  const [selectedValues, setSelectedValues] = useState(["All"]);
  const [Furnishing, setFurnishing] = useState(["All"]);
  const [NoOfBedrooms, setNoOfBedrooms] = useState("any");
  const [NoOfBathrooms, setNoOfBathrooms] = useState("any");

  const typesOfHouses = [
    "Haveli",
    "Bungalow",
    "Villa",
    "Apartment/Flat",
    "Penthouse",
    "Row House",
    "Cottage",
    "Chawl",
    "Mansion",
    "Farmhouse",
  ];
  const indianStates = [
    { id: 1, name: "Andhra Pradesh" },
    { id: 2, name: "Arunachal Pradesh" },
    { id: 3, name: "Assam" },
    { id: 4, name: "Bihar" },
    { id: 5, name: "Chhattisgarh" },
    { id: 6, name: "Goa" },
    { id: 7, name: "Gujarat" },
    { id: 8, name: "Haryana" },
    { id: 9, name: "Himachal Pradesh" },
    { id: 10, name: "Jharkhand" },
    { id: 11, name: "Karnataka" },
    { id: 12, name: "Kerala" },
    { id: 13, name: "Madhya Pradesh" },
    { id: 14, name: "Maharashtra" },
    { id: 15, name: "Manipur" },
    { id: 16, name: "Meghalaya" },
    { id: 17, name: "Mizoram" },
    { id: 18, name: "Nagaland" },
    { id: 19, name: "Odisha" },
    { id: 20, name: "Punjab" },
    { id: 21, name: "Rajasthan" },
    { id: 22, name: "Sikkim" },
    { id: 23, name: "Tamil Nadu" },
    { id: 24, name: "Telangana" },
    { id: 25, name: "Tripura" },
    { id: 26, name: "Uttar Pradesh" },
    { id: 27, name: "Uttarakhand" },
    { id: 28, name: "West Bengal" },
    { id: 29, name: "Andaman and Nicobar Islands" },
    { id: 30, name: "Chandigarh" },
    { id: 31, name: "Dadra and Nagar Haveli and Daman and Diu" },
    { id: 32, name: "Delhi" },
    { id: 33, name: "Lakshadweep" },
    { id: 34, name: "Puducherry" },
  ];
  const OpenFilterForMobile = () => {
    setMobileFilter(true);
  };
  const handleBedroomClick = (value) => {
    setNoOfBedrooms(value);
  };
  const handleBathroomsClick = (value) => {
    setNoOfBathrooms(value);
  };
  const queryParams = new URLSearchParams(location.search);
  const handlePropertyType = (e) => {
    const { value, checked } = e.target;

    if (value === "All") {
      setSelectedValues(checked ? ["All"] : []);
    } else {
      setSelectedValues((prevSelectedValues) => {
        if (checked && prevSelectedValues.includes("All")) {
          return [value];
        } else if (
          !checked &&
          prevSelectedValues.length === 1 &&
          !prevSelectedValues.includes("All")
        ) {
          return ["All"];
        } else if (checked && !prevSelectedValues.includes(value)) {
          const updatedValues = [...prevSelectedValues, value];
          return updatedValues.includes("All")
            ? updatedValues.filter((val) => val !== "All")
            : updatedValues;
        } else {
          return prevSelectedValues.filter((val) => val !== value);
        }
      });
    }
  };
  const handleFurnishingType = (e) => {
    const { value, checked } = e.target;

    if (value === "All") {
      setFurnishing(checked ? ["All"] : []);
    } else {
      setFurnishing((prevSelectedValues) => {
        if (checked && prevSelectedValues.includes("All")) {
          return [value];
        } else if (
          !checked &&
          prevSelectedValues.length === 1 &&
          !prevSelectedValues.includes("All")
        ) {
          return ["All"];
        } else if (checked && !prevSelectedValues.includes(value)) {
          const updatedValues = [...prevSelectedValues, value];
          return updatedValues.includes("All")
            ? updatedValues.filter((val) => val !== "All")
            : updatedValues;
        } else {
          return prevSelectedValues.filter((val) => val !== value);
        }
      });
    }
  };
  useEffect(() => {
    queryParams.set("types", JSON.stringify(selectedValues));
    queryParams.set("priceRange", JSON.stringify(priceRange));
    queryParams.set("bedrooms", JSON.stringify(NoOfBedrooms));
    queryParams.set("bathrooms", JSON.stringify(NoOfBathrooms));
    queryParams.set("furnshing", JSON.stringify(Furnishing));
    queryParams.set("sortBy", JSON.stringify(selectedValue));
    const updatedSearch = queryParams.toString();
    navigate(`${location.pathname}?${updatedSearch}`);
  }, [
    selectedValues,
    location.pathname,
    navigate,
    priceRange,
    NoOfBedrooms,
    NoOfBathrooms,
    Furnishing,
    selectedValue,
  ]);
  return (
    <div>
      <AnimatePresence>
        {MobileFilter && (
          <div
            className={`relative z-40 lg:hidden ${
              MobileFilter ? "" : "hidden"
            }`}
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm"></div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5, ease: "anticipate" }}
              className="fixed inset-0 z-40 flex"
            >
              <div className="fixed inset-0 z-40 flex">
                <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl dark:bg-black">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 dark:bg-black"
                      onClick={() => {
                        setMobileFilter(false);
                      }}
                    >
                      <span className="sr-only">Close menu</span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Search</h3>
                    <div className="border-b border-gray-200 px-4 py-6">
                      <h3 className="-my-3 flow-root">
                        <span className="font-medium text-gray-900 dark:text-white">
                          Property Type
                        </span>
                      </h3>
                      <div
                        className="pt-6 flex flex-col gap-y-3"
                        id="filter-section-0"
                      >
                        <Checkbox
                          value="All"
                          onChange={handlePropertyType}
                          radius="small"
                          isSelected={selectedValues.includes("All")}
                        >
                          All
                        </Checkbox>
                        {typesOfHouses.map((values, key) => (
                          <Checkbox
                            key={key}
                            value={values}
                            onChange={handlePropertyType}
                            radius="small"
                            isSelected={selectedValues.includes(values)}
                          >
                            {values}
                          </Checkbox>
                        ))}
                      </div>
                    </div>
                    <div className="border-b border-gray-200 py-6 px-4">
                      <div
                        className="pt-6 flex flex-col gap-y-3"
                        id="filter-section-0"
                      >
                        <Slider
                          label="Price Range"
                          step={2000}
                          maxValue={500000}
                          minValue={0}
                          defaultValue={[0, 500000]}
                          showSteps={true}
                          showTooltip={true}
                          showOutline={true}
                          value={priceRange}
                          onChange={setpriceRange}
                          disableThumbScale={false}
                          formatOptions={{ style: "currency", currency: "INR" }}
                          tooltipValueFormatOptions={{
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 10,
                          }}
                          classNames={{
                            base: "max-w-md",
                            filler:
                              "bg-gradient-to-r from-primary-500 to-secondary-400",
                            labelWrapper: "mb-2",
                            label: "font-medium text-default-700 text-medium",
                            value: "font-medium text-default-500 text-small",
                            thumb: [
                              "transition-size",
                              "bg-gradient-to-r from-secondary-400 to-primary-500",
                              "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                              "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
                            ],
                            // step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50",
                          }}
                          tooltipProps={{
                            offset: 10,
                            placement: "bottom",
                            classNames: {
                              base: [
                                // arrow color
                                "before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500",
                              ],
                              content: [
                                "py-2 shadow-xl",
                                "text-white bg-gradient-to-r from-secondary-400 to-primary-500",
                              ],
                            },
                          }}
                        />
                      </div>
                    </div>
                    <div className="border-b border-gray-200 py-6 px-4">
                      <h3 className="-my-3 flow-root">
                        <span className="font-medium text-gray-900 dark:text-white">
                          Bedrooms
                        </span>
                      </h3>

                      <div className="pt-6" id="filter-section-0">
                        <div className="space-y-4">
                          <div
                            className="inline-flex rounded-md shadow-sm"
                            role="group"
                          >
                            <button
                              onClick={() => handleBedroomClick("any")}
                              type="button"
                              className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white  rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  ${
                                NoOfBedrooms === "any"
                                  ? "border-black border-2 dark:border-white"
                                  : "border border-gray-200"
                              }`}
                            >
                              any
                            </button>
                            <button
                              onClick={() => handleBedroomClick("1")}
                              type="button"
                              className={`px-4 py-2 text-sm font-medium text-gray-900  hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  bg-white  ${
                                NoOfBedrooms === "1"
                                  ? "border-black border-2 dark:border-white"
                                  : "border border-t border-b border-r border-gray-200"
                              }`}
                            >
                              1
                            </button>
                            <button
                              onClick={() => handleBedroomClick("2")}
                              type="button"
                              className={`px-4 py-2 text-sm font-medium text-gray-900  hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  bg-white  ${
                                NoOfBedrooms === "2"
                                  ? "border-black border-2 dark:border-white"
                                  : "border border-t border-b border-r border-gray-200"
                              }`}
                            >
                              2
                            </button>
                            <button
                              onClick={() => handleBedroomClick("3")}
                              type="button"
                              className={`px-4 py-2 text-sm font-medium text-gray-900  hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  bg-white  ${
                                NoOfBedrooms === "3"
                                  ? "border-black border-2 dark:border-white"
                                  : "border border-t border-b border-r border-gray-200"
                              }`}
                            >
                              3
                            </button>
                            <button
                              onClick={() => handleBedroomClick("4")}
                              type="button"
                              className={`px-4 py-2 text-sm font-medium text-gray-900  hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  bg-white  ${
                                NoOfBedrooms === "4"
                                  ? "border-black border-2 dark:border-white"
                                  : "border border-t border-b border-r border-gray-200"
                              }`}
                            >
                              4
                            </button>
                            <button
                              onClick={() => handleBedroomClick("5+")}
                              type="button"
                              className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white  rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  ${
                                NoOfBedrooms === "5+"
                                  ? "border-black border-2 dark:border-white"
                                  : "border border-gray-200"
                              }`}
                            >
                              5+
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-b border-gray-200 py-6 px-4">
                      <h3 className="-my-3 flow-root">
                        <span className="font-medium text-gray-900 dark:text-white">
                          Bathrooms
                        </span>
                      </h3>

                      <div className="pt-6" id="filter-section-0">
                        <div className="space-y-4">
                          <div
                            className="inline-flex rounded-md shadow-sm"
                            role="group"
                          >
                            <button
                              onClick={() => setNoOfBathrooms("any")}
                              type="button"
                              className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white  rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  ${
                                NoOfBathrooms === "any"
                                  ? "border-black border-2 dark:border-white"
                                  : "border border-gray-200"
                              }`}
                            >
                              any
                            </button>
                            <button
                              onClick={() => setNoOfBathrooms("1")}
                              type="button"
                              className={`px-4 py-2 text-sm font-medium text-gray-900  hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  bg-white  ${
                                NoOfBathrooms === "1"
                                  ? "border-black border-2 dark:border-white"
                                  : "border border-t border-b border-r border-gray-200"
                              }`}
                            >
                              1
                            </button>
                            <button
                              onClick={() => setNoOfBathrooms("2")}
                              type="button"
                              className={`px-4 py-2 text-sm font-medium text-gray-900  hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  bg-white  ${
                                NoOfBathrooms === "2"
                                  ? "border-black border-2 dark:border-white"
                                  : "border border-t border-b border-r border-gray-200"
                              }`}
                            >
                              2
                            </button>
                            <button
                              onClick={() => setNoOfBathrooms("3")}
                              type="button"
                              className={`px-4 py-2 text-sm font-medium text-gray-900  hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  bg-white  ${
                                NoOfBathrooms === "3"
                                  ? "border-black border-2 dark:border-white"
                                  : "border border-t border-b border-r border-gray-200"
                              }`}
                            >
                              3
                            </button>
                            <button
                              onClick={() => setNoOfBathrooms("4")}
                              type="button"
                              className={`px-4 py-2 text-sm font-medium text-gray-900  hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  bg-white  ${
                                NoOfBathrooms === "4"
                                  ? "border-black border-2 dark:border-white"
                                  : "border border-t border-b border-r border-gray-200"
                              }`}
                            >
                              4
                            </button>
                            <button
                              onClick={() => setNoOfBathrooms("5+")}
                              type="button"
                              className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white  rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  ${
                                NoOfBathrooms === "5+"
                                  ? "border-black border-2 dark:border-white"
                                  : "border border-gray-200"
                              }`}
                            >
                              5+
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-b border-gray-200 py-6 px-4">
                      <h3 className="-my-3 flow-root">
                        <span className="font-medium text-gray-900 dark:text-white">
                          Furnishing
                        </span>
                      </h3>
                      <div
                        className="pt-6 flex flex-col gap-y-3"
                        id="filter-section-0"
                      >
                        <Checkbox
                          value="Any"
                          radius="small"
                          onChange={handleFurnishingType}
                          isSelected={Furnishing.includes("All")}
                        >
                          Any
                        </Checkbox>
                        <Checkbox
                          value="Fully Furnished"
                          radius="small"
                          onChange={handleFurnishingType}
                          isSelected={Furnishing.includes("Fully Furnished")}
                        >
                          Fully Furnished
                        </Checkbox>
                        <Checkbox
                          value="Semi-furnished"
                          radius="small"
                          onChange={handleFurnishingType}
                          isSelected={Furnishing.includes("Semi-furnished")}
                        >
                          Semi-furnished
                        </Checkbox>
                        <Checkbox
                          value="Unfurnished"
                          radius="small"
                          onChange={handleFurnishingType}
                          isSelected={Furnishing.includes("Unfurnished")}
                        >
                          Unfurnished
                        </Checkbox>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
          <h1 className="md:text-4xl font-bold tracking-tight text-gray-900 text-3xl">
            Properties
          </h1>
        </div> */}
        <div className="mt-5 border-b border-gray-200 pb-6 pt-10">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
            Find your home
          </h1>
          <div className="flex">
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" backdrop="blur" size="xl">
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Search your home
                    </ModalHeader>
                    <ModalBody>
                      <div className="flex gap-x-4">
                      



<Autocomplete
            classNames={{
              base: "w-full",
              listboxWrapper: "max-h-[320px]",
              selectorButton: "text-default-500",
            }}
            defaultItems={indianStates}
            inputProps={{
              classNames: {
                input: "ml-1",
                inputWrapper: "h-[48px]",
              },
            }}
            listboxProps={{
              hideSelectedIcon: true,
              itemClasses: {
                base: [
                  // "rounded-medium",
                  "text-default-500",
                  "transition-opacity",
                  "data-[hover=true]:text-foreground",
                  "dark:data-[hover=true]:bg-default-50",
                  "data-[pressed=true]:opacity-70",
                  "data-[hover=true]:bg-default-200",
                  "data-[selectable=true]:focus:bg-default-100",
                  "data-[focus-visible=true]:ring-default-500",
                ],
              },
            }}
            aria-label="Select an employee"
            placeholder="Enter state name"
            popoverProps={{
              offset: 10,
              classNames: {
                // base: "rounded-large",
                content: "p-1 border-small border-default-100 bg-background",
              },
            }}
            
            radius="sm"
            variant="bordered"
          >
            {(item) => (
              <AutocompleteItem key={item.id} textValue={item.name}>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    {/* <Avatar
                      alt={item.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={item.avatar}
                    /> */}
                    <div className="flex flex-col">
                      <span className="text-medium">{item.name}</span>
                    </div>
                  </div>
                </div>
              </AutocompleteItem>
            )}
          </Autocomplete>




          <Autocomplete
            classNames={{
              base: "w-full",
              listboxWrapper: "max-h-[320px]",
              selectorButton: "text-default-500",
            }}
            defaultItems={indianStates}
            inputProps={{
              classNames: {
                input: "ml-1",
                inputWrapper: "h-[48px]",
              },
            }}
            listboxProps={{
              hideSelectedIcon: true,
              itemClasses: {
                base: [
                  // "rounded-medium",
                  "text-default-500",
                  "transition-opacity",
                  "data-[hover=true]:text-foreground",
                  "dark:data-[hover=true]:bg-default-50",
                  "data-[pressed=true]:opacity-70",
                  "data-[hover=true]:bg-default-200",
                  "data-[selectable=true]:focus:bg-default-100",
                  "data-[focus-visible=true]:ring-default-500",
                ],
              },
            }}
            aria-label="Select an employee"
            placeholder="Enter city name"
            popoverProps={{
              offset: 10,
              classNames: {
                // base: "rounded-large",
                content: "p-1 border-small border-default-100 bg-background",
              },
            }}
            
            radius="sm"
            variant="bordered"
          >
            {(item) => (
              <AutocompleteItem key={item.id} textValue={item.name}>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    {/* <Avatar
                      alt={item.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={item.avatar}
                    /> */}
                    <div className="flex flex-col">
                      <span className="text-medium">{item.name}</span>
                    </div>
                  </div>
                </div>
              </AutocompleteItem>
            )}
          </Autocomplete>

    
                      </div>




<Autocomplete
            classNames={{
              base: "w-full",
              listboxWrapper: "max-h-[320px]",
              selectorButton: "text-default-500",
            }}
            defaultItems={indianStates}
            inputProps={{
              classNames: {
                input: "ml-1",
                inputWrapper: "h-[48px]",
              },
            }}
            listboxProps={{
              hideSelectedIcon: true,
              itemClasses: {
                base: [
                  // "rounded-medium",
                  "text-default-500",
                  "transition-opacity",
                  "data-[hover=true]:text-foreground",
                  "dark:data-[hover=true]:bg-default-50",
                  "data-[pressed=true]:opacity-70",
                  "data-[hover=true]:bg-default-200",
                  "data-[selectable=true]:focus:bg-default-100",
                  "data-[focus-visible=true]:ring-default-500",
                ],
              },
            }}
            aria-label="Select an employee"
            placeholder="Enter locality name"
            popoverProps={{
              offset: 10,
              classNames: {
                // base: "rounded-large",
                content: "p-1 border-small border-default-100 bg-background",
              },
            }}
            
            radius="sm"
            variant="bordered"
          >
            {(item) => (
              <AutocompleteItem key={item.id} textValue={item.name}>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    {/* <Avatar
                      alt={item.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={item.avatar}
                    /> */}
                    <div className="flex flex-col">
                      <span className="text-medium">{item.name}</span>
                    </div>
                  </div>
                </div>
              </AutocompleteItem>
            )}
          </Autocomplete>

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
            <button type="button" className="w-full" onClick={onOpen}>
            <Input
              type="text"
              variant="bordered"
              placeholder="Enter your locality"
              
              startContent={<CiSearch size={25}/>}
            />
            </button>
            
          </div>
        </div>

        <section className="pb-24 pt-6 ">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <form className="hidden lg:block ">
              <h3 className="sr-only">Search</h3>
              <div className="border-b border-gray-200 py-6">
                <h3 className="-my-3 flow-root">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Property Type
                  </span>
                </h3>
                <div
                  className="pt-6 flex flex-col gap-y-3"
                  id="filter-section-0"
                >
                  <Checkbox
                    value="All"
                    onChange={handlePropertyType}
                    radius="small"
                    isSelected={selectedValues.includes("All")}
                  >
                    All
                  </Checkbox>
                  {typesOfHouses.map((values, key) => (
                    <Checkbox
                      key={key}
                      value={values}
                      onChange={handlePropertyType}
                      radius="small"
                      isSelected={selectedValues.includes(values)}
                    >
                      {values}
                    </Checkbox>
                  ))}
                </div>
              </div>
              <div className="border-b border-gray-200 py-6">
                <div
                  className="pt-6 flex flex-col gap-y-3"
                  id="filter-section-0"
                >
                  <Slider
                    label="Price Range"
                    step={2000}
                    maxValue={500000}
                    minValue={0}
                    defaultValue={[0, 500000]}
                    showSteps={true}
                    showTooltip={true}
                    showOutline={true}
                    value={priceRange}
                    onChange={setpriceRange}
                    disableThumbScale={false}
                    formatOptions={{ style: "currency", currency: "INR" }}
                    tooltipValueFormatOptions={{
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 10,
                    }}
                    classNames={{
                      base: "max-w-md",
                      filler:
                        "bg-gradient-to-r from-primary-500 to-secondary-400",
                      labelWrapper: "mb-2",
                      label: "font-medium text-default-700 text-medium",
                      value: "font-medium text-default-500 text-small",
                      thumb: [
                        "transition-size",
                        "bg-gradient-to-r from-secondary-400 to-primary-500",
                        "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                        "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
                      ],
                      // step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50",
                    }}
                    tooltipProps={{
                      offset: 10,
                      placement: "bottom",
                      classNames: {
                        base: [
                          // arrow color
                          "before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500",
                        ],
                        content: [
                          "py-2 shadow-xl",
                          "text-white bg-gradient-to-r from-secondary-400 to-primary-500",
                        ],
                      },
                    }}
                  />
                </div>
              </div>
              <div className="border-b border-gray-200 py-6">
                <h3 className="-my-3 flow-root">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Bedrooms
                  </span>
                </h3>

                <div className="pt-6" id="filter-section-0">
                  <div className="space-y-4">
                    <div
                      className="inline-flex rounded-md shadow-sm"
                      role="group"
                    >
                      <button
                        onClick={() => handleBedroomClick("any")}
                        type="button"
                        className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white  rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  ${
                          NoOfBedrooms === "any"
                            ? "border-black border-2 dark:border-white"
                            : "border border-gray-200"
                        }`}
                      >
                        any
                      </button>
                      <button
                        onClick={() => handleBedroomClick("1")}
                        type="button"
                        className={`px-4 py-2 text-sm font-medium text-gray-900  hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  bg-white  ${
                          NoOfBedrooms === "1"
                            ? "border-black border-2 dark:border-white"
                            : "border border-t border-b border-r border-gray-200"
                        }`}
                      >
                        1
                      </button>
                      <button
                        onClick={() => handleBedroomClick("2")}
                        type="button"
                        className={`px-4 py-2 text-sm font-medium text-gray-900  hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  bg-white  ${
                          NoOfBedrooms === "2"
                            ? "border-black border-2 dark:border-white"
                            : "border border-t border-b border-r border-gray-200"
                        }`}
                      >
                        2
                      </button>
                      <button
                        onClick={() => handleBedroomClick("3")}
                        type="button"
                        className={`px-4 py-2 text-sm font-medium text-gray-900  hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  bg-white  ${
                          NoOfBedrooms === "3"
                            ? "border-black border-2 dark:border-white"
                            : "border border-t border-b border-r border-gray-200"
                        }`}
                      >
                        3
                      </button>
                      <button
                        onClick={() => handleBedroomClick("4")}
                        type="button"
                        className={`px-4 py-2 text-sm font-medium text-gray-900  hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  bg-white  ${
                          NoOfBedrooms === "4"
                            ? "border-black border-2 dark:border-white"
                            : "border border-t border-b border-r border-gray-200"
                        }`}
                      >
                        4
                      </button>
                      <button
                        onClick={() => handleBedroomClick("5+")}
                        type="button"
                        className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white  rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  ${
                          NoOfBedrooms === "5+"
                            ? "border-black border-2 dark:border-white"
                            : "border border-gray-200"
                        }`}
                      >
                        5+
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b border-gray-200 py-6">
                <h3 className="-my-3 flow-root">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Bathrooms
                  </span>
                </h3>

                <div className="pt-6" id="filter-section-0">
                  <div className="space-y-4">
                    <div
                      className="inline-flex rounded-md shadow-sm"
                      role="group"
                    >
                      <button
                        onClick={() => setNoOfBathrooms("any")}
                        type="button"
                        className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white  rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  ${
                          NoOfBathrooms === "any"
                            ? "border-black border-2 dark:border-white"
                            : "border border-gray-200"
                        }`}
                      >
                        any
                      </button>
                      <button
                        onClick={() => setNoOfBathrooms("1")}
                        type="button"
                        className={`px-4 py-2 text-sm font-medium text-gray-900  hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  bg-white  ${
                          NoOfBathrooms === "1"
                            ? "border-black border-2 dark:border-white"
                            : "border border-t border-b border-r border-gray-200"
                        }`}
                      >
                        1
                      </button>
                      <button
                        onClick={() => setNoOfBathrooms("2")}
                        type="button"
                        className={`px-4 py-2 text-sm font-medium text-gray-900  hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  bg-white  ${
                          NoOfBathrooms === "2"
                            ? "border-black border-2 dark:border-white"
                            : "border border-t border-b border-r border-gray-200"
                        }`}
                      >
                        2
                      </button>
                      <button
                        onClick={() => setNoOfBathrooms("3")}
                        type="button"
                        className={`px-4 py-2 text-sm font-medium text-gray-900  hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  bg-white  ${
                          NoOfBathrooms === "3"
                            ? "border-black border-2 dark:border-white"
                            : "border border-t border-b border-r border-gray-200"
                        }`}
                      >
                        3
                      </button>
                      <button
                        onClick={() => setNoOfBathrooms("4")}
                        type="button"
                        className={`px-4 py-2 text-sm font-medium text-gray-900  hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  bg-white  ${
                          NoOfBathrooms === "4"
                            ? "border-black border-2 dark:border-white"
                            : "border border-t border-b border-r border-gray-200"
                        }`}
                      >
                        4
                      </button>
                      <button
                        onClick={() => setNoOfBathrooms("5+")}
                        type="button"
                        className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white  rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  ${
                          NoOfBathrooms === "5+"
                            ? "border-black border-2 dark:border-white"
                            : "border border-gray-200"
                        }`}
                      >
                        5+
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b border-gray-200 py-6">
                <h3 className="-my-3 flow-root">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Furnishing
                  </span>
                </h3>
                <div
                  className="pt-6 flex flex-col gap-y-3"
                  id="filter-section-0"
                >
                  <Checkbox
                    value="Any"
                    radius="small"
                    onChange={handleFurnishingType}
                    isSelected={Furnishing.includes("All")}
                  >
                    Any
                  </Checkbox>
                  <Checkbox
                    value="Fully Furnished"
                    radius="small"
                    onChange={handleFurnishingType}
                    isSelected={Furnishing.includes("Fully Furnished")}
                  >
                    Fully Furnished
                  </Checkbox>
                  <Checkbox
                    value="Semi-furnished"
                    radius="small"
                    onChange={handleFurnishingType}
                    isSelected={Furnishing.includes("Semi-furnished")}
                  >
                    Semi-furnished
                  </Checkbox>
                  <Checkbox
                    value="Unfurnished"
                    radius="small"
                    onChange={handleFurnishingType}
                    isSelected={Furnishing.includes("Unfurnished")}
                  >
                    Unfurnished
                  </Checkbox>
                </div>
              </div>
            </form>

            <div className="lg:col-span-3">
              <div className="flex items-center justify-end">
                <div className="relative text-left flex justify-center items-center">
                  <span className="text-sm">Sort by</span>
                  <Dropdown backdrop="blur">
                    <DropdownTrigger>
                      <Button
                        variant="bordered"
                        className="capitalize border-0"
                        disableRipple={false}
                        endContent={
                          <svg
                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            />
                          </svg>
                        }
                      >
                        {selectedValue}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Single selection example"
                      variant="flat"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selectedKeys}
                      onSelectionChange={setSelectedKeys}
                    >
                      <DropdownItem key="Newest">Newest</DropdownItem>
                      <DropdownItem key="Oldest">Oldest</DropdownItem>
                      <DropdownItem key="Best Rating">Best Rating</DropdownItem>
                      <DropdownItem key="Price Low">Price Low</DropdownItem>
                      <DropdownItem key="Price High">Price High</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>

                <button
                  type="button"
                  className="-m-2 ml-1 p-1 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={OpenFilterForMobile}
                >
                  <span className="sr-only">Filters</span>
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <Listing />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyListing;
