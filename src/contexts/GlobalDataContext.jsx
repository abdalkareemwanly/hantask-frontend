import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios-client";

const GlobalDataContext = createContext();

export const GlobalDataProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [loading, setloading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const [filteredSubCategories, setFilteredSubCategories] = useState();
  const [filteredChildCategories, setFilteredChildCategories] = useState();

  const getCountries = async (signal) => {
    const res = await axiosClient.get("/site/countrys", { signal: signal });
    setCountries(res.data.data);
  };

  const getCities = async (signal) => {
    const res = await axiosClient.get("/site/citis", { signal: signal });
    setCities(res.data.data);
  };

  const getCategories = async (signal) => {
    const res = await axiosClient.get("/site/global/category", {
      signal: signal,
    });
    setCategories(res.data.data);
  };

  const getSubCategories = async (signal) => {
    const res = await axiosClient.get("/site/global/subCategories", {
      signal: signal,
    });
    setSubCategories(res.data.data);
  };

  const getChildCategories = async (signal) => {
    const res = await axiosClient.get("/site/global/childCategories", {
      signal: signal,
    });
    setChildCategories(res.data.data);
    setloading(false);
  };

  useEffect(() => {
    const controller1 = new AbortController();
    const controller2 = new AbortController();
    const controller3 = new AbortController();
    const controller4 = new AbortController();
    const controller5 = new AbortController();

    getCountries(controller1.signal);
    getCities(controller2.signal);
    getCategories(controller3.signal);
    getSubCategories(controller4.signal);
    getChildCategories(controller5.signal);

    return () => {
      controller1.abort();
      controller2.abort();
      controller3.abort();
      controller4.abort();
      controller5.abort();
    };
  }, []);

  // Filter sub-categories based on the selected category
  useEffect(() => {
    if (categories.length === 0 || subCategories.length === 0) return;
    const filteredSubs = subCategories.filter(
      (sub) => sub.categoryId == selectedCategory?.id
    );
    setFilteredSubCategories(filteredSubs);
  }, [selectedCategory]);

  // Filter child-categories based on the selected sub-category
  useEffect(() => {
    if (subCategories.length === 0 || childCategories.length === 0) return;
    const filteredChilds =
      selectedSubCategory === null || selectedSubCategory === ""
        ? subCategories
        : childCategories.filter(
            (child) => child.subcategoryId == selectedSubCategory?.id
          );
    setFilteredChildCategories(filteredChilds);
  }, [selectedSubCategory, subCategories, childCategories]);
  console.log(filteredChildCategories, selectedSubCategory);

  let FILTER_DATA = {
    country: {
      type: "select",
      placeholder: "choose country",
      list: [
        { name: "choose one", value: "" },
        ...countries.map((ele) => {
          return {
            name: ele.country,
            value: ele.id,
          };
        }),
      ],
    },
    city: {
      type: "select",
      placeholder: "choose city",
      list:
        cities &&
        cities.map((ele) => {
          return {
            name: ele.service_city,
            value: ele.id,
          };
        }),
    },
    category: {
      type: "select",
      placeholder: "choose category",
      list:
        categories &&
        categories.map((ele) => {
          return {
            name: ele.name,
            value: ele.id,
          };
        }),
    },
    subcategory: {
      type: "select",
      placeholder: "choose subcategory",
      list:
        subCategories &&
        subCategories.map((ele) => {
          return {
            name: ele.name,
            value: ele.id,
          };
        }),
    },
    childcategory: {
      type: "select",
      placeholder: "choose childcategory",
      list:
        childCategories &&
        childCategories.map((ele) => {
          return {
            name: ele.name,
            value: ele.id,
          };
        }),
    },
    price: {
      type: "select",
      placeholder: "choose price",
      list: [
        { minPrice: "0", maxPrice: "250" },
        { minPrice: "250", maxPrice: "500" },
        { minPrice: "500", maxPrice: "1000" },
        { minPrice: "1000", maxPrice: "2000" },
      ],
    },
    chooseType: {
      type: "select",
      placeholder: "sort by",
      list: [
        { name: "featured", value: "featured" },
        { name: "populer", value: "populer" },
      ],
    },
    search: {
      type: "input",
      placeholder: "input what are you looking for",
    },
  };
  return (
    <GlobalDataContext.Provider
      value={{
        categories,
        countries,
        cities,
        subCategories,
        childCategories,
        FILTER_DATA,
        loading,
        selectedCategory,
        setSelectedCategory,
        selectedSubCategory,
        setSelectedSubCategory,
        filteredSubCategories,
        filteredChildCategories,
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalDataContext = () => useContext(GlobalDataContext);
