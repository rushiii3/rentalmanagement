import React, { useState } from "react";
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
  Avatar,
} from "@nextui-org/react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { ReviewServer } from "../../server";

function getRating(rating) {
  switch (rating) {
    case 1:
      return "Poor";
    case 2:
      return "Nothing special";
    case 3:
      return "Average";
    case 4:
      return "Very good";
    case 5:
      return "Excellent";
    default:
      return "None";
  }
}
const AddReviewModel = ({ RentedPropertyData, setReviewData, ReviewData }) => {

  const { user } = useSelector((state) => state.user);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const schema = yup.object().shape({
    property: yup.string().required("Property is required"),
    rating: yup
      .number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5")
      .required("Rating is required"),
    review: yup
      .string()
      .required("Review is required")
      .min(10, "Review must be at least 10 characters")
      .max(500, "Review must be at most 300 characters"),
      
  });

  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit = async (data) => {
    console.log(data);
    const toastId = toast.loading("Adding review...");
    try {
      const data1 = { ...data, user_id: user?.user?._id };
      const response = await axios.post(`${ReviewServer}/add-review`, data1);
      console.log(response.data.success);
      if (response.data.success) {
        const filteredData = RentedPropertyData.filter(item => item?.property_id?._id === data1.property);
        const insertData = [
          ...ReviewData,
          {
            user_id: user?.user?._id,
            rating: data1.rating,
            review: data1.review,
            added: Date.now(),
            property_id: {
              _id: filteredData[0]?.property_id?._id,
              building_name: filteredData[0]?.property_id?.building_name,
              building_number: filteredData[0]?.property_id?.building_number,
              property_streetname: filteredData[0]?.property_id,
              property_city: filteredData[0]?.property_id?.property_city,
              property_state: filteredData[0]?.property_id?.property_streetname,
              property_locality: filteredData[0]?.property_id?.property_locality,
              property_type: filteredData[0]?.property_id?.property_type,
              property_no_of_bhk:
                filteredData[0]?.property_id?.property_no_of_bhk,
              property_pincode: filteredData[0]?.property_id?.property_pincode,
              image: filteredData[0]?.property_id?.image,
            },
          },
        ];
        setReviewData(insertData);
        onOpenChange(isOpen);
        reset();
        toast.success("Review has been added", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        id: toastId,
      });
    }
  };
  const ChangeRating = (e) => {
    setRating(e);
    setValue("rating", e);
  };
  return (
    <>
      <Button onPress={onOpen} color="secondary" className="ml-auto">
        Give Review
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Give Review
              </ModalHeader>
              <ModalBody>
                <form
                  className="w-full flex flex-col space-y-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <Select
                      label="Property"
                      placeholder="Select a property"
                      className="max-w-full items-center"
                      labelPlacement="outside"
                      {...register("property")}
                      isInvalid={errors.property?.message ? true : false}
                      errorMessage={errors.property?.message}
                    >
                      {RentedPropertyData
                        ? RentedPropertyData.map((value, key) => (
                            // console.log(value?.property_id?._id)
                            <SelectItem
                              key={value?.property_id?._id}
                              startContent={
                                <Avatar
                                  alt="Property Image"
                                  className="w-6 h-6"
                                  src={value?.property_id?.image}
                                />
                              }
                              value={`${value?.property_id?.property_no_of_bhk} ${value?.property_id?.property_type} House in ${value?.property_id?.building_name}, ${value?.property_id?.property_locality}`}
                            >
                              {`${value?.property_id?.property_no_of_bhk} ${value?.property_id?.property_type} House in ${value?.property_id?.building_name}, ${value?.property_id?.property_locality}`}
                            </SelectItem>
                          ))
                        : null}
                    </Select>
                  </div>
                  <div className="mt-5">
                    <label
                      htmlFor="firstname"
                      class="block subpixel-antialiased text-foreground-600 pointer-events-none will-change-auto  !duration-200 !ease-out transition-[transform,color,left,opacity] motion-reduce:transition-none group-data-[filled=true]:text-foreground group-data-[filled=true]:pointer-events-auto pb-0 group-data-[filled=true]:left-0  text-small group-data-[filled=true]:-translate-y-[calc(100%_+_theme(fontSize.small)/2_+_20px)] pe-2 max-w-full text-ellipsis overflow-hidden"
                    >
                      Select rating
                    </label>
                    <Rating
                      value={rating}
                      onChange={ChangeRating}
                      onHoverChange={setHoveredRating}
                      style={{ maxWidth: 270 }}
                      className="mt-2"
                    />
                    <p class="mt-3 block subpixel-antialiased text-foreground-600 pointer-events-none will-change-auto  !duration-200 !ease-out transition-[transform,color,left,opacity] motion-reduce:transition-none group-data-[filled=true]:text-foreground group-data-[filled=true]:pointer-events-auto pb-0 group-data-[filled=true]:left-0  text-small group-data-[filled=true]:-translate-y-[calc(100%_+_theme(fontSize.small)/2_+_20px)] pe-2 max-w-full text-ellipsis overflow-hidden">
                      {getRating(hoveredRating ? hoveredRating : rating)}
                    </p>
                    <p className="text-tiny text-danger">{errors.rating?.message}</p>
                  </div>
                  <div>
                    <Textarea
                      label="Review"
                      labelPlacement="outside"
                      placeholder="Enter your review"
                      className="max-w-full"
                      {...register("review")}
                      isInvalid={errors.review?.message ? true : false}
                      errorMessage={errors.review?.message}
                    />
                  </div>
                  <div className="flex flex-row space-x-4 py-5 ml-auto">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color="primary" type="submit">
                      Submit
                    </Button>
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

export default AddReviewModel;
