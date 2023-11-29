import React, { useEffect } from "react";
import PropertyCard from "./Card/PropertyCard";
import { CiSearch } from "react-icons/ci";
import { users } from "./Card/data.js";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Checkbox,
  Slider,
} from "@nextui-org/react";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  ButtonGroup,
} from "@nextui-org/react";

const PropertyListing = () => {
  useEffect(() => {
    document.title = "Properties";
  }, []);

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Newest"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
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
  const indianStates =[
    {"id": 1, "name": "Andhra Pradesh"},
    {"id": 2, "name": "Arunachal Pradesh"},
    {"id": 3, "name": "Assam"},
    {"id": 4, "name": "Bihar"},
    {"id": 5, "name": "Chhattisgarh"},
    {"id": 6, "name": "Goa"},
    {"id": 7, "name": "Gujarat"},
    {"id": 8, "name": "Haryana"},
    {"id": 9, "name": "Himachal Pradesh"},
    {"id": 10, "name": "Jharkhand"},
    {"id": 11, "name": "Karnataka"},
    {"id": 12, "name": "Kerala"},
    {"id": 13, "name": "Madhya Pradesh"},
    {"id": 14, "name": "Maharashtra"},
    {"id": 15, "name": "Manipur"},
    {"id": 16, "name": "Meghalaya"},
    {"id": 17, "name": "Mizoram"},
    {"id": 18, "name": "Nagaland"},
    {"id": 19, "name": "Odisha"},
    {"id": 20, "name": "Punjab"},
    {"id": 21, "name": "Rajasthan"},
    {"id": 22, "name": "Sikkim"},
    {"id": 23, "name": "Tamil Nadu"},
    {"id": 24, "name": "Telangana"},
    {"id": 25, "name": "Tripura"},
    {"id": 26, "name": "Uttar Pradesh"},
    {"id": 27, "name": "Uttarakhand"},
    {"id": 28, "name": "West Bengal"},
    {"id": 29, "name": "Andaman and Nicobar Islands"},
    {"id": 30, "name": "Chandigarh"},
    {"id": 31, "name": "Dadra and Nagar Haveli and Daman and Diu"},
    {"id": 32, "name": "Delhi"},
    {"id": 33, "name": "Lakshadweep"},
    {"id": 34, "name": "Puducherry"}
  ]
  
  

  return (
    <div>
      <div className="relative z-40 lg:hidden ">
        <div className="fixed inset-0 bg-black bg-opacity-25"></div>

        <div className="fixed inset-0 z-40 flex">
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form className="mt-4 border-t border-gray-200">
              <h3 className="sr-only">Categories</h3>
              <ul className="px-2 py-3 font-medium text-gray-900">
                <li>
                  <p className="block px-2 py-3">Totes</p>
                </li>
                <li>
                  <p className="block px-2 py-3">Backpacks</p>
                </li>
                <li>
                  <p className="block px-2 py-3">Travel Bags</p>
                </li>
                <li>
                  <p className="block px-2 py-3">Hip Bags</p>
                </li>
                <li>
                  <p className="block px-2 py-3">Laptop Sleeves</p>
                </li>
              </ul>

              <div className="border-t border-gray-200 px-4 py-6">
                <h3 className="-mx-2 -my-3 flow-root">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                    aria-controls="filter-section-mobile-0"
                    aria-expanded="false"
                  >
                    <span className="font-medium text-gray-900">Color</span>
                    <span className="ml-6 flex items-center">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div className="pt-6" id="filter-section-mobile-0">
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <input
                        id="filter-mobile-color-0"
                        name="color[]"
                        value="white"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-mobile-color-0"
                        className="ml-3 min-w-0 flex-1 text-gray-500"
                      >
                        White
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-mobile-color-1"
                        name="color[]"
                        value="beige"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-mobile-color-1"
                        className="ml-3 min-w-0 flex-1 text-gray-500"
                      >
                        Beige
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-mobile-color-2"
                        name="color[]"
                        value="blue"
                        type="checkbox"
                        checked
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-mobile-color-2"
                        className="ml-3 min-w-0 flex-1 text-gray-500"
                      >
                        Blue
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-mobile-color-3"
                        name="color[]"
                        value="brown"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-mobile-color-3"
                        className="ml-3 min-w-0 flex-1 text-gray-500"
                      >
                        Brown
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-mobile-color-4"
                        name="color[]"
                        value="green"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-mobile-color-4"
                        className="ml-3 min-w-0 flex-1 text-gray-500"
                      >
                        Green
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-mobile-color-5"
                        name="color[]"
                        value="purple"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-mobile-color-5"
                        className="ml-3 min-w-0 flex-1 text-gray-500"
                      >
                        Purple
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-6">
                <h3 className="-mx-2 -my-3 flow-root">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                    aria-controls="filter-section-mobile-1"
                    aria-expanded="false"
                  >
                    <span className="font-medium text-gray-900">Category</span>
                    <span className="ml-6 flex items-center">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div className="pt-6" id="filter-section-mobile-1">
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <input
                        id="filter-mobile-category-0"
                        name="category[]"
                        value="new-arrivals"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-mobile-category-0"
                        className="ml-3 min-w-0 flex-1 text-gray-500"
                      >
                        New Arrivals
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-mobile-category-1"
                        name="category[]"
                        value="sale"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-mobile-category-1"
                        className="ml-3 min-w-0 flex-1 text-gray-500"
                      >
                        Sale
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-mobile-category-2"
                        name="category[]"
                        value="travel"
                        type="checkbox"
                        checked
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-mobile-category-2"
                        className="ml-3 min-w-0 flex-1 text-gray-500"
                      >
                        Travel
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-mobile-category-3"
                        name="category[]"
                        value="organization"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-mobile-category-3"
                        className="ml-3 min-w-0 flex-1 text-gray-500"
                      >
                        Organization
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-mobile-category-4"
                        name="category[]"
                        value="accessories"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-mobile-category-4"
                        className="ml-3 min-w-0 flex-1 text-gray-500"
                      >
                        Accessories
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-6">
                <h3 className="-mx-2 -my-3 flow-root">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                    aria-controls="filter-section-mobile-2"
                    aria-expanded="false"
                  >
                    <span className="font-medium text-gray-900">Size</span>
                    <span className="ml-6 flex items-center">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div className="pt-6" id="filter-section-mobile-2">
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <input
                        id="filter-mobile-size-0"
                        name="size[]"
                        value="2l"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-mobile-size-0"
                        className="ml-3 min-w-0 flex-1 text-gray-500"
                      >
                        2L
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-mobile-size-1"
                        name="size[]"
                        value="6l"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-mobile-size-1"
                        className="ml-3 min-w-0 flex-1 text-gray-500"
                      >
                        6L
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-mobile-size-2"
                        name="size[]"
                        value="12l"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-mobile-size-2"
                        className="ml-3 min-w-0 flex-1 text-gray-500"
                      >
                        12L
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-mobile-size-3"
                        name="size[]"
                        value="18l"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-mobile-size-3"
                        className="ml-3 min-w-0 flex-1 text-gray-500"
                      >
                        18L
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-mobile-size-4"
                        name="size[]"
                        value="20l"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-mobile-size-4"
                        className="ml-3 min-w-0 flex-1 text-gray-500"
                      >
                        20L
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-mobile-size-5"
                        name="size[]"
                        value="40l"
                        type="checkbox"
                        checked
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-mobile-size-5"
                        className="ml-3 min-w-0 flex-1 text-gray-500"
                      >
                        40L
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-5">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
          Find your home
          </h1>
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
                  "rounded-medium",
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
                base: "rounded-large",
                content: "p-1 border-small border-default-100 bg-background",
              },
            }}
            startContent={<CiSearch size={25} />}
            radius="full"
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
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Properties
          </h1>
          <div className="flex items-center">
            <div className="relative text-left flex justify-center items-center">
              <div>
                <button
                  type="button"
                  className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                  id="menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  Sort by
                </button>
              </div>

              <div>
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
                            fill-rule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clip-rule="evenodd"
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
            </div>

            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
            >
              <span className="sr-only">Filters</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <section className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <form className="hidden lg:block">
              <h3 className="sr-only">Search</h3>
              <div className="border-b border-gray-200 py-6">
                <h3 className="-my-3 flow-root">
                  <span className="font-medium text-gray-900">
                    Property Type
                  </span>
                </h3>
                <div
                  className="pt-6 flex flex-col gap-y-3"
                  id="filter-section-0"
                >
                  <Checkbox defaultSelected radius="small">
                    All
                  </Checkbox>
                  {typesOfHouses.map((values, key) => (
                    <Checkbox key={key} radius="small">
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
                  <button
                    type="button"
                    className="flex w-full items-center justify-between bg-white py-3  text-gray-400 hover:text-gray-500"
                    aria-controls="filter-section-0"
                    aria-expanded="false"
                  >
                    <span className="font-medium text-gray-900">Bedrooms</span>
                    <span className="ml-6 flex items-center">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                </h3>

                <div className="pt-6" id="filter-section-0">
                  <div className="space-y-4">
                    <div class="inline-flex rounded-md shadow-sm" role="group">
                      <button
                        type="button"
                        class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                      >
                        any
                      </button>
                      <button
                        type="button"
                        class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-r border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                      >
                        1
                      </button>
                      <button
                        type="button"
                        class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-r border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                      >
                        2
                      </button>
                      <button
                        type="button"
                        class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-r border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                      >
                        3
                      </button>
                      <button
                        type="button"
                        class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b  border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                      >
                        4
                      </button>
                      <button
                        type="button"
                        class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                      >
                        5+
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="border-b border-gray-200 py-6">
                <h3 className="-my-3 flow-root">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                    aria-controls="filter-section-1"
                    aria-expanded="false"
                  >
                    <span className="font-medium text-gray-900">Category</span>
                    <span className="ml-6 flex items-center">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div className="pt-6" id="filter-section-1">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="filter-category-0"
                        name="category[]"
                        value="new-arrivals"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-category-0"
                        className="ml-3 text-sm text-gray-600"
                      >
                        New Arrivals
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-category-1"
                        name="category[]"
                        value="sale"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-category-1"
                        className="ml-3 text-sm text-gray-600"
                      >
                        Sale
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-category-2"
                        name="category[]"
                        value="travel"
                        type="checkbox"
                        checked
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-category-2"
                        className="ml-3 text-sm text-gray-600"
                      >
                        Travel
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-category-3"
                        name="category[]"
                        value="organization"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-category-3"
                        className="ml-3 text-sm text-gray-600"
                      >
                        Organization
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-category-4"
                        name="category[]"
                        value="accessories"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-category-4"
                        className="ml-3 text-sm text-gray-600"
                      >
                        Accessories
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b border-gray-200 py-6">
                <h3 className="-my-3 flow-root">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                    aria-controls="filter-section-2"
                    aria-expanded="false"
                  >
                    <span className="font-medium text-gray-900">Size</span>
                    <span className="ml-6 flex items-center">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div className="pt-6" id="filter-section-2">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="filter-size-0"
                        name="size[]"
                        value="2l"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-size-0"
                        className="ml-3 text-sm text-gray-600"
                      >
                        2L
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-size-1"
                        name="size[]"
                        value="6l"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-size-1"
                        className="ml-3 text-sm text-gray-600"
                      >
                        6L
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-size-2"
                        name="size[]"
                        value="12l"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-size-2"
                        className="ml-3 text-sm text-gray-600"
                      >
                        12L
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-size-3"
                        name="size[]"
                        value="18l"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-size-3"
                        className="ml-3 text-sm text-gray-600"
                      >
                        18L
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-size-4"
                        name="size[]"
                        value="20l"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-size-4"
                        className="ml-3 text-sm text-gray-600"
                      >
                        20L
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-size-5"
                        name="size[]"
                        value="40l"
                        type="checkbox"
                        checked
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        for="filter-size-5"
                        className="ml-3 text-sm text-gray-600"
                      >
                        40L
                      </label>
                    </div>
                  </div>
                </div>
              </div> */}
            </form>

            <div className="lg:col-span-3">
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 w-full">
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
                <PropertyCard />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PropertyListing;
