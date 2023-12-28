import React from "react";
import { IoImages } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
const ImageVideoCarousal = ({ImageVideoData,deleteImage,setModalViewer,setModelOpen}) => {
  const handleView = (type,url) => {
    setModalViewer({type:type,url:url});
    setModelOpen(true);
  }
  return (
    <div className="flex flex-row overflow-x-scroll gap-x-10 no-scrollbar mt-5 max-w-2xl">
      {ImageVideoData && ImageVideoData.length !== 0 ? (
        ImageVideoData.map((value, key) => (
          <div
            className="flex-shrink-0 aspect-square h-20  overflow-hidden rounded-lg text-center"
            key={key}
          >
            <article
              tabIndex="0"
              className="group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm"
            >
              {value.type === "image" ? (
                <img
                  alt="upload preview"
                  src={value.url}
                  className="img-preview w-full h-full sticky object-cover rounded-lg bg-fixed"
                />
              ) : (
                <video
                  className="img-preview w-full h-full sticky object-cover rounded-lg bg-fixed"
                  controls
                >
                  <source src={value.url} />
                  Your browser does not support the video tag.
                </video>
              )}

              <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                <div className="flex">
                  <span className="p-1 hover:bg-gray-300 rounded-lg hover:text-black">
                    <button type="button" onClick={()=>(handleView(value.type,value.url))}>
                    <IoImages size={20} />
                    </button>
                  </span>

                  <p className="p-1 size text-xs"></p>
                  <button
                    type="button"
                    onClick={() => deleteImage(value.deleteToken)}
                    className="delete ml-auto focus:outline-none hover:bg-gray-300 hover:text-black p-1 rounded-lg"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </section>
            </article>
          </div>
        ))
      ) : (
        <div
          id="empty"
          class="h-full w-full text-center flex flex-col items-center justify-center "
        >
          <img
            class="mx-auto w-32"
            src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
            alt="no data"
          />
          <span class="text-small text-gray-500">No files selected</span>
        </div>
      )}
    </div>
  );
};

export default ImageVideoCarousal;
