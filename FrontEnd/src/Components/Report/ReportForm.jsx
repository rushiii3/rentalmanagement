import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Textarea,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import toast from "react-hot-toast";
import { ReportServer } from "../../server";
const ReportForm = ({ setReportData, ReportData, types, setFilterData, setSearchSelect, setSearchInput }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mode } = useSelector((state) => state.mode);
  const { user } = useSelector((state) => state.user);

  const schema = yup.object().shape({
    filter: yup.string().required("Please select a category"),
    title: yup
      .string()
      .required("Please enter a title")
      .min(5, "Title must be at least 5 characters")
      .max(50, "Title must not exceed 50 characters"),
    description: yup
      .string()
      .required("Please enter a description")
      .min(10, "Description must be at least 10 characters")
      .max(200, "Description must not exceed 200 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit = async (data) => {
    const toastId = toast.loading("Login...");
    try {
      const data1 = { ...data, user_id: user?.user?._id };
      const response = await axios.post(`${ReportServer}/add`, data1);
      console.log(data);
      if (response.data.success) {
        const insertData = [
          ...ReportData,
          {
            report_title: data.title,
            report_type: data.filter,
            report_description: data.description,
            report_status: "Pending",
            report_date: Date.now(), // Replace with current date/time
          },
        ];

        setReportData(insertData);
        setFilterData(insertData);
        setSearchInput("");
        setSearchSelect("");
        onOpenChange(isOpen);
        reset();
        toast.success("Report has been added", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        id: toastId,
      });
    }
  };
  return (
    <>
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
        placement="center"
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="w-full flex flex-col space-y-4">
                    <div>
                      <Select
                        isRequired
                        label="Filter"
                        placeholder="Select your cateogry"
                        className="max-w-full items-center"
                        labelPlacement="outside"
                        classNames={{
                          popoverContent: `${mode}`,
                        }}
                        {...register("filter")}
                        isInvalid={errors.filter?.message ? true : false}
                        errorMessage={errors.filter?.message}
                      >
                        {types.map((value) => (
                          <SelectItem
                            key={value?.name}
                            value={value?.name}
                            startContent={value?.icon}
                          >
                            {value?.name}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    <div className="w-full">
                      <Input
                        isRequired
                        type="text"
                        labelPlacement="outside"
                        label="Title"
                        placeholder="Enter your title"
                        className="max-w-full items-center"
                        fullWidth
                        classNames={{
                          mainWrapper: "w-full",
                        }}
                        {...register("title")}
                        isInvalid={errors.title?.message ? true : false}
                        errorMessage={errors.title?.message}
                      />
                    </div>
                    <div>
                      <Textarea
                        isRequired
                        label="Description"
                        labelPlacement="outside"
                        placeholder="Enter your description"
                        className="max-w-full"
                        {...register("description")}
                        isInvalid={errors.description?.message ? true : false}
                        errorMessage={errors.description?.message}
                      />
                    </div>
                    <div className="flex justify-end py-5">
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" type="submit">
                        Submit
                      </Button>
                    </div>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReportForm;
