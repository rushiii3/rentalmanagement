import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion as m } from "framer-motion";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { States, City } from "../../../../../statecities";
import { useFormContext } from "react-hook-form";

const Location = () => {
  const {
    register,
    formState: { errors },
    control: { _formValues },
    setValue,
    trigger
  } = useFormContext();
  const [API_KEY] = useState("J4kHneKBdjILQG6r8F80");
  const [Cities, setCities] = useState([]);
  const [SelectedState, setSelectedState] = useState();
  const [selectedCity, setSelectedCity] = useState("");

  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(72.877426);
  const [lat, setLat] = useState(19.07609);
  const [zoom] = useState(15);
  const [marker, setMarker] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initializedMap = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng,lat ],
      zoom: zoom,
    });
    initializedMap.addControl(new maplibregl.NavigationControl(), "top-right");
    setMap(initializedMap);

    return () => {
      if (initializedMap) {
        initializedMap.remove();
      }
    };
  }, [API_KEY, lat, lng, zoom]);

  useEffect(() => {
    if (!map) return;

    const newMarker = new maplibregl.Marker({ draggable: true })
      .setLngLat([lng, lat])
      .addTo(map);

    function onDragEnd() {
      const lngLat = newMarker.getLngLat();
      setLat(lngLat.lat);
      setLng(lngLat.lng);
      console.log(lngLat);
      setValue("latitude", lngLat.lat);
      setValue("longitude", lngLat.lng);
      trigger(["latitude", "longitude"]);
    }

    newMarker.on('dragend', onDragEnd);
    setMarker(newMarker);

    return () => {
      if (newMarker) {
        newMarker.remove();
      }
    };
  }, [map, lat, lng]);
  
  
  
  
  
  const container = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        delay: 0.25,
      },
    },
  };
  useEffect(() => {
    // Set the selected city when the component mounts or when state changes
    if (_formValues.state) {
      const city = City.filter((city) => _formValues.state === city.state).map(
        (city) => city.name
      );
      setCities(city[0]);
      setSelectedCity(_formValues.city || ""); // Set the previously selected city or empty string
    }
  }, [_formValues.state, _formValues.city]);
  const handleCityChange = (e) => {
    setSelectedState(e.target.value);
    const selectedState = e.target.value;
    const city = City.filter((city) => selectedState === city.state).map((city) => city.name);
    setCities(city[0]);
    setSelectedCity(""); // Reset selected city when state changes
  };
  return (
    <m.div
      className="w-full p-4 items-start flex-col rounded-xl shadow-2xl lg:shadow-none text-left bg-white  transform -translate-y-20 max-w-full overflow-hidden md:p-8 md:mt-0 md:text-left  lg:transform-none md:max-w-full md:w-full"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <h1 className="text-2xl font-bold text-marine-blue mb-2 md:text-3xl md:mb-1">
        LOCATION
      </h1>
      {/* <p className="text-cool-gray mb-4">
        Please provide your name, email address, and phone number.
      </p> */}

      <div className="w-full mt-5">
        <div className="mt-5 gap-3 flex flex-col lg:flex-row">
          <div className="w-full">
            <label
              htmlFor="username-error"
              className={`block mb-2 text-sm font-medium ${
                errors.buildingName?.message
                  ? "text-red-700 dark:text-red-500"
                  : ""
              } `}
            >
              Building name / Chawal name
            </label>
            <input
              {...register("buildingName")}
              type="text"
              id="username-error"
              class={`block p-2.5 w-full text-sm  rounded-lg border ${
                errors.buildingName?.message
                  ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                  : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }  
            `}
              placeholder="Enter your building name / chawal name"
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.buildingName?.message}
            </p>
          </div>
          <div className="w-full">
            <label
              htmlFor="username-error"
              className={`block mb-2 text-sm font-medium ${
                errors.buildingNumber?.message
                  ? "text-red-700 dark:text-red-500"
                  : ""
              } `}
            >
              Building Number / Room Number
            </label>
            <input
              {...register("buildingNumber")}
              type="text"
              id="username-error"
              class={`block p-2.5 w-full text-sm  rounded-lg border ${
                errors.buildingNumber?.message
                  ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                  : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }  
            `}
              placeholder="Enter your building number or room number"
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.buildingNumber?.message}
            </p>
          </div>
        </div>
        <div className="mt-5 gap-3 flex flex-col lg:flex-row">
          <div className="w-full">
            <label
              htmlFor="username-error"
              className={`block mb-2 text-sm font-medium ${
                errors.streetAddress?.message
                  ? "text-red-700 dark:text-red-500"
                  : ""
              } `}
            >
              Street Address
            </label>
            <input
              {...register("streetAddress")}
              type="text"
              id="username-error"
              class={`block p-2.5 w-full text-sm  rounded-lg border ${
                errors.streetAddress?.message
                  ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                  : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }  
            `}
              placeholder="Enter your building name / chawal name"
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.streetAddress?.message}
            </p>
          </div>
          <div className="w-full">
            <label
              htmlFor="username-error"
              className={`block mb-2 text-sm font-medium ${
                errors.locality?.message ? "text-red-700 dark:text-red-500" : ""
              } `}
            >
              Locality
            </label>
            <input
              {...register("locality")}
              type="text"
              id="username-error"
              class={`block p-2.5 w-full text-sm  rounded-lg border ${
                errors.locality?.message
                  ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                  : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }  
            `}
              placeholder="Enter your locality"
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.locality?.message}
            </p>
          </div>
        </div>

        <div className="mt-5 gap-3 flex flex-col lg:flex-row">
          <div className="w-full">
            <label
              for="username-error"
              className={`block mb-2 text-sm font-medium ${
                errors.state?.message ? "text-red-700 dark:text-red-500" : ""
              } `}
            >
              State
            </label>
            <select
              id="countries"
              {...register("state")}
              class={`block p-2.5 w-full text-sm  rounded-lg border ${
                errors.state?.message
                  ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                  : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }  
`}
              onChange={handleCityChange}
            >
              <option selected="">Select state</option>
              {States.map((value, key) => (
                <option value={value.name} key={key}>
                  {value.name}
                </option>
              ))}
            </select>

            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.state?.message}
            </p>
          </div>
          <div className="w-full">
            <label
              for="username-error"
              className={`block mb-2 text-sm font-medium ${
                errors.city?.message ? "text-red-700 dark:text-red-500" : ""
              } `}
            >
              City
            </label>
            <select
              value={selectedCity} // Set the selected city value from state
              onChange={(e) => setSelectedCity(e.target.value)} // Update selected city
              id="countries"
              {...register("city")}
              class={`block p-2.5 w-full text-sm  rounded-lg border ${
                errors.city?.message
                  ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                  : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }`}
            >
              {Cities && Cities.length !== 0 ? (
                <>
                  <option selected="">Select city</option>
                  {Cities.map((value, key) => (
                    <option value={value} key={key}>
                      {value}
                    </option>
                  ))}
                </>
              ) : (
                <option selected="">Select state first</option>
              )}
            </select>

            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.city?.message}
            </p>
          </div>

          <div className="w-full">
            <label
              htmlFor="username-error"
              className={`block mb-2 text-sm font-medium ${
                errors.city?.message ? "text-red-700 dark:text-red-500" : ""
              } `}
            >
              Pincode
            </label>
            <input
              maxLength="6"
              {...register("pincode")}
              type="number"
              id="username-error"
              class={`block p-2.5 w-full text-sm  rounded-lg border ${
                errors.pincode?.message
                  ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                  : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }  
            `}
              placeholder="Enter your pincode"
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.pincode?.message}
            </p>
          </div>
        </div>
        <div className="map-wrap rounded-lg relative my-4">
          <div ref={mapContainerRef} className="map rounded-lg" />
        </div>

        <div className="mt-5 gap-3 flex flex-col lg:flex-row">
          <div className="w-full">
            <label
              htmlFor="username-error"
              className={`block mb-2 text-sm font-medium ${
                errors.latitude?.message ? "text-red-700 dark:text-red-500" : ""
              } `}
            >
              Latitude
            </label>
            <input
              
              // {...register("latitude")}
              type="text"
              readOnly
              id="username-error"
              defaultValue={lat}
              class={`block p-2.5 w-full text-sm  rounded-lg border ${
                errors.latitude?.message
                  ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                  : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }  
            `}
              placeholder="Enter latitude"
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.latitude?.message}
            </p>
          </div>

          <div className="w-full">
            <label
              htmlFor="username-error"
              className={`block mb-2 text-sm font-medium ${
                errors.longitude?.message
                  ? "text-red-700 dark:text-red-500"
                  : ""
              } `}
            >
              Longitude
            </label>
            <input
              
              readOnly
              // {...register("longitude")}
              value={lng}
              type="text"
              id="username-error"
              class={`block p-2.5 w-full text-sm  rounded-lg border ${
                errors.longitude?.message
                  ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                  : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }  
            `}
              placeholder="Enter longitude"
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.longitude?.message}
            </p>
          </div>
        </div>
      </div>
    </m.div>
  );
};

export default Location;
