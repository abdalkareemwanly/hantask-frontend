import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export default function Chart() {
    const data = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [
          {
            label: "Monthly Income Overview",
            data: [10, 20, 30, 10, 60, 50, 30, 20, 90],
            backgroundColor: "rgb(0, 105, 127, 0.7)",
            borderColor: "rgb(43, 45, 66)",
            pointBorderColor: "rgb(216, 0, 50, 0.5)",
          },
        ],
      };
    
      const options = {
        responsive: true,
        plugins: {
          legent: true,
          title: {
            display: true,
            text: "Student Examing Result",
          },
        },
        scales: {
          y: {
            min: 0,
            max: 100,
          },
        },
      };
  return (
    <>
    <div className="flex flex-col lg:flex-row md:flex-none justify-around w-[95%] mt-9 text-left">
        <div className="flex flex-col bg-inherit p-5 text-inherit w-[100%] lg:w-[45%] border-2 shadow-md shadow-gray-color dark:shadow-gray-color bg-white">
          <Bar data={data} options={options}></Bar>
        </div>
        <div className="flex flex-col bg-inherit p-5 text-inherit w-[100%] lg:w-[45%] border-2 shadow-md shadow-gray-color dark:shadow-gray-color bg-white">
          <Bar data={data} options={options}></Bar>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row md:flex-none  justify-around w-[95%] mt-9 text-left">
        <div className="flex flex-col bg-inherit p-5 text-inherit w-[100%] lg:w-[45%] border-2 shadow-md shadow-gray-color dark:shadow-gray-color bg-white">
          <Bar data={data} options={options}></Bar>
        </div>
        <div className="flex flex-col bg-inherit p-5 text-inherit w-[100%] lg:w-[45%] border-2 shadow-md shadow-gray-color dark:shadow-gray-color bg-white">
          <Bar data={data} options={options}></Bar>
        </div>
      </div>
    </>
  )
}
