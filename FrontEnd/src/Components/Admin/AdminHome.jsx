import React from "react";
import Clients from "./Components/Clients";
import { FaHouseChimney } from "react-icons/fa6";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const AdminHome = () => {
  const generateLabels = () => {
    const labels = [];
    for (let i = 1; i <= 15; i++) {
      labels.push(`2024-01-${i.toString().padStart(2, '0')}`); // Format: YYYY-MM-DD
    }
    return labels;
  };
  
  // Function to generate random data points
  const generateRandomData = () => {
    const data = [];
    for (let i = 0; i < 31; i++) {
      data.push(Math.floor(Math.random() * 10000)); // Generate random number between 0 and 100
    }
    return data;
  };
  
  const data = {
    labels: generateLabels(), // Generate labels for each day of January
    datasets: [
      {
        label: 'Transactions',
        data: generateRandomData(), // Generate random data points for January
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Credits Transaction',
        data: generateRandomData(), // Generate random data points for January
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  // Chart options
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Transactions / Month',
      },
    },
  };
  return (
    <>
      <section class="p-6 dark:bg-zinc-950 bg-gray-50">
        <section class=" mb-6 flex items-center justify-between">
          <div class="flex items-center justify-start">
            <span class="inline-flex justify-center items-center w-12 h-12 rounded-full bg-white text-black dark:bg-slate-900/70 dark:text-white mr-3">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                class="inline-block"
              >
                <path
                  fill="currentColor"
                  d="M3,14L3.5,14.07L8.07,9.5C7.89,8.85 8.06,8.11 8.59,7.59C9.37,6.8 10.63,6.8 11.41,7.59C11.94,8.11 12.11,8.85 11.93,9.5L14.5,12.07L15,12C15.18,12 15.35,12 15.5,12.07L19.07,8.5C19,8.35 19,8.18 19,8A2,2 0 0,1 21,6A2,2 0 0,1 23,8A2,2 0 0,1 21,10C20.82,10 20.65,10 20.5,9.93L16.93,13.5C17,13.65 17,13.82 17,14A2,2 0 0,1 15,16A2,2 0 0,1 13,14L13.07,13.5L10.5,10.93C10.18,11 9.82,11 9.5,10.93L4.93,15.5L5,16A2,2 0 0,1 3,18A2,2 0 0,1 1,16A2,2 0 0,1 3,14Z"
                ></path>
              </svg>
            </span>
            <h1 class="leading-tight text-3xl">Overview</h1>
          </div>
        </section>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6">
          <div class="bg-white flex  rounded-2xl flex-col dark:bg-slate-900/70">
            <div class="flex-1 p-6 undefined">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg leading-tight text-gray-500 dark:text-slate-400">
                    Clients
                  </h3>
                  <h1 class="text-3xl leading-tight font-semibold">
                    <div>512</div>
                  </h1>
                </div>
                <span class="inline-flex justify-center items-center  h-16 text-emerald-500">
                  <svg
                    viewBox="0 0 24 24"
                    width="48"
                    height="48"
                    class="inline-block"
                  >
                    <path
                      fill="currentColor"
                      d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div class="bg-white flex  rounded-2xl flex-col dark:bg-slate-900/70">
            <div class="flex-1 p-6 ">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg leading-tight text-gray-500 dark:text-slate-400">
                    Landlord
                  </h3>
                  <h1 class="text-3xl leading-tight font-semibold">
                    <div>$7,770</div>
                  </h1>
                </div>
                <span class="inline-flex justify-center items-center  h-16 text-blue-500">
                  <svg
                    version="1.1"
                    id="Layer_1"
                    // xmlns="http://www.w3.org/2000/svg"
                    // xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="48"
                    height="48"
                    viewBox="0 0 256 240"
                    // enable-background="new 0 0 256 240"
                    class="inline-block"
                    // xml:space="preserve"
                  >
                    <path
                      fill="currentColor"
                      d="M126.75,95.04h-8.38l-24.45,38.01l-2.95-28.46l4.02-9.64H76.96l4.02,9.64l-3.13,28.64L53.4,95.04h-9.82
	C20.65,95.04,2,113.78,2,136.62V238h29.09v-92.99H31c0-2.5,1.61-4.19,4.2-4.19c2.58,0,4.19,1.6,4.19,4.19V238h91.47v-92.99
	c0-2.5,1.61-4.19,4.19-4.19c2.5,0,4.2,1.6,4.2,4.19V238h29.09V136.62C168.34,113.69,149.6,95.04,126.75,95.04z M84.63,20.26
	c-18.38,0-33.28,14.9-33.28,33.28c0,18.39,14.9,33.29,33.28,33.29c18.39,0,33.29-14.9,33.29-33.29
	C117.92,35.16,103.02,20.26,84.63,20.26z M235,9V2h-39v7h-20v100h32V88h14v21h32V9H235z M202,73h-13V60h13V73z M202,54h-13V41h13V54
	z M202,35h-13V22h13V35z M222,73h-14V60h14V73z M222,54h-14V41h14V54z M222,35h-14V22h14V35z M241,73h-13V60h13V73z M241,54h-13V41
	h13V54z M241,35h-13V22h13V35z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div class="bg-white flex  rounded-2xl flex-col dark:bg-slate-900/70">
            <div class="flex-1 p-6 undefined">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg leading-tight text-gray-500 dark:text-slate-400">
                    Tenants
                  </h3>
                  <h1 class="text-3xl leading-tight font-semibold">
                    <div>256%</div>
                  </h1>
                </div>
                <span class="inline-flex justify-center items-center  h-16  text-purple-600">
                  <svg
                    // xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    shape-rendering="geometricPrecision"
                    text-rendering="geometricPrecision"
                    image-rendering="optimizeQuality"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    viewBox="0 0 512 428.73"
                  >
                    <path fill="currentColor" d="M47.97 428.72V245.41c-9.75 3.75-18.88 3.83-26.46 1.25-5.92-2.01-10.91-5.59-14.58-10.21-3.67-4.62-6-10.25-6.71-16.46-1.08-9.62 1.79-20.5 10-30.71.42-.49.88-.99 1.42-1.41L249.37 2.3c3.08-2.83 7.83-3.12 11.25-.46l238.26 185.24c.38.29.71.58 1.05.96 11.04 11.87 13.79 25.04 11.13 36.16a33.833 33.833 0 0 1-7.59 14.5 32.76 32.76 0 0 1-13.5 9.12c-8.33 3-18.25 2.92-28.29-1.83v182.23h-23.33V235.74c0-4.21-163.44-133.41-181.49-147.45C237.74 102.84 71.3 230.99 71.3 236.41v192.32H49.43l-1.46-.01zM243.36 264.5c3.71 1.39 4.49 4.48 2.42 5.64-2.44 1.36-5.49-.66-7.87-1.43-6.19-1.97-13.56-2.2-18.9 1.14-1.42.9-2.86 2.06-4.35 3.44.56-1.95 1.41-3.74 2.64-5.32 5.38-6.76 18.88-7.16 26.06-3.47zm18.89 0c-3.7 1.39-4.48 4.48-2.41 5.64 2.43 1.36 5.49-.66 7.86-1.43 6.19-1.97 13.54-2.2 18.9 1.14 1.43.9 2.87 2.06 4.35 3.44-.55-1.95-1.4-3.74-2.64-5.32-5.37-6.76-18.88-7.16-26.06-3.47zm-39.16 13.27c-.43-.16-.79-.55-.94-1.08-.27-.91.15-1.89.95-2.2 6.12-2.39 12.34-2.22 18.46 0 .8.29 1.23 1.25.99 2.17-.25.91-1.1 1.4-1.9 1.12-1.01-.37-2.03-.67-3.04-.91.1.35.15.75.15 1.14 0 2.35-1.91 4.27-4.27 4.27-2.36 0-4.27-1.92-4.27-4.27 0-.6.11-1.14.32-1.64-1.52.19-3.03.54-4.55 1.07-.61.21-1.23.59-1.9.33zm46.05-1.15c-.15.44-.24.9-.24 1.39a4.28 4.28 0 0 0 4.27 4.27c2.35 0 4.28-1.92 4.28-4.27 0-.69-.16-1.32-.44-1.89 1.86.21 3.74.61 5.64 1.24.82.26 1.65-.27 1.88-1.2.23-.91-.24-1.88-1.04-2.15-3.08-1-6.18-1.49-9.23-1.49-3.06 0-6.12.51-9.12 1.51-.8.27-1.27 1.22-1.05 2.15.23.91 1.08 1.44 1.88 1.18 1.02-.34 2.02-.62 3.02-.84.25-.05.21-.09.15.1zm-22.5 30.97c.08-.33.23-.65.46-.93.78-.92 2.17-1.05 3.1-.27 1.1.93 2.16 1.41 3.17 1.41 1.01.03 2.11-.44 3.31-1.43.93-.78 2.32-.63 3.08.29.78.93.63 2.33-.29 3.08-2.03 1.67-4.08 2.45-6.16 2.43-1.78.02-3.47-.59-5.09-1.75-.96-.69-1.89-1.42-1.58-2.83zm-7.33 16.03c-.07-.47 0-.97.24-1.42.59-1.12 2.01-1.56 3.12-.95 3.57 1.9 7.07 2.85 10.53 2.87 3.44 0 6.9-.92 10.36-2.85 1.12-.61 2.53-.21 3.14.91.61 1.12.21 2.53-.91 3.14-4.13 2.3-8.33 3.42-12.57 3.4-3.69-.02-7.38-.88-11.06-2.58-1.17-.54-2.63-1.04-2.85-2.52zm-64.49-108.56c44.37-42.08 71.61-52.25 108.77-29.72 38.46 1.99 48.99 62.59 23.33 87.8.9-.21 1.78-.36 2.64-.43 2.22-.17 4.35.18 6.14 1.14l.29.17c1.84 1.06 3.25 2.73 3.99 5.03.74 2.32.77 5.28-.21 8.92l-4.68 13.29c-.76 2.14-1.45 3.66-2.98 4.88-1.56 1.25-3.45 1.71-6.38 1.54l-1.28-.14c-.25 12.1-5.13 18.88-12.08 25.8 5.72 18.08 16.29 26.41 28.44 31.22 21.45 6.53 40.59 5.1 52.98 12.01 5.5 3.08 10.5 7.01 14.5 12.27 7.19 9.49 9.63 26.62 11.8 39.89H111.91c2.17-13.27 4.63-30.42 11.79-39.89 4.01-5.29 8.98-9.21 14.51-12.27 19.9-11.07 44.41-6.21 64.71-18.83 5.13-4.96 9.3-11.81 12.04-21.47-8.08-7.08-14.54-13.97-15.87-28.68l-.83.02c-1.9-.03-3.75-.46-5.47-1.45-2.76-1.56-4.7-4.25-6.01-7.29l-.12-.32c-1.47-3.55-2.14-7.6-2.29-10.65v-5.55c.05-1.88.15-3.7.29-4.73l.24-.89c1.5-4.18 3.62-6.18 6.32-6.82l-.06-.04c-1.4-17.89 2.71-48.94-16.34-54.81zM285.71 339.7l-1.95 1.85c-9.6 9.27-20.1 13.77-30.77 13.77-10.61-.01-21.23-4.45-31.14-13.05-2.79 7.6-6.97 15.27-11.02 19.79 18.74 30.29 70.8 30.51 87.03-2.23-4.83-5-8.99-11.51-12.15-20.13zm-85.61-61.23c-4.25-1.48-7.24-2.17-8.41.48l-.18 3.57-.01 4.97c.12 2.46.63 5.61 1.73 8.28l.13.27c.75 1.74 1.73 3.21 2.97 3.91.61.35 1.3.5 2.02.52.88.01 1.87-.17 2.89-.48.35-.12.71-.18 1.1-.19a3.565 3.565 0 0 1 3.65 3.48c.38 16.18 7.58 22.38 16.32 29.9l3.63 3.15c8.77 7.81 18.02 11.83 27.05 11.83 8.82-.01 17.62-3.85 25.82-11.75l3.71-3.52c9.15-8.6 15.9-14.95 14.6-30.4-.05-.77.14-1.56.59-2.25a3.555 3.555 0 0 1 4.94-1.02c.57.37 1.15.69 1.7.91l.2.06c.52.19 1.02.32 1.48.35l1.63.01c.11-.07.35-.7.69-1.66l4.53-12.85c.58-2.19.62-3.76.29-4.8-.15-.47-.4-.81-.72-1.02l-.11-.05c-.55-.29-1.33-.4-2.23-.32-2.01.15-4.34 1.12-6.41 2.68-.77.57-1.75.85-2.76.67-1.94-.32-3.25-2.18-2.92-4.12 3.36-19.64 1.82-32.46-2.36-41.19-3.67-7.66-9.52-12.3-15.87-15.76-14.07 10.79-23.99 12.02-33.87 13.24-8.18 1-16.35 2.02-27.16 9.49-5.14 3.56-8.56 7.88-10.31 12.88-1.75 5.04-1.88 10.91-.46 17.55.21.71.2 1.48-.07 2.24a3.58 3.58 0 0 1-4.59 2.12l-3.23-1.18zM390.65 14.8l71.53 2.92v96.62l-71.53-47.21V14.8z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div class="bg-white flex  rounded-2xl flex-col dark:bg-slate-900/70">
            <div class="flex-1 p-6 undefined">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg leading-tight text-gray-500 dark:text-slate-400">
                    Properties
                  </h3>
                  <h1 class="text-3xl leading-tight font-semibold">
                    <div>256%</div>
                  </h1>
                </div>
                <span class="inline-flex justify-center items-center  h-16 text-red-500">
                <FaHouseChimney size={40}/>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div class="flex flex-col justify-between">
            <div class="bg-white flex mb-6 last:mb-0 rounded-2xl flex-col dark:bg-slate-900/70">
              <div class="flex-1 p-6 undefined">
                <div class="flex flex-col md:flex-row items-center justify-between">
                  <div class="flex flex-col md:flex-row items-center justify-start mb-6 md:mb-0">
                    <span class="inline-flex justify-center items-center w-12 h-12 rounded-full text-emerald-500 bg-gray-50 dark:bg-slate-800 md:mr-6 mb-6 md:mb-0">
                      <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        class="inline-block"
                      >
                        <path
                          fill="currentColor"
                          d="M15 15V17H18V20H20V17H23V15H20V12H18V15M14.97 11.61C14.85 10.28 13.59 8.97 12 9C10.3 9.03 9 10.3 9 12C9 13.7 10.3 14.94 12 15C12.38 15 12.77 14.92 13.14 14.77C13.41 13.67 13.86 12.63 14.97 11.61M13 16H7C7 14.9 6.11 14 5 14V10C6.11 10 7 9.11 7 8H17C17 9.11 17.9 10 19 10V10.06C19.67 10.06 20.34 10.18 21 10.4V6H3V18H13.32C13.1 17.33 13 16.66 13 16Z"
                        ></path>
                      </svg>
                    </span>
                    <div class="text-center space-y-1 md:text-left md:mr-6">
                      <h4 class="text-xl">$375.53</h4>
                      <p class="text-gray-500 dark:text-slate-400">
                        <b>3 days ago</b> via Turcotte
                      </p>
                    </div>
                  </div>
                  <div class="text-center md:text-right space-y-2">
                    <p class="text-sm text-gray-500">Home Loan Account</p>
                    <div>
                      <div class="inline-flex items-center capitalize leading-none text-xs border rounded-full py-1 px-3 bg-emerald-500 border-emerald-500 text-white ">
                        <span>deposit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white flex mb-6 last:mb-0 rounded-2xl flex-col dark:bg-slate-900/70">
              <div class="flex-1 p-6 undefined">
                <div class="flex flex-col md:flex-row items-center justify-between">
                  <div class="flex flex-col md:flex-row items-center justify-start mb-6 md:mb-0">
                    <span class="inline-flex justify-center items-center w-12 h-12 rounded-full text-blue-500 bg-gray-50 dark:bg-slate-800 md:mr-6 mb-6 md:mb-0">
                      <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        class="inline-block"
                      >
                        <path
                          fill="currentColor"
                          d="M20 4H4A2 2 0 0 0 2 6V18A2 2 0 0 0 4 20H20A2 2 0 0 0 22 18V6A2 2 0 0 0 20 4M20 11H4V8H20Z"
                        ></path>
                      </svg>
                    </span>
                    <div class="text-center space-y-1 md:text-left md:mr-6">
                      <h4 class="text-xl">$470.26</h4>
                      <p class="text-gray-500 dark:text-slate-400">
                        <b>3 days ago</b> via Murazik - Graham
                      </p>
                    </div>
                  </div>
                  <div class="text-center md:text-right space-y-2">
                    <p class="text-sm text-gray-500">Savings Account</p>
                    <div>
                      <div class="inline-flex items-center capitalize leading-none text-xs border rounded-full py-1 px-3 bg-blue-500 border-blue-500 text-white ">
                        <span>payment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white flex mb-6 last:mb-0 rounded-2xl flex-col dark:bg-slate-900/70">
              <div class="flex-1 p-6 undefined">
                <div class="flex flex-col md:flex-row items-center justify-between">
                  <div class="flex flex-col md:flex-row items-center justify-start mb-6 md:mb-0">
                    <span class="inline-flex justify-center items-center w-12 h-12 rounded-full text-yellow-500 bg-gray-50 dark:bg-slate-800 md:mr-6 mb-6 md:mb-0">
                      <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        class="inline-block"
                      >
                        <path
                          fill="currentColor"
                          d="M3 22L4.5 20.5L6 22L7.5 20.5L9 22L10.5 20.5L12 22L13.5 20.5L15 22L16.5 20.5L18 22L19.5 20.5L21 22V2L19.5 3.5L18 2L16.5 3.5L15 2L13.5 3.5L12 2L10.5 3.5L9 2L7.5 3.5L6 2L4.5 3.5L3 2"
                        ></path>
                      </svg>
                    </span>
                    <div class="text-center space-y-1 md:text-left md:mr-6">
                      <h4 class="text-xl">$971.34</h4>
                      <p class="text-gray-500 dark:text-slate-400">
                        <b>5 days ago</b> via Fahey - Keebler
                      </p>
                    </div>
                  </div>
                  <div class="text-center md:text-right space-y-2">
                    <p class="text-sm text-gray-500">Checking Account</p>
                    <div>
                      <div class="inline-flex items-center capitalize leading-none text-xs border rounded-full py-1 px-3 bg-yellow-500 border-yellow-500 text-white ">
                        <span>invoice</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white flex mb-6 last:mb-0 rounded-2xl flex-col dark:bg-slate-900/70">
              <div class="flex-1 p-6 undefined">
                <div class="flex flex-col md:flex-row items-center justify-between">
                  <div class="flex flex-col md:flex-row items-center justify-start mb-6 md:mb-0">
                    <span class="inline-flex justify-center items-center w-12 h-12 rounded-full undefined bg-gray-50 dark:bg-slate-800 md:mr-6 mb-6 md:mb-0">
                      <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        class="inline-block"
                      >
                        <path fill="currentColor"></path>
                      </svg>
                    </span>
                    <div class="text-center space-y-1 md:text-left md:mr-6">
                      <h4 class="text-xl">$374.63</h4>
                      <p class="text-gray-500 dark:text-slate-400">
                        <b>7 days ago</b> via Collier - Hintz
                      </p>
                    </div>
                  </div>
                  <div class="text-center md:text-right space-y-2">
                    <p class="text-sm text-gray-500">Auto Loan Account</p>
                    <div>
                      <div class="inline-flex items-center capitalize leading-none text-xs border rounded-full py-1 px-3 undefined ">
                        <span>withdrawal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-between">
            <div class="bg-white flex mb-6 last:mb-0 rounded-2xl flex-col dark:bg-slate-900/70">
              <div class="flex-1 p-6 undefined">
                <div class="flex flex-col md:flex-row items-center justify-between">
                  <div class="flex flex-col md:flex-row items-center justify-start mb-6 md:mb-0">
                    <div class="w-12 h-12 md:mr-6 mb-6 md:mb-0">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Howell-Hand"
                        alt="Howell Hand"
                        class="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800"
                      />
                    </div>
                    <div class="text-center md:text-left overflow-hidden">
                      <h4 class="text-xl text-ellipsis">Howell Hand</h4>
                      <p class="text-gray-500 dark:text-slate-400">
                        Mar 3, 2023 @ percy64
                      </p>
                    </div>
                  </div>
                  <div class="inline-flex items-center capitalize leading-none text-sm border rounded-full py-1.5 px-4 bg-emerald-500 border-emerald-500 text-white ">
                    <span class="inline-flex justify-center items-center w-4 h-4 mr-2">
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        class="inline-block"
                      >
                        <path
                          fill="currentColor"
                          d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"
                        ></path>
                      </svg>
                    </span>
                    <span>70%</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white flex mb-6 last:mb-0 rounded-2xl flex-col dark:bg-slate-900/70">
              <div class="flex-1 p-6 undefined">
                <div class="flex flex-col md:flex-row items-center justify-between">
                  <div class="flex flex-col md:flex-row items-center justify-start mb-6 md:mb-0">
                    <div class="w-12 h-12 md:mr-6 mb-6 md:mb-0">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Hope-Howe"
                        alt="Hope Howe"
                        class="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800"
                      />
                    </div>
                    <div class="text-center md:text-left overflow-hidden">
                      <h4 class="text-xl text-ellipsis">Hope Howe</h4>
                      <p class="text-gray-500 dark:text-slate-400">
                        Dec 1, 2023 @ dare.concepcion
                      </p>
                    </div>
                  </div>
                  <div class="inline-flex items-center capitalize leading-none text-sm border rounded-full py-1.5 px-4 bg-emerald-500 border-emerald-500 text-white ">
                    <span class="inline-flex justify-center items-center w-4 h-4 mr-2">
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        class="inline-block"
                      >
                        <path
                          fill="currentColor"
                          d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"
                        ></path>
                      </svg>
                    </span>
                    <span>68%</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white flex mb-6 last:mb-0 rounded-2xl flex-col dark:bg-slate-900/70">
              <div class="flex-1 p-6 undefined">
                <div class="flex flex-col md:flex-row items-center justify-between">
                  <div class="flex flex-col md:flex-row items-center justify-start mb-6 md:mb-0">
                    <div class="w-12 h-12 md:mr-6 mb-6 md:mb-0">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nelson-Jerde"
                        alt="Nelson Jerde"
                        class="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800"
                      />
                    </div>
                    <div class="text-center md:text-left overflow-hidden">
                      <h4 class="text-xl text-ellipsis">Nelson Jerde</h4>
                      <p class="text-gray-500 dark:text-slate-400">
                        May 18, 2023 @ geovanni.kessler
                      </p>
                    </div>
                  </div>
                  <div class="inline-flex items-center capitalize leading-none text-sm border rounded-full py-1.5 px-4 bg-yellow-500 border-yellow-500 text-white ">
                    <span class="inline-flex justify-center items-center w-4 h-4 mr-2">
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        class="inline-block"
                      >
                        <path
                          fill="currentColor"
                          d="M22,12L18,8V11H3V13H18V16L22,12Z"
                        ></path>
                      </svg>
                    </span>
                    <span>49%</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white flex mb-6 last:mb-0 rounded-2xl flex-col dark:bg-slate-900/70">
              <div class="flex-1 p-6 undefined">
                <div class="flex flex-col md:flex-row items-center justify-between">
                  <div class="flex flex-col md:flex-row items-center justify-start mb-6 md:mb-0">
                    <div class="w-12 h-12 md:mr-6 mb-6 md:mb-0">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kim-Weimann"
                        alt="Kim Weimann"
                        class="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800"
                      />
                    </div>
                    <div class="text-center md:text-left overflow-hidden">
                      <h4 class="text-xl text-ellipsis">Kim Weimann</h4>
                      <p class="text-gray-500 dark:text-slate-400">
                        May 4, 2023 @ macejkovic.dashawn
                      </p>
                    </div>
                  </div>
                  <div class="inline-flex items-center capitalize leading-none text-sm border rounded-full py-1.5 px-4 bg-red-500 border-red-500 text-white ">
                    <span class="inline-flex justify-center items-center w-4 h-4 mr-2">
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        class="inline-block"
                      >
                        <path
                          fill="currentColor"
                          d="M16,18L18.29,15.71L13.41,10.83L9.41,14.83L2,7.41L3.41,6L9.41,12L13.41,8L19.71,14.29L22,12V18H16Z"
                        ></path>
                      </svg>
                    </span>
                    <span>38%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white flex mb-6 last:mb-0 rounded-2xl flex-col dark:bg-slate-900/70">
          <div class="flex-1 p-1">
          <div className="w-full h-300">
            <Line options={options} data={data} />
          </div>
            
          </div>
        </div>
        

        {/* <section class="pt-6 mb-6 flex items-center justify-between">
    <div class="flex items-center justify-start">
      <span class="inline-flex justify-center items-center w-6 h-6 mr-2">
        <svg viewBox="0 0 24 24" width="20" height="20" class="inline-block">
          <path fill="currentColor" d="M11,2V22C5.9,21.5 2,17.2 2,12C2,6.8 5.9,2.5 11,2M13,2V11H22C21.5,6.2 17.8,2.5 13,2M13,13V22C17.7,21.5 21.5,17.8 22,13H13Z"></path>
        </svg>
      </span>
      <h1 class="leading-tight text-2xl">Trends overview</h1>
    </div>
    <button class="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded border-white dark:border-slate-900 ring-gray-200 dark:ring-gray-500 bg-white text-black dark:bg-slate-900 dark:text-white hover:bg-gray-100 hover:dark:bg-slate-800  p-1" type="button">
      <span class="inline-flex justify-center items-center w-6 h-6 ">
        <svg viewBox="0 0 24 24" width="16" height="16" class="inline-block">
          <path fill="currentColor" d="M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z"></path>
        </svg>
      </span>
    </button>
  </section> */}

        <section class="pt-6 mb-6 flex items-center justify-between">
          <div class="flex items-center justify-start">
            <span class="inline-flex justify-center items-center w-6 h-6 mr-2">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                class="inline-block"
              >
                <path
                  fill="currentColor"
                  d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z"
                ></path>
              </svg>
            </span>
            <h1 class="leading-tight text-2xl">Clients</h1>
          </div>
          <button
            class="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded border-white dark:border-slate-900 ring-gray-200 dark:ring-gray-500 bg-white text-black dark:bg-slate-900 dark:text-white hover:bg-gray-100 hover:dark:bg-slate-800  p-1"
            type="button"
          >
            <span class="inline-flex justify-center items-center w-6 h-6 ">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                class="inline-block"
              >
                <path
                  fill="currentColor"
                  d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
                ></path>
              </svg>
            </span>
          </button>
        </section>
        <div class="bg-white flex  rounded-2xl flex-col dark:bg-slate-900/70 p-4">
          <Clients type="user"/>
        </div>

        <section class="pt-6 mb-6 flex items-center justify-between">
          <div class="flex items-center justify-start">
            <span class="inline-flex justify-center items-center w-6 h-6 mr-2">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                class="inline-block"
              >
                <path
                  fill="currentColor"
                  d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z"
                ></path>
              </svg>
            </span>
            <h1 class="leading-tight text-2xl">Admins</h1>
          </div>
          <button
            class="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded border-white dark:border-slate-900 ring-gray-200 dark:ring-gray-500 bg-white text-black dark:bg-slate-900 dark:text-white hover:bg-gray-100 hover:dark:bg-slate-800  p-1"
            type="button"
          >
            <span class="inline-flex justify-center items-center w-6 h-6 ">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                class="inline-block"
              >
                <path
                  fill="currentColor"
                  d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
                ></path>
              </svg>
            </span>
          </button>
        </section>

        <div class="bg-white flex  rounded-2xl flex-col dark:bg-slate-900/70 p-4">
          <Clients type="admin"/>
        </div>
      </section>
    </>
  );
};

export default AdminHome;
