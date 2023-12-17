import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCity } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
import { FaLandmarkDome } from "react-icons/fa6";
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
import { States, City } from "../../../statecities";
import { propertServer } from "../../../server";
import axios from "axios";
const LandmarkSearch = ({ handleSearchLandmark }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [state, setState] = useState("");
  const [SelectedCity, setSelectedCity] = useState(null);
  const [Landmarks, setLandmarks] = useState([]);
  const [SelectedLandmark, setSelectedLandmark] = useState(null);
  const onInputChange = (value) => {
    setState(value);
  };
  const city = City.filter((city) => state === city.state).map(
    (city) => city.name
  );
  const onCityChange = async (value) => {
    setSelectedCity(value);
    if (value !== null) {
      const response = await axios.get(
        `${propertServer}/properties-landmark?state=${state}&city=${value}`
      );
      setLandmarks(response.data);
    }
  };
  const handleLandmark = (value) => {
    setSelectedLandmark(value);
  };
  return (
    <div className="mt-5 border-b border-gray-200 pb-6 pt-10">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
        Find your home
      </h1>
      <div className="flex">
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          backdrop="blur"
          size="xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Search your home
                </ModalHeader>
                <ModalBody>
                  <div className="flex gap-x-4">
                    <Autocomplete
                      menuTrigger="input"
                      classNames={{
                        base: "w-full",
                        listboxWrapper: "max-h-[320px]",
                        selectorButton: "text-default-500",
                      }}
                      defaultItems={States}
                      inputProps={{
                        classNames: {
                          input: "ml-1",
                          inputWrapper: "h-[48px]",
                        },
                      }}
                      listboxProps={{
                        hideSelectedIcon: false,
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
                      aria-label="Select state"
                      placeholder="Enter state name"
                      popoverProps={{
                        offset: 10,
                        classNames: {
                          // base: "rounded-large",
                          content:
                            "p-1 border-small border-default-100 bg-background",
                        },
                      }}
                      radius="sm"
                      variant="bordered"
                      onInputChange={onInputChange}
                    >
                      {(item) => (
                        <AutocompleteItem key={item.id} textValue={item.name}>
                          <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                              <IoLocation size={15} className="flex-shrink-0" />

                              <div className="flex flex-col">
                                <span className="text-medium">{item.name}</span>
                              </div>
                            </div>
                          </div>
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                    <Autocomplete
                      menuTrigger="input"
                      classNames={{
                        base: "w-full",
                        listboxWrapper: "max-h-[320px]",
                        selectorButton: "text-default-500",
                      }}
                      defaultItems={States}
                      inputProps={{
                        classNames: {
                          input: "ml-1",
                          inputWrapper: "h-[48px]",
                        },
                      }}
                      listboxProps={{
                        hideSelectedIcon: false,
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
                      aria-label="Select city"
                      placeholder="Enter city name"
                      popoverProps={{
                        offset: 10,
                        classNames: {
                          // base: "rounded-large",
                          content:
                            "p-1 border-small border-default-100 bg-background",
                        },
                      }}
                      radius="sm"
                      variant="bordered"
                      onSelectionChange={onCityChange}
                    >
                      {city[0]?.map((value, key) => (
                        <AutocompleteItem key={value} textValue={value}>
                          <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                              <FaCity size={15} className="flex-shrink-0" />

                              <div className="flex flex-col">
                                <span className="text-medium">{value}</span>
                              </div>
                            </div>
                          </div>
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                  </div>

                  <Autocomplete
                    menuTrigger="input"
                    classNames={{
                      base: "w-full",
                      listboxWrapper: "max-h-[320px]",
                      selectorButton: "text-default-500",
                    }}
                    defaultItems={States}
                    inputProps={{
                      classNames: {
                        input: "ml-1",
                        inputWrapper: "h-[48px]",
                      },
                    }}
                    listboxProps={{
                      hideSelectedIcon: false,
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
                    aria-label="Select state"
                    placeholder="Enter state name"
                    popoverProps={{
                      offset: 10,
                      classNames: {
                        // base: "rounded-large",
                        content:
                          "p-1 border-small border-default-100 bg-background",
                      },
                    }}
                    radius="sm"
                    variant="bordered"
                    onInputChange={handleLandmark}
                  >
                    {Landmarks?.map((value, key) => (
                      <AutocompleteItem
                        key={key}
                        textValue={value.property_locality}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2 items-center">
                            <FaLandmarkDome
                              size={15}
                              className="flex-shrink-0"
                            />

                            <div className="flex flex-col">
                              <span className="text-medium">
                                {value.property_locality}
                              </span>
                            </div>
                          </div>
                        </div>
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onPress={onClose}
                    onClick={() => (handleSearchLandmark(
                      state,
                      SelectedCity,
                      SelectedLandmark
                    ))}
                  >
                    Search
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
            startContent={<CiSearch size={25} />}
            readOnly
          />
        </button>
      </div>
    </div>
  );
};

export default LandmarkSearch;
