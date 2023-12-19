import React, { useRef, useEffect, useState } from "react";
import Footer from "../Layouts/Footers/Footer";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";
import FsLightbox from "fslightbox-react";
import axios from "axios";
import { propertServer } from "../../server";
import { useParams } from "react-router-dom";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { BsHouse } from "react-icons/bs";
import { LuCalendarDays } from "react-icons/lu";
import { TbRulerMeasure } from "react-icons/tb";
import { BiCar } from "react-icons/bi";
import { GiSofa } from "react-icons/gi";
import { MdOutlinePeopleOutline } from "react-icons/md";
const SinglePropertyView = () => {
  const [toggler, setToggler] = useState(false);
  const { id } = useParams();
  const [selected, setSelected] = React.useState("login");
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(72.877426);
  const [lat] = useState(19.07609);
  const [zoom] = useState(15);
  const [API_KEY] = useState("J4kHneKBdjILQG6r8F80	");
  const [Data, setData] = useState(null);
  const getData = async () => {
    const { data } = await axios.get(`${propertServer}/property/${id}`);
    setData(data);
    console.log(data);
    new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat([
        data.property_coordinates?.longitude,
        Number(data.property_coordinates?.latitude),
      ])
      .addTo(map.current);

    map.current.flyTo({
      center: [
        data.property_coordinates?.longitude,
        Number(data.property_coordinates?.latitude),
      ],
      zoom: 15, // You can set the desired zoom level here
      speed: 2, // You can adjust the speed of the animation
      curve: 1, // You can adjust the curve of the animation
      easing: (t) => t, // You can define custom easing functions
      essential: true, // This ensures the animation is considered essential and not interrupted
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
  }, []);

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
  }, [API_KEY, lng, lat, zoom]);

  return (
    <section>
      <div className="container mx-auto px-2 pb-10">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          {/* image */}
          <div className="lg:col-span-3 lg:row-end-1">
            <FsLightbox
              toggler={toggler}
              sources={[
                "https://media.cnn.com/api/v1/images/stellar/prod/161122140823-wikkelhouse-1.jpg?q=w_1920,h_1080,x_0,y_0,c_fill/h_618",
                "https://res.cloudinary.com/demo/video/upload/ar_9:16,c_fill,g_auto,w_400/gautodemo/eltmkteifxtcmmfv0vzy.mp4",
                "https://demo-res.cloudinary.com/video/upload/f_auto/q_auto/w_600/v1/samples/cld-sample-video.webm",
              ]}
            />
            <div className="">
              <div>
                <div className="w-full overflow-hidden rounded-lg">
                  <button type="button" onClick={() => setToggler(!toggler)}>
                    <img
                      className="h-full w-full max-w-full object-cover"
                      src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg"
                      alt=""
                    />
                  </button>
                </div>
              </div>

              <div className="mt-5 ">
                <div className="flex flex-row overflow-x-scroll gap-x-10 no-scrollbar">
                  <button
                    type="button"
                    className=" flex-shrink-0 aspect-square h-20  overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg"
                      alt=""
                    />
                  </button>
                  <button
                    type="button"
                    className=" flex-shrink-0 aspect-square h-20  overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg"
                      alt=""
                    />
                  </button>
                  <button
                    type="button"
                    className=" flex-shrink-0 aspect-square h-20  overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg"
                      alt=""
                    />
                  </button>
                  <button
                    type="button"
                    className=" flex-shrink-0 aspect-square h-20  overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg"
                      alt=""
                    />
                  </button>
                  <button
                    type="button"
                    className=" flex-shrink-0 aspect-square h-20  overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg"
                      alt=""
                    />
                  </button>
                  <button
                    type="button"
                    className=" flex-shrink-0 aspect-square h-20  overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg"
                      alt=""
                    />
                  </button>
                  <button
                    type="button"
                    className=" flex-shrink-0 aspect-square h-20  overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg"
                      alt=""
                    />
                  </button>
                  <button
                    type="button"
                    className=" flex-shrink-0 aspect-square h-20  overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg"
                      alt=""
                    />
                  </button>
                  <button
                    type="button"
                    className=" flex-shrink-0 aspect-square h-20  overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg"
                      alt=""
                    />
                  </button>
                  <button
                    type="button"
                    className=" flex-shrink-0 aspect-square h-20  overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                  >
                    <img
                      className="h-full w-full object-cover"
                      src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* details */}
          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
              Afro-Brazillian Coffee
            </h1>
            <p className="mt-3">Overview</p>
            <div className="grid grid-cols-2 gap-5 my-3">
            
              <div class="flex items-center">
                <span className="border rounded-lg p-3">
                  <IoBedOutline size={30} />
                </span>

                <div className="ml-4">
                  <h6 className="mb-0">Bedroom</h6>
                  <p class="mb-0">{Data?.property_no_of_bhk}</p>
                </div>
              </div>
              <div class="flex items-center">
                <span className="border rounded-lg p-3">
                  <LiaBathSolid size={30} />
                </span>

                <div className="ml-4">
                  <h6 className="mb-0">Bath</h6>
                  <p class="mb-0">{Data?.property_bathrooms}</p>
                </div>
              </div>
              <div class="flex items-center">
                <span className="border rounded-lg p-3">
                  <BsHouse size={30} />
                </span>

                <div className="ml-4">
                  <h6 className="mb-0">Type</h6>
                  <p class="mb-0">{Data?.property_type_of_house}</p>
                </div>
              </div>
              <div class="flex items-center">
                <span className="border rounded-lg p-3">
                  <LuCalendarDays size={30} />
                </span>

                <div className="ml-4">
                  <h6 className="mb-0">Year Built</h6>
                  <p class="mb-0">{Data?.property_year_built}</p>
                </div>
              </div>
              <div class="flex items-center">
                <span className="border rounded-lg p-3">
                  <TbRulerMeasure size={30} />
                </span>

                <div className="ml-4">
                  <h6 className="mb-0">Sqft</h6>
                  <p class="mb-0">{Data?.property_size}</p>
                </div>
              </div>
              <div class="flex items-center">
                <span className="border rounded-lg p-3">
                  <BiCar size={30} />
                </span>

                <div className="ml-4">
                  <h6 className="mb-0">Parking</h6>
                  <p class="mb-0">{Data?.property_parking}</p>
                </div>
              </div>
              <div class="flex items-center">
                <span className="border rounded-lg p-3">
                  <GiSofa size={30} />
                </span>

                <div className="ml-4">
                  <h6 className="mb-0">Furnishing</h6>
                  <p class="mb-0">{Data?.property_furnishing}</p>
                </div>
              </div>
              <div class="flex items-center">
                <span className="border rounded-lg p-3">
                  <MdOutlinePeopleOutline size={30} />
                </span>

                <div className="ml-4">
                  <h6 className="mb-0">Available For</h6>
                  <p class="mb-0">{Data?.preferred_tenants.join(", ")} </p>
                </div>
              </div>
            </div>
            
            <div className="mt-5 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-end">
                <h1 className="text-3xl font-bold">
                  ₹{Data?.property_rent_price}
                </h1>
                <span className="text-base">/month</span>
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
              >
                Book Now
              </button>
            </div>
            <div class="py-8 px-0 w-full mx-auto bg-white space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 dark:bg-black">
              <img
                class="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
                src={Data?.landlord_id?.avatar?.url}
                alt="Woman's Face"
              />
              <div class="text-center space-y-2 sm:text-left ">
                <div class="space-y-0.5">
                  <p class="text-lg text-black font-semibold dark:text-white">
                    {Data?.landlord_id?.firstname} {Data?.landlord_id?.lastname}
                  </p>
                  {/* <p class="text-slate-500 font-medium">Product Engineer</p> */}
                </div>
                <button class="px-10 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-6 lg:gap-16">
          <div className="lg:col-span-4 lg:row-end-1">
            {/* description */}
            <div className="flow-root bg-white border border-gray-300 shadow-xl  rounded-2xl  p-4">
              <h1 className="text-2xl font-bold">Description</h1>
              <p className="mt-4">
              {Data?.property_description}
              </p>
            </div>
            {/* address */}
            <div className="flow-root bg-white border border-gray-300 shadow-xl  rounded-2xl mt-5 p-4">
              <p className="text-2xl font-bold">Address</p>
              <div class="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4 text-md">
                <div><span className="font-bold">{Data?.property_type === "BHK" ? "Building Number" : "House Number"}</span> : {Data?.building_number}</div>
                <div><span className="font-bold">{Data?.property_type === "BHK" ? "Building Name" : "Chawal Name"}</span> : {Data?.building_name}</div>
                <div><span className="font-bold">Street name</span> : {Data?.property_streetname}</div>
                <div><span className="font-bold">Locality</span> : {Data?.property_locality}</div>
                <div><span className="font-bold">State</span> : {Data?.property_state}</div>
                <div><span className="font-bold">City</span> : {Data?.property_city}</div>
                <div><span className="font-bold">Pincode</span> : {Data?.property_pincode}</div>

              </div>
            </div>
            {/* map  */}
            <div className="flow-root bg-white border border-gray-300 shadow-xl  rounded-2xl mt-5 p-4">
              <p className="text-3xl font-bold">Whats near by</p>
              <div className="map-wrap rounded-lg my-4">
                <div ref={mapContainer} className="map rounded-lg" />
              </div>
              <div>
                <div className="flex flex-col w-full">
                  <Card className="max-w-full hidden lg:block">
                    <CardBody className="overflow-hidden">
                      <h1 className="mb-8 text-3xl text-center">
                        Schedule a tour
                      </h1>
                      <Tabs
                        fullWidth
                        size="md"
                        aria-label="Tabs form"
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                      >
                        <Tab key="physicalvisit" title="Physical Visit">
                          <form className="flex flex-col gap-4">
                            <Input
                              isRequired
                              label="Email"
                              placeholder="Enter your email"
                              type="email"
                            />
                            <Input
                              isRequired
                              label="Password"
                              placeholder="Enter your password"
                              type="password"
                            />

                            <div className="flex gap-2 justify-end">
                              <Button fullWidth color="primary">
                                Login
                              </Button>
                            </div>
                          </form>
                        </Tab>
                        <Tab key="video-conference" title="Video Conference">
                          <form className="flex flex-col gap-4 h-[300px]">
                            <Input
                              isRequired
                              label="Name"
                              placeholder="Enter your name"
                              type="password"
                            />
                            <Input
                              isRequired
                              label="Email"
                              placeholder="Enter your email"
                              type="email"
                            />
                            <Input
                              isRequired
                              label="Password"
                              placeholder="Enter your password"
                              type="password"
                            />
                            <p className="text-center text-small">
                              Already have an account?{" "}
                              <Link
                                size="sm"
                                onPress={() => setSelected("login")}
                              >
                                Login
                              </Link>
                            </p>
                            <div className="flex gap-2 justify-end">
                              <Button fullWidth color="primary">
                                Sign up
                              </Button>
                            </div>
                          </form>
                        </Tab>
                        <Tab key="physicalvisit1" title="Physical Visit">
                          <form className="flex flex-col gap-4">
                            <Input
                              isRequired
                              label="Email"
                              placeholder="Enter your email"
                              type="email"
                            />
                            <Input
                              isRequired
                              label="Password"
                              placeholder="Enter your password"
                              type="password"
                            />

                            <div className="flex gap-2 justify-end">
                              <Button fullWidth color="primary">
                                Login
                              </Button>
                            </div>
                          </form>
                        </Tab>
                        <Tab key="video-conference2" title="Video Conference">
                          <form className="flex flex-col gap-4 h-[300px]">
                            <Input
                              isRequired
                              label="Name"
                              placeholder="Enter your name"
                              type="password"
                            />
                            <Input
                              isRequired
                              label="Email"
                              placeholder="Enter your email"
                              type="email"
                            />
                            <Input
                              isRequired
                              label="Password"
                              placeholder="Enter your password"
                              type="password"
                            />
                            <p className="text-center text-small">
                              Already have an account?{" "}
                              <Link
                                size="sm"
                                onPress={() => setSelected("login")}
                              >
                                Login
                              </Link>
                            </p>
                            <div className="flex gap-2 justify-end">
                              <Button fullWidth color="primary">
                                Sign up
                              </Button>
                            </div>
                          </form>
                        </Tab>
                        <Tab key="physicalvisit3" title="Physical Visit">
                          <form className="flex flex-col gap-4">
                            <Input
                              isRequired
                              label="Email"
                              placeholder="Enter your email"
                              type="email"
                            />
                            <Input
                              isRequired
                              label="Password"
                              placeholder="Enter your password"
                              type="password"
                            />

                            <div className="flex gap-2 justify-end">
                              <Button fullWidth color="primary">
                                Login
                              </Button>
                            </div>
                          </form>
                        </Tab>
                        <Tab key="video-conference4" title="Video Conference">
                          <form className="flex flex-col gap-4 h-[300px]">
                            <Input
                              isRequired
                              label="Name"
                              placeholder="Enter your name"
                              type="password"
                            />
                            <Input
                              isRequired
                              label="Email"
                              placeholder="Enter your email"
                              type="email"
                            />
                            <Input
                              isRequired
                              label="Password"
                              placeholder="Enter your password"
                              type="password"
                            />
                            <p className="text-center text-small">
                              Already have an account?{" "}
                              <Link
                                size="sm"
                                onPress={() => setSelected("login")}
                              >
                                Login
                              </Link>
                            </p>
                            <div className="flex gap-2 justify-end">
                              <Button fullWidth color="primary">
                                Sign up
                              </Button>
                            </div>
                          </form>
                        </Tab>
                      </Tabs>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
            {/* review */}
            <div className="flow-root bg-white border border-gray-300 shadow-xl  rounded-2xl mt-5 p-4 dark:border-0 dark:dark:divide-gray-700 dark:dark:bg-gray-900">
              <p className="text-3xl font-bold">Reviews</p>
              <div className="container flex flex-col w-full  p-6 mx-auto divide-y rounded-md dark:dark:divide-gray-700 dark:dark:bg-gray-900 dark:dark:text-gray-100">
                <div className="flex justify-between p-4">
                  <div className="flex space-x-4">
                    <div>
                      <img
                        src="https://source.unsplash.com/100x100/?portrait"
                        alt=""
                        className="object-cover w-12 h-12 rounded-full dark:dark:bg-gray-500"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">Leroy Jenkins</h4>
                      <span className="text-xs dark:dark:text-gray-400">
                        2 days ago
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 dark:dark:text-yellow-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 fill-current"
                    >
                      <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                    </svg>
                    <span className="text-xl font-bold">4.5</span>
                  </div>
                </div>
                <div className="p-4 space-y-2 text-sm dark:dark:text-gray-400">
                  <p>
                    Vivamus sit amet turpis leo. Praesent varius eleifend elit,
                    eu dictum lectus consequat vitae. Etiam ut dolor id justo
                    fringilla finibus.
                  </p>
                </div>
              </div>
              <div className="container flex flex-col w-full  p-6 mx-auto divide-y rounded-md dark:dark:divide-gray-700 dark:dark:bg-gray-900 dark:dark:text-gray-100">
                <div className="flex justify-between p-4">
                  <div className="flex space-x-4">
                    <div>
                      <img
                        src="https://source.unsplash.com/100x100/?portrait"
                        alt=""
                        className="object-cover w-12 h-12 rounded-full dark:dark:bg-gray-500"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">Leroy Jenkins</h4>
                      <span className="text-xs dark:dark:text-gray-400">
                        2 days ago
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 dark:dark:text-yellow-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 fill-current"
                    >
                      <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                    </svg>
                    <span className="text-xl font-bold">4.5</span>
                  </div>
                </div>
                <div className="p-4 space-y-2 text-sm dark:dark:text-gray-400">
                  <p>
                    Vivamus sit amet turpis leo. Praesent varius eleifend elit,
                    eu dictum lectus consequat vitae. Etiam ut dolor id justo
                    fringilla finibus.
                  </p>
                </div>
              </div>
              <div className="container flex flex-col w-full  p-6 mx-auto divide-y rounded-md dark:dark:divide-gray-700 dark:dark:bg-gray-900 dark:dark:text-gray-100">
                <div className="flex justify-between p-4">
                  <div className="flex space-x-4">
                    <div>
                      <img
                        src="https://source.unsplash.com/100x100/?portrait"
                        alt=""
                        className="object-cover w-12 h-12 rounded-full dark:dark:bg-gray-500"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">Leroy Jenkins</h4>
                      <span className="text-xs dark:dark:text-gray-400">
                        2 days ago
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 dark:dark:text-yellow-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 fill-current"
                    >
                      <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                    </svg>
                    <span className="text-xl font-bold">4.5</span>
                  </div>
                </div>
                <div className="p-4 space-y-2 text-sm dark:dark:text-gray-400">
                  <p>
                    Vivamus sit amet turpis leo. Praesent varius eleifend elit,
                    eu dictum lectus consequat vitae. Etiam ut dolor id justo
                    fringilla finibus.
                  </p>
                </div>
              </div>
              <div className="container flex flex-col w-full  p-6 mx-auto divide-y rounded-md dark:dark:divide-gray-700 dark:dark:bg-gray-900 dark:dark:text-gray-100">
                <div className="flex justify-between p-4">
                  <div className="flex space-x-4">
                    <div>
                      <img
                        src="https://source.unsplash.com/100x100/?portrait"
                        alt=""
                        className="object-cover w-12 h-12 rounded-full dark:dark:bg-gray-500"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">Leroy Jenkins</h4>
                      <span className="text-xs dark:dark:text-gray-400">
                        2 days ago
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 dark:dark:text-yellow-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 fill-current"
                    >
                      <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                    </svg>
                    <span className="text-xl font-bold">4.5</span>
                  </div>
                </div>
                <div className="p-4 space-y-2 text-sm dark:dark:text-gray-400">
                  <p>
                    Vivamus sit amet turpis leo. Praesent varius eleifend elit,
                    eu dictum lectus consequat vitae. Etiam ut dolor id justo
                    fringilla finibus.
                  </p>
                </div>
              </div>
              <div className="container flex flex-col w-full  p-6 mx-auto divide-y rounded-md dark:dark:divide-gray-700 dark:dark:bg-gray-900 dark:dark:text-gray-100">
                <div className="flex justify-between p-4">
                  <div className="flex space-x-4">
                    <div>
                      <img
                        src="https://source.unsplash.com/100x100/?portrait"
                        alt=""
                        className="object-cover w-12 h-12 rounded-full dark:dark:bg-gray-500"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">Leroy Jenkins</h4>
                      <span className="text-xs dark:dark:text-gray-400">
                        2 days ago
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 dark:dark:text-yellow-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 fill-current"
                    >
                      <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                    </svg>
                    <span className="text-xl font-bold">4.5</span>
                  </div>
                </div>
                <div className="p-4 space-y-2 text-sm dark:dark:text-gray-400">
                  <p>
                    Vivamus sit amet turpis leo. Praesent varius eleifend elit,
                    eu dictum lectus consequat vitae. Etiam ut dolor id justo
                    fringilla finibus.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Schedule tour */}
          <div className="lg:col-span-3 lg:row-span-2 lg:row-end-2">
            <div className="flex flex-col w-full">
              <Card className="max-w-full hidden lg:block">
                <CardBody className="overflow-hidden">
                  <h1 className="mb-8 text-3xl text-center">Schedule a tour</h1>
                  <Tabs
                    fullWidth
                    size="md"
                    aria-label="Tabs form"
                    selectedKey={selected}
                    onSelectionChange={setSelected}
                  >
                    <Tab key="physicalvisit" title="Physical Visit">
                      <form className="flex flex-col gap-4">
                        <Input
                          isRequired
                          label="Email"
                          placeholder="Enter your email"
                          type="email"
                        />
                        <Input
                          isRequired
                          label="Password"
                          placeholder="Enter your password"
                          type="password"
                        />

                        <div className="flex gap-2 justify-end">
                          <Button fullWidth color="primary">
                            Login
                          </Button>
                        </div>
                      </form>
                    </Tab>
                    <Tab key="video-conference" title="Video Conference">
                      <form className="flex flex-col gap-4 h-[300px]">
                        <Input
                          isRequired
                          label="Name"
                          placeholder="Enter your name"
                          type="password"
                        />
                        <Input
                          isRequired
                          label="Email"
                          placeholder="Enter your email"
                          type="email"
                        />
                        <Input
                          isRequired
                          label="Password"
                          placeholder="Enter your password"
                          type="password"
                        />
                        <p className="text-center text-small">
                          Already have an account?{" "}
                          <Link size="sm" onPress={() => setSelected("login")}>
                            Login
                          </Link>
                        </p>
                        <div className="flex gap-2 justify-end">
                          <Button fullWidth color="primary">
                            Sign up
                          </Button>
                        </div>
                      </form>
                    </Tab>
                  </Tabs>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default SinglePropertyView;
