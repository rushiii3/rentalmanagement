import React, { useEffect, useRef, useState } from 'react'
import { motion as m } from "framer-motion";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Select, SelectItem, Input } from "@nextui-org/react";

const Location = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(72.877426);
    const [lat] = useState(19.07609);
    const [zoom] = useState(15);
    const [API_KEY] = useState("J4kHneKBdjILQG6r8F80");
    useEffect(() => {
        if (!map.current) {
          map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
            center: [lng, lat],
            zoom: zoom,
          });
          map.current.addControl(new maplibregl.NavigationControl(), "top-right");
        }
      }, [API_KEY, lng, lat, zoom]);
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
      <div className="map-wrap rounded-lg relative">
          <div ref={mapContainer} className="map rounded-lg" />
        </div>
        <div className="mt-5 gap-3 flex flex-col lg:flex-row">
          <Input
            size="lg"
            labelPlacement="outside"
            variant="bordered"
            type="email"
            label="Email"
            placeholder="Enter your email"
            classNames={{
              label: "font-medium text-default-700 text-medium",
            }}
          />
          <Input
            size="lg"
            labelPlacement="outside"
            variant="bordered"
            type="email"
            label="Email"
            placeholder="Enter your email"
            classNames={{
              label: "font-medium text-default-700 text-medium",
            }}
          />
        </div>
        <div className="mt-5 gap-3 flex flex-col lg:flex-row">
          <Input
            size="lg"
            labelPlacement="outside"
            variant="bordered"
            type="email"
            label="Email"
            placeholder="Enter your email"
            classNames={{
              label: "font-medium text-default-700 text-medium",
            }}
          />
          <Input
            size="lg"
            labelPlacement="outside"
            variant="bordered"
            type="email"
            label="Email"
            placeholder="Enter your email"
            classNames={{
              label: "font-medium text-default-700 text-medium",
            }}
          />
        </div>
        <div className="mt-5 gap-3 flex flex-col lg:flex-row">
          <Input
            size="lg"
            labelPlacement="outside"
            variant="bordered"
            type="email"
            label="Email"
            placeholder="Enter your email"
            classNames={{
              label: "font-medium text-default-700 text-medium",
            }}
          />
          <Input
            size="lg"
            labelPlacement="outside"
            variant="bordered"
            type="email"
            label="Email"
            placeholder="Enter your email"
            classNames={{
              label: "font-medium text-default-700 text-medium",
            }}
          />
        </div>
      </div>

    </m.div>
  )
}

export default Location