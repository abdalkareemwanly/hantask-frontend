import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios-client";

const GlobalDataContext = createContext();

export const GlobalDataProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState(false);
  const [subCategories, setSubCategories] = useState(false);
  const [childCategories, setChildCategories] = useState(false);

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
  return (
    <GlobalDataContext.Provider
      value={{
        categories,
        countries,
        cities,
        subCategories,
        childCategories,
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalDataContext = () => useContext(GlobalDataContext);
