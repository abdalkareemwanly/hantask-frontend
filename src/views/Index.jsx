import { BiUserCircle } from "react-icons/bi";
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
// import faker from 'faker';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Index() {
  const data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    datasets: [
      {
        label: "Monthly Income Overview",
        data: [10, 20, 30, 10, 60, 50, 30, 20, 90],
        backgroundColor: "rgb(93, 209, 110, 0.4)",
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
    <div className="flex flex-col justify-center items-center my-10">
      {/* Statistics for important data */}
      <div className="flex flex-col lg:flex-row md:flex-none justify-around lg:w-[95%] sm:w-full">
        <div className="flex flex-row flex-none bg-blocks-color lg:w-[20%] sm:w-[90%] items-center lg:px-5 sm:px-1 rounded-md  component-shadow bg-primary-color py-[10px] text-white">
          <div className="rounded-full p-2 ">
            <BiUserCircle className="text-primary-color text-[42px]" />
          </div>
          <div className="flex flex-col justify-center ms-5 mt-2">
            <span className="text-[28px] font-bold">3</span>
            <span className="text-[16px] font-semibold">Total Admin</span>
          </div>
        </div>
        <div className="flex flex-row flex-none bg-blocks-color w-[20%] items-center px-5 rounded-md  component-shadow bg-secondary-color py-[10px] text-white">
          <div className="rounded-full p-2 ">
            <BiUserCircle className="text-secondary-color text-[42px]" />
          </div>
          <div className="flex flex-col justify-center ms-5 mt-2">
            <span className="text-[28px] font-bold">67</span>
            <span className="text-[16px] font-semibold">Total Seller</span>
          </div>
        </div>
        <div className="flex flex-row flex-none bg-blocks-color w-[20%] items-center px-5 rounded-md  component-shadow bg-primary-color py-[10px] text-white">
          <div className="rounded-full p-2 ">
            <BiUserCircle className="text-primary-color text-[42px]" />
          </div>
          <div className="flex flex-col justify-center ms-5 mt-2">
            <span className="text-[28px] font-bold">213</span>
            <span className="text-[16px] font-semibold">Total Buyer</span>
          </div>
        </div>
        <div className="flex flex-row flex-none bg-blocks-color w-[20%] items-center px-5 rounded-md  component-shadow bg-secondary-color py-[10px] text-white">
          <div className="rounded-full p-2 ">
            <BiUserCircle className="text-secondary-color text-[42px]" />
          </div>
          <div className="flex flex-col justify-center ms-5 mt-2">
            <span className="text-[28px] font-bold">$417.44</span>
            <span className="text-[16px] font-semibold">Total Earning</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row md:flex-none justify-around w-[95%] mt-7">
        <div className="flex flex-row flex-none bg-blocks-color w-[20%] items-center px-5 rounded-md  component-shadow bg-primary-color py-[10px] text-white">
          <div className="rounded-full p-2 ">
            <BiUserCircle className="text-primary-color text-[42px]" />
          </div>
          <div className="flex flex-col justify-center ms-5 mt-2">
            <span className="text-[28px] font-bold">450</span>
            <span className="text-[16px] font-semibold">Order Pending</span>
          </div>
        </div>
        <div className="flex flex-row flex-none bg-blocks-color w-[20%] items-center px-5 rounded-md  component-shadow bg-secondary-color py-[10px] text-white">
          <div className="rounded-full p-2 ">
            <BiUserCircle className="text-secondary-color text-[42px]" />
          </div>
          <div className="flex flex-col justify-center ms-5 mt-2">
            <span className="text-[28px] font-bold">46</span>
            <span className="text-[16px] font-semibold">Pending Service</span>
          </div>
        </div>
        <div className="flex flex-row flex-none bg-blocks-color w-[20%] items-center px-5 rounded-md  component-shadow bg-primary-color py-[10px] text-white">
          <div className="rounded-full p-2 ">
            <BiUserCircle className="text-primary-color text-[42px]" />
          </div>
          <div className="flex flex-col justify-center ms-5 mt-2">
            <span className="text-[28px] font-bold">6</span>
            <span className="text-[16px] font-semibold">
              New Payout Request
            </span>
          </div>
        </div>
        <div className="flex flex-row flex-none bg-blocks-color w-[20%] items-center px-5 rounded-md  component-shadow bg-secondary-color py-[10px] text-white">
          <div className="rounded-full p-2 ">
            <BiUserCircle className="text-secondary-color text-[42px]" />
          </div>
          <div className="flex flex-col justify-center ms-5 mt-2">
            <span className="text-[28px] font-bold">0</span>
            <span className="text-[16px] font-semibold">New User Today</span>
          </div>
        </div>
      </div>

      {/* Most Viewed Services And Most Ordered Services */}
      <div className="flex flex-col lg:flex-row md:flex-none justify-around w-[95%] mt-9 text-left">
        <div className="flex flex-col bg-inherit p-5 text-inherit w-[45%] border-2 shadow-lg">
          <table className="w-full border-collapse border border-slate-500">
            <caption className="caption-top text-left py-4 font-bold text-[22px]">
              Most Viewed Services
            </caption>
            <thead>
              <tr>
                <th className="border border-slate-600 px-2 py-3">Song</th>
                <th className="border border-slate-600 px-2 py-3">Artist</th>
                <th className="border border-slate-600 px-2 py-3">Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-600 px-2 py-3">
                  The Sliding Mr. Bones (Next Stop, Pottersville)
                </td>
                <td className="border border-slate-600 px-2 py-3">
                  Malcolm Lockyer
                </td>
                <td className="border border-slate-600 px-2 py-3">1961</td>
              </tr>
              <tr>
                <td className="border border-slate-600 px-2 py-3">
                  Witchy Woman
                </td>
                <td className="border border-slate-600 px-2 py-3">
                  The Eagles
                </td>
                <td className="border border-slate-600 px-2 py-3">1972</td>
              </tr>
              <tr>
                <td className="border border-slate-600 px-2 py-3">
                  Shining Star
                </td>
                <td className="border border-slate-600 px-2 py-3">
                  Earth, Wind, and Fire
                </td>
                <td className="border border-slate-600 px-2 py-3">1975</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-col bg-inherit p-5 text-inherit w-[45%] border-2 shadow-lg">
          <table className="w-full border-collapse border border-slate-500">
            <caption className="caption-top text-left py-4 font-bold text-[22px]">
              Most Ordered Services
            </caption>
            <thead>
              <tr>
                <th className="border border-slate-600 px-2 py-3">Song</th>
                <th className="border border-slate-600 px-2 py-3">Artist</th>
                <th className="border border-slate-600 px-2 py-3">Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-600 px-2 py-3">
                  The Sliding Mr. Bones (Next Stop, Pottersville)
                </td>
                <td className="border border-slate-600 px-2 py-3">
                  Malcolm Lockyer
                </td>
                <td className="border border-slate-600 px-2 py-3">1961</td>
              </tr>
              <tr>
                <td className="border border-slate-600 px-2 py-3">
                  Witchy Woman
                </td>
                <td className="border border-slate-600 px-2 py-3">
                  The Eagles
                </td>
                <td className="border border-slate-600 px-2 py-3">1972</td>
              </tr>
              <tr>
                <td className="border border-slate-600 px-2 py-3">
                  Shining Star
                </td>
                <td className="border border-slate-600 px-2 py-3">
                  Earth, Wind, and Fire
                </td>
                <td className="border border-slate-600 px-2 py-3">1975</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Chart For Information */}
      <div className="flex flex-col lg:flex-row md:flex-none  justify-around w-[95%] mt-9 text-left">
        <div className="flex flex-col bg-inherit p-5 text-inherit w-[45%] border-2 shadow-lg">
          <Bar data={data} options={options}></Bar>
        </div>
        <div className="flex flex-col bg-inherit p-5 text-inherit w-[45%] border-2 shadow-lg">
          <Bar data={data} options={options}></Bar>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row md:flex-none  justify-around w-[95%] mt-9 text-left">
        <div className="flex flex-col bg-inherit p-5 text-inherit w-[45%] border-2 shadow-lg">
          <Bar data={data} options={options}></Bar>
        </div>
        <div className="flex flex-col bg-inherit p-5 text-inherit w-[45%] border-2 shadow-lg">
          <Bar data={data} options={options}></Bar>
        </div>
      </div>
    </div>
  );
}
