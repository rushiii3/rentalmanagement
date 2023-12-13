import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import Footer from "../Layouts/Footers/Footer";
import Listing from "./Card/Listing";
import DesktopViewFilter from "./Filters/DesktopViewFilter";
import MobileViewFilter from "./Filters/MobileViewFilter";
import LandmarkSearch from "./Filters/LandmarkSearch";
import Sorting from "./Filters/Sorting";
const PropertyListing = () => {
  useEffect(() => {
    document.title = "Properties";
  }, []);

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

  const OpenFilterForMobile = () => {
    setMobileFilter(true);
  };
  const handleBedroomClick = (value) => {
    setNoOfBedrooms(value);
  };
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
  console.log(selectedValues);
}, [selectedValues]);

  return (
    <div>
      {/* filter for mobile view */}
      <MobileViewFilter
        handlePropertyType={handlePropertyType}
        selectedValues={selectedValues}
        typesOfHouses={typesOfHouses}
        priceRange={priceRange}
        setpriceRange={setpriceRange}
        handleBedroomClick={handleBedroomClick}
        NoOfBedrooms={NoOfBedrooms}
        setNoOfBathrooms={setNoOfBathrooms}
        NoOfBathrooms={NoOfBathrooms}
        handleFurnishingType={handleFurnishingType}
        Furnishing={Furnishing}
        MobileFilter={MobileFilter}
        setMobileFilter={setMobileFilter}
      />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* landmark serach */}
        <LandmarkSearch />

        <section className="pb-24 pt-6 ">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* filter for desktop */}
            <DesktopViewFilter
              handlePropertyType={handlePropertyType}
              selectedValues={selectedValues}
              typesOfHouses={typesOfHouses}
              priceRange={priceRange}
              setpriceRange={setpriceRange}
              handleBedroomClick={handleBedroomClick}
              NoOfBedrooms={NoOfBedrooms}
              setNoOfBathrooms={setNoOfBathrooms}
              NoOfBathrooms={NoOfBathrooms}
              handleFurnishingType={handleFurnishingType}
              Furnishing={Furnishing}
            />

            <div className="lg:col-span-3">
              <div className="flex items-center justify-end">
                {/* sorting */}
                <Sorting
                  selectedValue={selectedValue}
                  setSelectedKeys={setSelectedKeys}
                  selectedKeys={selectedKeys}
                />

                <button
                  type="button"
                  className="-m-2 ml-1 p-1 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={OpenFilterForMobile}
                >
                  <span className="sr-only">Filters</span>
                  <FaFilter size={20} />
                </button>
              </div>
              <Listing selectedValues={selectedValues} selectedValue={selectedValue} priceRange={priceRange}/>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyListing;
