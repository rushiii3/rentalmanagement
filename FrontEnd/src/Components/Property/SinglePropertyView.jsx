import React, { useEffect, useState } from "react";
import Footer from "../Layouts/Footers/Footer";
import axios from "axios";
import { propertServer } from "../../server";
import { useParams } from "react-router-dom";
import Details from "./SingleProerty/Details";
import Description from "./SingleProerty/Description";
import Address from "./SingleProerty/Address";
import Review from "./SingleProerty/Review";
import NearBy from "./SingleProerty/NearBy";
import Loader from "../Loader/loader";
import ErrorPage from "../Loader/ErrorPage";
import Schedule from "./SingleProerty/Schedule";
import { useSelector } from "react-redux";
const SinglePropertyView = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { id } = useParams();
  const [Data, setData] = useState(null);
  const [imagesVideos, setImagesVideos] = useState({ images: [], videos: [] });
  const combinedMedia = [...imagesVideos.images.map((value)=>value.url), ...imagesVideos.videos.map((value)=>value.url)];
  const [currentImage, setCurrentImage] = useState({
    image: null,
    video: null,
  });
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [Reviews, setReviews] = useState([]);
  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${propertServer}/property/${id}`);
      setData(data.property);
      setReviews(data.review);
      if (data && data.property.images && data.property.videos) {
        setImagesVideos({
          images: data.property.images,
          videos:  data.property.videos,
        });
        setCurrentImage({ image: data.property.images[0].url, video: null });
      }
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    // window.scrollTo(0, 0);
    getData();
  }, []);

  return Loading === true ? (
    <Loader />
  ) : Error===true ? (
    <ErrorPage message={"There's no such property exists."}/>
  ):
  
  (
    <section>
      <div className="container mx-auto px-2 pb-10">
        {/* details component */}
        <Details
          Data={Data}
          combinedMedia={combinedMedia}
          imagesVideos={imagesVideos}
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
          user={user}
          isAuthenticated={isAuthenticated}
          id={id}
        />
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-6 lg:gap-16">
          <div className="lg:col-span-4 lg:row-end-1">
            {/* description */}
            <Description Data={Data} />

            {/* address */}
            <Address Data={Data} />

            {/* map / Near by */}
            <NearBy Data={Data} />

            {/* review */}
            <Review Reviews={Reviews}/>
          </div>
          {/* Schedule tour */}
          <div className="lg:col-span-3 lg:row-span-2 lg:row-end-2">
            <div className="flex flex-col h-auto w-full">
              <Schedule id={id}  Data={Data}/>
            </div>
          </div>
        </div>
      </div>
    <div className="mb-14 lg:mb-0">
    <Footer/>
    </div>
      
    </section>
  );
};

export default SinglePropertyView;
