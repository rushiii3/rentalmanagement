import React, {useEffect, useState } from "react";
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
import axios from "axios";
import { propertServer } from "../../server";
import { useParams } from "react-router-dom";
import Details from "./SingleProerty/Details";
import Description from "./SingleProerty/Description";
import Address from "./SingleProerty/Address";
import Review from "./SingleProerty/Review";
import NearBy from "./SingleProerty/NearBy";
import Loader from "../Loader/loader";

const SinglePropertyView = () => {
  const { id } = useParams();
  const [selected, setSelected] = React.useState("login");
  const [Data, setData] = useState(null);
  const [imagesVideos, setImagesVideos] = useState({ images: [], videos: [] });
  const combinedMedia = [...imagesVideos.images, ...imagesVideos.videos];
  const [currentImage, setCurrentImage] = useState({
    image: null,
    video: null,
  });
const [Loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${propertServer}/property/${id}`);
      setData(data);
      console.log(data);
      if (data && data.images && data.videos) {
        setImagesVideos({
          images: data.images,
          videos: data.videos,
        });
        setCurrentImage({ image: data.images[0], video: null });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    // window.scrollTo(0, 0);
    getData();
  }, []);


  return (

      Loading===true ? (<Loader />) : (
        <section>
      <div className="container mx-auto px-2 pb-10">
      {/* details component */}
        <Details Data={Data} combinedMedia={combinedMedia} imagesVideos={imagesVideos} currentImage={currentImage} setCurrentImage={setCurrentImage}/> 
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-6 lg:gap-16">
          <div className="lg:col-span-4 lg:row-end-1">
            {/* description */}
            <Description Data={Data}/>

            {/* address */}
            <Address Data={Data}/>

            {/* map / Near by */}
            <NearBy Data={Data}/>

            {/* review */}
            <Review />
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
      )

    
  );
};

export default SinglePropertyView;
