import React from "react";
import Clients from "./Components/Clients";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Stats from "./Components/Stats";

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
      labels.push(`2024-01-${i.toString().padStart(2, "0")}`); // Format: YYYY-MM-DD
    }
    return labels;
  };

  // Function to generate random data points
  const generateRandomData = () => {
    const data = [];
    for (let i = 0; i < 15; i++) {
      data.push(Math.floor(Math.random() * 10000)); // Generate random number between 0 and 100
    }
    return data;
  };

  const data = {
    labels: generateLabels(), // Generate labels for each day of January
    datasets: [
      {
        label: "Transactions",
        data: generateRandomData(), // Generate random data points for January
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Credits Transaction",
        data: generateRandomData(), // Generate random data points for January
        borderColor: "rgba(255, 99, 132, 1)",
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
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Transactions / Month",
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
      <Stats />
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
          <Clients type="user" />
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
          <Clients type="admin" />
        </div>
      </section>
    </>
  );
};

export default AdminHome;
