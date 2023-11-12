import React from "react";

const Testimonals = () => {
  const testimonals = [
    {
      name: "Amanda Thompson",
      review:
        "This platform allowed me to double my rental property portfolio!",
        image : "https://static.demilked.com/wp-content/uploads/2021/01/5ffc174cf3049-CAxq9rUst5--png__700.jpg",
    },
    {
      name: "Rick Johnson",
      review:
        "My tenants love how easy it is to communicate with me.",
        image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaFrj27bRQbXOiQcUkzyW8OlFKIcTGMsFS-w&usqp=CAU",
    },
    {
      name: "Cynthia Green",
      review:
        "I saved so much time in managing my properties.",
        image : "https://thechive.com/wp-content/uploads/2019/04/celebrity-faces-blended-together-4.jpg?attachment_cache_bust=2837928&quality=85&strip=info&w=400",
    },
  ];
  return (
    <div>
      <section>
        <div class="mx-auto max-w-[1340px] px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
          <div class="max-w-7xl items-end justify-between sm:flex sm:pe-6 lg:pe-8">
            <h2 class="max-w-xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              Read trusted reviews from our customers
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-3 mt-10">
          {testimonals.map((value,key) => (
                <Card key={key} name={value.name} review={value.review} image={value.image}/>
              ))}
              
           
              
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonals;

export  const Card = (props) => {
    return (
        <div class="overflow-hidden shadow-lg w-full rounded-2xl">
  <div class="keen-slider__slide">
    <blockquote class="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8 lg:p-12 dark:border-gray-700 dark:bg-gray-800 ">
      <div>
        <div class="flex gap-0.5 text-green-500">
          <svg
            class="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>

          <svg
            class="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>

          <svg
            class="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>

          <svg
            class="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>

          <svg
            class="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>

        <div class="mt-4">
          <div class="flex items-center">
            <img
              class="w-10 h-10 rounded-full mr-4"
              src={props.image}
              alt="Avatar of Jonathan Reinink"
            />
            <div class="text-sm">
              <p class="text-gray-900 leading-none dark:text-white">
                {props.name}
              </p>
            </div>
          </div>

          <p class="mt-4 leading-relaxed text-gray-700 dark:text-white">
            {props.review}
          </p>
        </div>
      </div>
    </blockquote>
  </div>
  </div>
)};
