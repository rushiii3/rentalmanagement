import PropertyCard from "./PropertyCard";
import React from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { propertServer } from "../../../server";
import InfiniteScroll from "react-infinite-scroll-component";
import NotAvaiableImage from "../../../Assets/property.webp";
import Loader from "../../Loader/loader";
import { useDebounce } from "use-debounce";

const Listing = ({
  selectedValues,
  selectedValue,
  priceRange,
  NoOfBedrooms,
  NoOfBathrooms,
  Furnishing,
  State,
  City,
  Landmark,
}) => {
  const LIMIT = 3;
  const [houseTypes] = useDebounce(selectedValues, 1500);
  const [price] = useDebounce(priceRange, 1500);
  const [furnishing] = useDebounce(Furnishing, 1500);
  // const [state] = useDebounce(State, 1000);
  // const [city] = useDebounce(City, 1000);
  // const [landmark] = useDebounce(Landmark, 1000);
  const fetchProperties = async ({ pageParam }) => {
    const response = await axios.get(
      `${propertServer}/properties?page=${pageParam}&limit=${LIMIT}&type=${houseTypes}&sort=${selectedValue}&price=${price}&bedrooms=${NoOfBedrooms}&bathrooms=${NoOfBathrooms}&Furnishing=${furnishing}&state=${State}&city=${City}&landmark=${Landmark}`
    );
    return response.data;
  };
  const queryConfig = {
    queryKey: [
      "properties",
      houseTypes,
      selectedValue,
      price,
      NoOfBedrooms,
      NoOfBathrooms,
      furnishing,
      State,
      City,
      Landmark,
    ],
    queryFn: fetchProperties,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  };

  const { data, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery(queryConfig);
  const properties = data?.pages.reduce((acc, page) => {
    return [...acc, ...page];
  }, []);
  const showendMessage = () => {};
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <InfiniteScroll
          dataLength={properties ? properties.length : 0}
          next={() => fetchNextPage()}
          hasMore={hasNextPage}
          loading={
            <div>
              <p className="font-semibold text-lg text-center">Loading...</p>
            </div>
          }
          endMessage={showendMessage()}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 w-full mb-4 py-4"
        >
          {properties?.length !== 0 ? (
            properties?.map((property, i) => (
              <PropertyCard property={property} key={i} />
            ))
          ) : (
            <div className="col-span-2 h-auto w-auto">
              <img src={NotAvaiableImage} alt="" />
              <p className="font-bold text-3xl text-center">
                No Properties Avaiable
              </p>
            </div>
          )}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Listing;
