import { useEffect, useState } from "react";
import { BiSolidChevronDown } from "react-icons/bi";
import axiosClient from "../../../../axios-client";

export default function Addlanguage() {
  const [allLanguage, setAllLanguage] = useState([]);
  const [slug, setSlug] = useState("");
  const [formLanguage, setFormLanguage] = useState({
    name: "",
    direction: "",
    status: "",
    slug: "",
  });

  useEffect(() => {
    getAllLanguage();
  }, []);

  const handleLanguageslug = (lang) => {
    allLanguage.map((ele) => {
      if (ele.lanName === lang) {
        setSlug(ele.code);
        setFormLanguage({
          ...formLanguage,
          name: ele.lanName,
          slug: ele.code,
        });
      }
    });
  };

  const getAllLanguage = () => {
    fetch("/src/admin/Json/LanguagesTemp.json")
      .then((response) => response.json())
      .then((data) => {
        setAllLanguage(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSubmit = () => {
    axiosClient.post('/addLanguage/', formLanguage ).then((response)=>{
      console.log(response);
    })
  }

  return (
    <>
      <h2 className="px-3 my-6 md:mb-0 text-2xl">Add New Language</h2>
      <div className="w-full px-3 my-6 md:mb-0">
        <label
          className="block uppercase tracking-wide primary-text text-xs font-bold mb-2 ms-1"
          htmlFor="grid-state"
        >
          Language
        </label>
        <div className="relative">
          <select
            className="block scroll appearance-none w-full border border-gray-200 primary-text py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-background-color text-primary-text focus:border-gray-500"
            id="grid-state"
            onChange={(ev) => handleLanguageslug(ev.target.value)}
          >
            <option value="Select Language" disabled>Select Language</option>
            {allLanguage.map((ele, key) => (
              <option key={key} value={ele.lanName}>
                {ele.lanName}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 primary-text">
            <BiSolidChevronDown />
          </div>
        </div>
      </div>
      <div className="w-full px-3 my-6 md:mb-0">
        <label
          className="block uppercase tracking-wide primary-text text-xs font-bold mb-2 ms-1"
          htmlFor="grid-state"
        >
          Direction
        </label>
        <div className="relative">
          <select
            className="block scroll appearance-none w-full border border-gray-200 primary-text py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-background-color text-primary-text focus:border-gray-500"
            id="grid-state"
            onChange={(ev) => setFormLanguage({ ...formLanguage, direction: ev.target.value})}
          >
            <option value="ltr">LTR</option>
            <option value="rtl">RTL</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 primary-text">
            <BiSolidChevronDown />
          </div>
        </div>
      </div>
      <div className="w-full px-3 my-6 md:mb-0">
        <label
          className="block uppercase tracking-wide primary-text text-xs font-bold mb-2 ms-1"
          htmlFor="grid-state"
        >
          Status
        </label>
        <div className="relative">
          <select
            className="block scroll appearance-none w-full border border-gray-200 primary-text py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-background-color text-primary-text focus:border-gray-500"
            id="grid-state"
            onChange={(ev) => setFormLanguage({ ...formLanguage, status: ev.target.value})}
          >
            <option value="publish">Publish</option>
            <option value="draft">Draft</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 primary-text">
            <BiSolidChevronDown />
          </div>
        </div>
      </div>
      <div className="w-full px-3 my-6 md:mb-0">
        <label
          className="block uppercase tracking-wide primary-text text-xs font-bold mb-2 ms-1"
          htmlFor="grid-state"
        >
          Slug
        </label>
        <div className="relative">
          <input
            className="block scroll appearance-none w-full border border-gray-200 primary-text py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-background-color text-primary-text focus:border-gray-500"
            id="grid-state"
            value={slug}
            disabled
          />
        </div>
      </div>
      <div className="px-3 my-6">
        <button className="ms-1 bg-primary-color px-3 py-2 text-white"
        onClick={() => handleSubmit()}>
          Add New
        </button>
      </div>
    </>
  );
}
