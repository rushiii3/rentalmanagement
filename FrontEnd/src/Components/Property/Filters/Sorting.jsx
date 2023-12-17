import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { IoIosArrowDown } from "react-icons/io";
const Sorting = ({ selectedValue, setSelectedKeys, selectedKeys }) => {
  return (
    <div className="relative text-left flex justify-center items-center">
      <span className="text-sm">Sort by</span>
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <Button
            variant="bordered"
            className="capitalize border-0"
            disableRipple={false}
            endContent={
                <IoIosArrowDown size={20}/>
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
          <DropdownItem key="Price Low">Price Low</DropdownItem>
          <DropdownItem key="Price High">Price High</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Sorting;
