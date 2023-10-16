export default function Table() {
  return (
    <>
    <div className="flex flex-col lg:flex-row md:flex-none justify-around w-[95%] mt-9 text-left">
        <div className="flex flex-col bg-inherit p-5 text-inherit w-[100%] lg:w-[45%] border-2 shadow-lg">
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
        <div className="flex flex-col bg-inherit p-5 text-inherit w-[100%] lg:w-[45%] border-2 shadow-lg">
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
    </>
  )
}
