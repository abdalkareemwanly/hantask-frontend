import { Link } from "react-router-dom";

export default function Table({ alldata }) {
  return (
    <>
      <div className="flex flex-col lg:flex-row md:flex-none  w-full mt-9 text-left">
        {/* <div className="flex flex-col  p-5 text-inherit w-[100%] lg:w-[45%]  component-shadow bg-blocks-color rounded-sm">
          <table className="w-full border-collapse border border-slate-500">
            <caption className="caption-top text-left py-4 font-bold text-[22px]">
              Most Viewed Services
            </caption>
            <thead>
              <tr>
                <th className="border border-mainBorder px-2 py-3">Song</th>
                <th className="border border-mainBorder px-2 py-3">Artist</th>
                <th className="border border-mainBorder px-2 py-3">Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-mainBorder px-2 py-3">
                  The Sliding Mr. Bones (Next Stop, Pottersville)
                </td>
                <td className="border border-mainBorder px-2 py-3">
                  Malcolm Lockyer
                </td>
                <td className="border border-mainBorder px-2 py-3">1961</td>
              </tr>
              <tr>
                <td className="border border-mainBorder px-2 py-3">
                  Witchy Woman
                </td>
                <td className="border border-mainBorder px-2 py-3">
                  The Eagles
                </td>
                <td className="border border-mainBorder px-2 py-3">1972</td>
              </tr>
              <tr>
                <td className="border border-mainBorder px-2 py-3">
                  Shining Star
                </td>
                <td className="border border-mainBorder px-2 py-3">
                  Earth, Wind, and Fire
                </td>
                <td className="border border-mainBorder px-2 py-3">1975</td>
              </tr>
            </tbody>
          </table>
        </div> */}
        <div className="flex flex-col  p-5 text-inherit w-[100%] lg:w-[45%]  component-shadow bg-blocks-color rounded-md">
          <table className="w-full  border-collapse border border-slate-500">
            <caption className="caption-top text-left py-4 font-bold text-[22px]">
              Most Ordered deals
            </caption>
            <thead>
              <tr>
                <th className="border border-mainBorder px-2 py-3">
                  deal title
                </th>
                <th className="border border-mainBorder px-2 py-3">
                  deal owner
                </th>
                <th className="border border-mainBorder px-2 py-3">
                  order count
                </th>
              </tr>
            </thead>
            <tbody>
              {alldata?.posts.map((ele, i) => (
                <tr key={i}>
                  <td className="border border-mainBorder px-2 py-3">
                    <Link to={`/deal/${ele.id}`}>{ele.title}</Link>
                  </td>
                  <td className="border border-mainBorder px-2 py-3">
                    <Link to={`/buyer-profile/${ele.buyer_id}`}>
                      {ele.buyer_name}
                    </Link>
                  </td>
                  <td className="border border-mainBorder px-2 py-3">
                    {ele.comments_count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
