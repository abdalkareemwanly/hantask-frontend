import { useEffect, useState } from "react";
import { BiSolidChevronDown } from "react-icons/bi";

export default function Addlanguage() {
  const [allLanguage, setAllLanguage] = useState([]);
  const [ slug , setSlug ] =useState('')

  useEffect(() => {
    getAllLanguage();
  }, []);

  const handleLanguageslug = (lang) => {
    allLanguage.map((ele) => {
      if (ele.name === lang) {
        setSlug(ele.code);
        console.log(ele.code);
      }
    });
  };

  const getAllLanguage = () => {
    fetch("/src/admin/Json/allLanguage.json")
      .then((response) => response.json())
      .then((data) => {
        setAllLanguage(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return (
    <>
      <h2 className="px-3 my-6 md:mb-0 text-2xl">Add New Language</h2>
      <div className="w-full px-3 my-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ms-1"
          htmlFor="grid-state"
        >
          Language
        </label>
        <div className="relative">
          <select
            className="block scroll appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
            onChange={(ev) => handleLanguageslug(ev.target.value)}
          >
            {allLanguage.map((ele, key) => (
              <option key={key} value={ele.name}>
                {ele.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <BiSolidChevronDown />
          </div>
        </div>
      </div>
      <div className="w-full px-3 my-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ms-1"
          htmlFor="grid-state"
        >
          Direction
        </label>
        <div className="relative">
          <select
            className="block scroll appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option value="ltr">LTR</option>
            <option value="rtl">RTL</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <BiSolidChevronDown />
          </div>
        </div>
      </div>
      <div className="w-full px-3 my-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ms-1"
          htmlFor="grid-state"
        >
          Status
        </label>
        <div className="relative">
          <select
            className="block scroll appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option value="publish">Publish</option>
            <option value="draft">Draft</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <BiSolidChevronDown />
          </div>
        </div>
      </div>
      <div className="w-full px-3 my-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ms-1"
          htmlFor="grid-state"
        >
          Slug
        </label>
        <div className="relative">
          <input
            className="block scroll appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
            value={slug}
            disabled
          />
        </div>
      </div>
      <div className="px-3 my-6">

      <button className="ms-1 bg-primary-color px-3 py-2 text-white">Add New</button>
      </div>
    </>
  );
}
