import React, { useEffect, useRef, useState } from "react";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { MdOutlineDirectionsRailway } from "react-icons/md";
import { BsBusFrontFill } from "react-icons/bs";
import { FaRegHospital, FaShoppingCart } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";
import { Tabs, Tab } from "@nextui-org/react";
import * as turf from "@turf/turf";
import axios from "axios";

const NearBy = ({ Data }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(72.877426);
  const [lat] = useState(19.07609);
  const [zoom] = useState(15);
  const [API_KEY] = useState("J4kHneKBdjILQG6r8F80");
  const [Bus, setBus] = useState([]);
  const [TrainData, setTrainData] = useState([]);
  const [SchoolData, setSchoolData] = useState([]);
  const [HospitalData, setHospitalData] = useState([]);
  const [MallsData, setMallsData] = useState([]);
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

  const addCircleToMap = (mapInstance, centerCoordinates) => {
    const center = turf.point(centerCoordinates);
    const options = { steps: 64, units: "kilometers" };
    const circle = turf.circle(center, 1, options);

    mapInstance.on("style.load", () => {
      mapInstance.addSource("circle-source", {
        type: "geojson",
        data: circle,
      });

      mapInstance.addLayer({
        id: "circle-layer",
        type: "fill",
        source: "circle-source",
        paint: {
          "fill-color": "#3366FF",
          "fill-opacity": 0.5,
        },
      });
    });
  };

  const getGEOdata = async (longitude, latitude) => {
    try {
      console.log(longitude);
      const busdata = await axios.get(
        "https://api.geoapify.com/v2/places?categories=public_transport.bus&filter=circle:" +
          longitude +
          "," +
          latitude +
          ",1000&bias=proximity:72.92763004995084,19.138128898604606&limit=20&apiKey=c812604000de4ba782f0e21ac705694b"
      );
      const traindata = await axios.get(
        "https://api.geoapify.com/v2/places?categories=public_transport.train&filter=circle:" +
          longitude +
          "," +
          latitude +
          ",1000&bias=proximity:72.92763004995084,19.138128898604606&limit=20&apiKey=c812604000de4ba782f0e21ac705694b"
      );
      const schooldata = await axios.get(
        "https://api.geoapify.com/v2/places?categories=education.school&filter=circle:" +
          longitude +
          "," +
          latitude +
          ",1000&bias=proximity:72.92763004995084,19.138128898604606&limit=20&apiKey=c812604000de4ba782f0e21ac705694b"
      );
      const hospitaldata = await axios.get(
        "https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:" +
          longitude +
          "," +
          latitude +
          ",1000&bias=proximity:72.92763004995084,19.138128898604606&limit=20&apiKey=c812604000de4ba782f0e21ac705694b"
      );
      const mallsdata = await axios.get(
        "https://api.geoapify.com/v2/places?categories=commercial.shopping_mall&filter=circle:" +
          longitude +
          "," +
          latitude +
          ",1000&bias=proximity:72.92763004995084,19.138128898604606&limit=20&apiKey=c812604000de4ba782f0e21ac705694b"
      );
      console.log(busdata.data.features);
      setBus(busdata.data.features);
      setTrainData(traindata.data.features);
      setSchoolData(schooldata.data.features);
      setHospitalData(hospitaldata.data.features);
      setMallsData(mallsdata.data.features);
    } catch (error) {}
  };

  useEffect(() => {
    if (
      Data &&
      Data.property_coordinates.longitude &&
      Data.property_coordinates.latitude
    ) {
      const marker = new maplibregl.Marker({ color: "#FF0000" })
        .setLngLat([
          Data.property_coordinates?.longitude,
          Number(Data.property_coordinates?.latitude),
        ])
        .addTo(map.current);

      map.current.flyTo({
        center: [
          Data.property_coordinates?.longitude,
          Number(Data.property_coordinates?.latitude),
        ],
        zoom: 14,
        speed: 2,
        curve: 1,
        easing: (t) => t,
        essential: true,
      });
      getGEOdata(
        Data.property_coordinates?.longitude,
        Number(Data.property_coordinates?.latitude)
      );
      console.log("yes");
      // Adding the circle to the map after the marker is added
      addCircleToMap(map.current, [
        Data.property_coordinates?.longitude,
        Number(Data.property_coordinates?.latitude),
      ]);
    }
  }, [Data]);
  // Define marker arrays to store added markers
  let busMarkers = [];
  let hospitalMarkers = [];
  let railwayMarkers = [];
  let shoppingMallMarkers = [];
  let schoolMarkers = [];
  const ChangeSelection = (value) => {

    // Function to remove markers from the map
    const removeMarkers = (markers) => {
      markers.forEach((marker) => {
        marker.remove();
      });
      // Reset the markers array
      markers = [];
    };
    // railway stations
    if (value === "railway_stations") {
      removeMarkers(hospitalMarkers);
      removeMarkers(busMarkers);
      removeMarkers(shoppingMallMarkers);
      removeMarkers(schoolMarkers);
      if (TrainData && TrainData.length !== 0) {
        railwayMarkers = TrainData.map((trainStation) => {
          const markerPopup = new maplibregl.Popup({
            closeOnClick: true,
          }).setHTML(`<b>${trainStation?.properties?.name}</b>`);

          const el = document.createElement("div");
          el.className = "train-station-marker";

          return new maplibregl.Marker({
            className: "train-station-marker",
            element: el,
          })
            .setLngLat([
              trainStation?.properties?.lon,
              trainStation?.properties?.lat,
            ])
            .addTo(map.current)
            .setPopup(markerPopup);
        });
      } else {
        console.log("No train stations nearby");
      }
    }

    // bus stops
    if (value === "bus_stops") {
      removeMarkers(hospitalMarkers);
      removeMarkers(railwayMarkers);
      removeMarkers(shoppingMallMarkers);
      removeMarkers(schoolMarkers); // Remove hospital markers if any
      if (Bus && Bus.length !== 0) {
        busMarkers = Bus.map((busStop) => {
          const markerPopup = new maplibregl.Popup({
            closeOnClick: true,
          }).setHTML(`<b>${busStop?.properties?.name}</b>`);

          const el = document.createElement("div");
          el.className = "bus-stop-marker";

          return new maplibregl.Marker({
            className: "bus-stop-marker",
            element: el,
          })
            .setLngLat([busStop?.properties?.lon, busStop?.properties?.lat])
            .addTo(map.current)
            .setPopup(markerPopup);
        });
      } else {
        console.log("No bus stops nearby");
      }
    }

    if (value === "hospitals") {
      removeMarkers(busMarkers);
      removeMarkers(railwayMarkers);
      removeMarkers(shoppingMallMarkers);
      removeMarkers(schoolMarkers); // Remove bus markers if any
      if (HospitalData && HospitalData.length !== 0) {
        hospitalMarkers = HospitalData.map((hospital) => {
          const markerPopup = new maplibregl.Popup({
            closeOnClick: true,
          }).setHTML(`<b>${hospital?.properties?.name}</b>`);

          const el = document.createElement("div");
          el.className = "hospital-marker";

          return new maplibregl.Marker({
            className: "hospital-marker",
            element: el,
          })
            .setLngLat([hospital?.properties?.lon, hospital?.properties?.lat])
            .addTo(map.current)
            .setPopup(markerPopup);
        });
      } else {
        console.log("No hospitals nearby");
      }
    }
    if (value === "shopping_malls") {
      removeMarkers(busMarkers);
      removeMarkers(railwayMarkers);
      removeMarkers(hospitalMarkers);
      removeMarkers(schoolMarkers); // Remove hospital markers if any
      if (MallsData && MallsData.length !== 0) {
        shoppingMallMarkers = MallsData.map((mall) => {
          const markerPopup = new maplibregl.Popup({
            closeOnClick: true,
          }).setHTML(`<b>${mall?.properties?.name}</b>`);

          const el = document.createElement("div");
          el.className = "shopping-mall-marker";

          return new maplibregl.Marker({
            className: "shopping-mall-marker",
            element: el,
          })
            .setLngLat([mall?.properties?.lon, mall?.properties?.lat])
            .addTo(map.current)
            .setPopup(markerPopup);
        });
      } else {
        console.log("No shopping malls nearby");
      }
    }

    if (value === "school") {
      removeMarkers(busMarkers);
      removeMarkers(railwayMarkers);
      removeMarkers(hospitalMarkers);
      removeMarkers(shoppingMallMarkers); // Remove hospital markers if any
      if (SchoolData && SchoolData.length !== 0) {
        schoolMarkers = SchoolData.map((school) => {
          const markerPopup = new maplibregl.Popup({
            closeOnClick: true,
          }).setHTML(`<b>${school?.properties?.name}</b>`);

          const el = document.createElement("div");
          el.className = "school-marker";

          return new maplibregl.Marker({
            className: "school-marker",
            element: el,
          })
            .setLngLat([school?.properties?.lon, school?.properties?.lat])
            .addTo(map.current)
            .setPopup(markerPopup);
        });
      } else {
        console.log("No schools nearby");
      }
    }
  };

  return (
    <Card className="max-w-full mt-5">
      <CardHeader className="flex gap-3">
        <h1 className="text-2xl font-bold">Whats near by</h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="map-wrap rounded-lg">
          <div ref={mapContainer} className="map rounded-lg" />
        </div>
        <Tabs
          fullWidth
          size="md"
          aria-label="Tabs form"
          // selectedKey={selected}
          onSelectionChange={ChangeSelection}
          className="mt-4"
        >
          <Tab key="railway_stations" title="Railway Stations">
            {TrainData && TrainData.length !== 0 ? (
              TrainData.map((value, key) => (
                <div
                  key={key}
                  class="py-3 px-5 w-full mx-auto bg-white space-y-0 border-b mb-2 flex items-center space-x-6 dark:bg-zinc-900"
                >
                  <span className="border rounded-full p-3">
                    <MdOutlineDirectionsRailway size={40} />
                  </span>
                  <div class="text-center space-y-2 sm:text-left ">
                    <div class="space-y-0.5">
                      <p class="text-lg text-black font-semibold dark:text-white">
                        {value?.properties?.name
                          ? value?.properties?.name
                          : "Not Available"}
                      </p>
                      <p class="text-slate-500 text-sm font-medium">
                        Distance : {value?.properties?.distance} mile
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div class="py-3 px-5 w-full mx-auto bg-white space-y-0  flex items-center space-x-6 dark:bg-zinc-900">
                <div class="text-center space-y-2 sm:text-left ">
                  <div class="space-y-0.5">
                    <p class="text-lg text-black font-semibold dark:text-white">
                      No Railway Stations near by
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Tab>
          <Tab key="bus_stops" title="Bus Stops">
            {Bus && Bus.length !== 0 ? (
              Bus.map((value, key) => (
                <div
                  key={key}
                  class="py-3 px-5 w-full mx-auto bg-white space-y-0 border-b mb-2 flex items-center space-x-6 dark:bg-zinc-900"
                >
                  <span className="border rounded-full p-3">
                    <BsBusFrontFill size={40} />
                  </span>
                  <div class="text-center space-y-2 sm:text-left ">
                    <div class="space-y-0.5">
                      <p class="text-lg text-black font-semibold dark:text-white">
                        {value?.properties?.name
                          ? value?.properties?.name
                          : "Not Available"}
                      </p>
                      <p class="text-slate-500 text-sm font-medium">
                        Distance : {value?.properties?.distance} mile
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div class="py-3 px-5 w-full mx-auto bg-white space-y-0  flex items-center space-x-6 dark:bg-zinc-900">
                <div class="text-center space-y-2 sm:text-left ">
                  <div class="space-y-0.5">
                    <p class="text-lg text-black font-semibold dark:text-white">
                      No Bus Stops near by
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Tab>
          <Tab key="hospitals" title="Hospitals">
            {HospitalData && HospitalData.length !== 0 ? (
              HospitalData.map((value, key) => (
                <div
                  key={key}
                  class="py-3 px-5 w-full mx-auto bg-white space-y-0 border-b mb-2 flex items-center space-x-6 dark:bg-zinc-900"
                >
                  <span className="border rounded-full p-3">
                    <FaRegHospital size={40} />
                  </span>
                  <div class="text-center space-y-2 sm:text-left ">
                    <div class="space-y-0.5">
                      <p class="text-lg text-black font-semibold dark:text-white">
                        {value?.properties?.name
                          ? value?.properties?.name
                          : "Not Available"}
                      </p>
                      <p class="text-slate-500 text-sm font-medium">
                        Distance : {value?.properties?.distance} mile
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div class="py-3 px-5 w-full mx-auto bg-white space-y-0  flex items-center space-x-6 dark:bg-zinc-900">
                <div class="text-center space-y-2 sm:text-left ">
                  <div class="space-y-0.5">
                    <p class="text-lg text-black font-semibold dark:text-white">
                      No Hospitals near by
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Tab>
          <Tab key="shopping_malls" title="Shopping Malls">
            {MallsData && MallsData.length !== 0 ? (
              MallsData.map((value, key) => (
                <div
                  key={key}
                  class="py-3 px-5 w-full mx-auto bg-white space-y-0 border-b mb-2 flex items-center space-x-6 dark:bg-zinc-900"
                >
                  <span className="border rounded-full p-3">
                    <FaShoppingCart size={40} />
                  </span>
                  <div class="text-center space-y-2 sm:text-left ">
                    <div class="space-y-0.5">
                      <p class="text-lg text-black font-semibold dark:text-white">
                        {value?.properties?.name
                          ? value?.properties?.name
                          : "Not Available"}
                      </p>
                      <p class="text-slate-500 text-sm font-medium">
                        Distance : {value?.properties?.distance} mile
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div class="py-3 px-5 w-full mx-auto bg-white space-y-0  flex items-center space-x-6 dark:bg-zinc-900">
                <div class="text-center space-y-2 sm:text-left ">
                  <div class="space-y-0.5">
                    <p class="text-lg text-black font-semibold dark:text-white">
                      No Shopping Malls near by
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Tab>
          <Tab key="school" title="Schools">
            {SchoolData && SchoolData.length !== 0 ? (
              SchoolData.map((value, key) => (
                <div
                  key={key}
                  class="py-3 px-5 w-full mx-auto bg-white space-y-0 border-b mb-2 flex items-center space-x-6 dark:bg-zinc-900"
                >
                  <span className="border rounded-full p-3">
                    <IoSchoolSharp size={40} />
                  </span>
                  <div class="text-center space-y-2 sm:text-left ">
                    <div class="space-y-0.5">
                      <p class="text-lg text-black font-semibold dark:text-white">
                        {value?.properties?.name
                          ? value?.properties?.name
                          : "Not Available"}
                      </p>
                      <p class="text-slate-500 text-sm font-medium">
                        Distance : {value?.properties?.distance} mile
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div class="py-3 px-5 w-full mx-auto bg-white space-y-0  flex items-center space-x-6 dark:bg-zinc-900">
                <div class="text-center space-y-2 sm:text-left ">
                  <div class="space-y-0.5">
                    <p class="text-lg text-black font-semibold dark:text-white">
                      No Schools near by
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export default NearBy;
