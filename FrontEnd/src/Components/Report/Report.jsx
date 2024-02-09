import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { SiHackaday } from "react-icons/si";
import { VscIssues } from "react-icons/vsc";
import { BsFillBugFill } from "react-icons/bs";
import { GrFan } from "react-icons/gr";
import { Chip } from "@nextui-org/react";
import { useSelector } from "react-redux";
const Report = () => {
  const { mode } = useSelector((state) => state.mode);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const itemClasses = {
    base: `py-0 w-full`,
    title: "font-normal text-medium  w-full line-clamp-1 hover:line-clamp-none	",
    trigger:
      "px-2 py-3 data-[hover=true]:bg-default-100 rounded-lg flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };

  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className="p-5 min-h-screen">
      <div className="flex flex-col gap-5 md:flex-row items-center">
        <div class="flex w-full">
          <Select
            label="Filter"
            // placeholder="Select an animal"
             className={`${mode} max-w-[130px]` }
            radius="none"
            classNames={
              {
                popoverContent:`${mode}`,
              }
            }
            
            
          >
            <SelectItem
              key={2}
              value="Bug"
              startContent={<BsFillBugFill className="text-danger text-xl" />}
            >
              Bug
            </SelectItem>
            <SelectItem
              key={3}
              value="Fraud"
              startContent={<SiHackaday className="text-violet-500 text-xl" />}
            >
              Fraud
            </SelectItem>
            <SelectItem
              key={4}
              value="Issue"
              startContent={<VscIssues className="text-violet-500 text-xl" />}
            >
              Issue
            </SelectItem>
            <SelectItem
              key={5}
              value="Other"
              startContent={<GrFan className="text-violet-500 text-xl" />}
            >
              Other
            </SelectItem>
          </Select>

          <Input
            type="text"
            placeholder="Find your issues..."
            startContent={<CiSearch className="text-lg md:text-3xl" />}
            radius="none"
          />
        </div>
        <Button
          onPress={onOpen}
          color="secondary"
          size="lg"
          className="w-auto ms-auto"
          startContent={<IoMdAdd className="text-xl md:text-3xl" />}
        >
          New Issue
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}

          className={mode}
          backdrop="blur"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 ">
                  New Issue
                </ModalHeader>
                <ModalBody>
                  <div className="w-full flex flex-col space-y-4">
                    <div>
                      <Select
                        label="Filter"
                        placeholder="Select your cateogry"
                        className="max-w-full items-center"
                        labelPlacement="outside"
                        classNames={
                          {
                            popoverContent:`${mode}`,
                          }
                        }
                      >
                        <SelectItem
                          key={2}
                          value="Bug"
                          startContent={
                            <BsFillBugFill className="text-danger text-xl" />
                          }
                        >
                          Bug
                        </SelectItem>
                        <SelectItem
                          key={3}
                          value="Fraud"
                          startContent={
                            <SiHackaday className="text-violet-500 text-xl" />
                          }
                        >
                          Fraud
                        </SelectItem>
                        <SelectItem
                          key={4}
                          value="Issue"
                          startContent={
                            <VscIssues className="text-violet-500 text-xl" />
                          }
                        >
                          Issue
                        </SelectItem>
                        <SelectItem
                          key={5}
                          value="Other"
                          startContent={
                            <GrFan className="text-violet-500 text-xl" />
                          }
                        >
                          Other
                        </SelectItem>
                      </Select>
                    </div>
                    <div className="w-full">
                      <Input
                        type="text"
                        labelPlacement="outside"
                        label="Title"
                        placeholder="Enter your title"
                        className="max-w-full items-center"
                        fullWidth
                        classNames={{
                          mainWrapper: "w-full",
                        }}
                      />
                    </div>
                    <div>
                      <Textarea
                        isRequired
                        label="Description"
                        labelPlacement="outside"
                        placeholder="Enter your description"
                        className="max-w-full"
                      />
                    </div>
                  </div>
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
      </div>

      <Accordion
        showDivider={false}
        className="p-2 flex flex-col gap-1 w-full mt-5"
        variant="shadow"
        itemClasses={itemClasses}
      >
        <AccordionItem
          key="1"
          aria-label="Connected devices"
          startContent={
            <SiHackaday className="text-danger text-xl md:text-3xl" />
          }
          subtitle={<p className="flex">2 min ago</p>}
          title="Connected devices"
        >
          {defaultContent}
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Apps Permissions"
          startContent={
            <VscIssues className="text-violet-500 text-xl md:text-3xl" />
          }
          subtitle={
            <div className="flex space-x-2 items-center">
              <Chip color="success" size="sm">
                Success
              </Chip>
              <p>2 min ago</p>
            </div>
          }
          title="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam pulvinar risus non risus hendrerit venenatis.
          Pellentesque sit amet hendrerit risus, sed porttitor quam."
        >
          {defaultContent}
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Pending tasks"
          startContent={
            <BsFillBugFill className="text-warning text-xl md:text-3xl" />
          }
          subtitle={<p className="flex">2 min ago</p>}
          title="Pending tasks"
        >
          {defaultContent}
        </AccordionItem>
        <AccordionItem
          key="4"
          aria-label="Card expired"
          startContent={
            <GrFan className="text-indigo-500 text-xl md:text-3xl" />
          }
          subtitle={<p className="flex">2 min ago</p>}
          title={
            <p className="flex gap-1 items-center">
              Card expired
              <p className="text-default-400 text-small">*4812</p>
            </p>
          }
        >
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Report;
