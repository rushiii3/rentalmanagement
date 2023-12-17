import React from "react";
import {
  Checkbox,
  Slider,
} from "@nextui-org/react";
const DesktopViewFilter = ({
  handlePropertyType,
  selectedValues,
  typesOfHouses,
  priceRange,
  setpriceRange,
  handleBedroomClick,
  NoOfBedrooms,
  setNoOfBathrooms,
  NoOfBathrooms,
  handleFurnishingType,
  Furnishing,
}) => {
  return (
      <form className="hidden lg:block ">
        <h3 className="sr-only">Search</h3>
        <div className="border-b border-gray-200 py-6">
          <h3 className="-my-3 flow-root">
            <span className="font-medium text-gray-900 dark:text-white">
              Property Type
            </span>
          </h3>
          <div className="pt-6 flex flex-col gap-y-3" id="filter-section-0">
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
          <div className="pt-6 flex flex-col gap-y-3" id="filter-section-0">
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
                filler: "bg-gradient-to-r from-primary-500 to-secondary-400",
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
              <div className="inline-flex rounded-md shadow-sm" role="group">
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
                  onClick={() => handleBedroomClick("4+")}
                  type="button"
                  className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white  rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  ${
                    NoOfBedrooms === "4+"
                      ? "border-black border-2 dark:border-white"
                      : "border border-gray-200"
                  }`}
                >
                  4+
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
              <div className="inline-flex rounded-md shadow-sm" role="group">
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
                  onClick={() => setNoOfBathrooms("4+")}
                  type="button"
                  className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white  rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  ${
                    NoOfBathrooms === "4+"
                      ? "border-black border-2 dark:border-white"
                      : "border border-gray-200"
                  }`}
                >
                  4+
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
          <div className="pt-6 flex flex-col gap-y-3" id="filter-section-0">
            <Checkbox
              value="Any"
              radius="small"
              onChange={handleFurnishingType}
              isSelected={Furnishing.includes("Any")}
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
  );
};

export default DesktopViewFilter;
