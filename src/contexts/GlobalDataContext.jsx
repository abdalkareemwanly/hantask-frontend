import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios-client";

const GlobalDataContext = createContext();

export const GlobalDataProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [loading, setloading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [filteredSubCategories, setFilteredSubCategories] = useState();
  const [filteredChildCategories, setFilteredChildCategories] = useState();
  const [filteredCities, setFilteredCities] = useState();
  const [filteredAreas, setFilteredAreas] = useState();
  const [globalLoading, setGlobalLoading] = useState(true);

  const getGlobalCountries = async (signal) => {
    const res = await axiosClient.get("/site/global/countrys", {
      signal: signal,
    });
    setCountries(res.data.data);
  };

  const getGlobalCities = async (signal) => {
    const res = await axiosClient.get("/site/global/citis", { signal: signal });
    setCities(res.data.data);
  };

  const getGlobalAreas = async (signal) => {
    const res = await axiosClient.get("/site/global/areas", { signal: signal });
    setAreas(res.data.data);
  };

  const getGlobalCategories = async (signal) => {
    const res = await axiosClient.get("/site/global/category", {
      signal: signal,
    });
    setCategories(res.data.data);
  };

  const getGlobalSubCategories = async (signal) => {
    const res = await axiosClient.get("/site/global/subCategories", {
      signal: signal,
    });
    setSubCategories(res.data.data);
  };

  const getGlobalChildCategories = async (signal) => {
    const res = await axiosClient.get("/site/global/childCategories", {
      signal: signal,
    });
    setChildCategories(res.data.data);
    setloading(false);
  };
  const [invalidateCountries, setInvalidateCountries] = useState(false);
  const [invalidateCities, setInvalidateCities] = useState(false);
  const [invalidateAreas, setInvalidateAreas] = useState(false);
  const [invalidateCategories, setInvalidateCategories] = useState(false);
  const [invalidateSubCategories, setInvalidateSubCategories] = useState(false);
  const [invalidateChildCategories, setInvalidateChildCategories] =
    useState(false);

  useEffect(() => {
    const controller1 = new AbortController();
    const controller2 = new AbortController();
    const controller3 = new AbortController();
    const controller4 = new AbortController();
    const controller5 = new AbortController();
    const controller6 = new AbortController();
    const fetchCountries = () => getGlobalCountries(controller1.signal);
    const fetchCities = () => getGlobalCities(controller2.signal);
    const fetchAreas = () => getGlobalAreas(controller6.signal);
    const fetchCategories = () => getGlobalCategories(controller3.signal);
    const fetchSubCategories = () => getGlobalSubCategories(controller4.signal);
    const fetchChildCategories = () =>
      getGlobalChildCategories(controller5.signal);

    const fetchDataSequentially = async () => {
      try {
        setGlobalLoading(true);
        await fetchCategories();
        await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for 500 milliseconds
        await fetchSubCategories();
        await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for 500 milliseconds
        await fetchChildCategories();
        await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for 500 milliseconds
        await fetchCountries();
        await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for 500 milliseconds
        await fetchCities();
        await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for 500 milliseconds
        await fetchAreas();
        setGlobalLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataSequentially();
    return () => {
      controller1.abort();
      controller2.abort();
      controller3.abort();
      controller4.abort();
      controller5.abort();
    };
  }, []);

  useEffect(() => {
    const controller1 = new AbortController();
    if (invalidateChildCategories) {
      const fetchChildCategories = () =>
        getGlobalChildCategories(controller1.signal);
      const fetchDataSequentially = async () => {
        try {
          setGlobalLoading(true);
          await fetchChildCategories();
          setGlobalLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchDataSequentially();
    }
    return () => {
      controller1.abort();
    };
  }, [invalidateChildCategories]);

  useEffect(() => {
    const controller1 = new AbortController();
    if (invalidateSubCategories) {
      const fetchSubCategories = () =>
        getGlobalSubCategories(controller1.signal);
      const fetchDataSequentially = async () => {
        try {
          setGlobalLoading(true);
          await fetchSubCategories();
          setGlobalLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchDataSequentially();
    }

    return () => {
      controller1.abort();
    };
  }, [invalidateSubCategories]);

  useEffect(() => {
    const controller1 = new AbortController();
    if (invalidateCategories) {
      const fetchCategories = () => getGlobalCategories(controller1.signal);
      const fetchDataSequentially = async () => {
        try {
          setGlobalLoading(true);
          await fetchCategories();
          setGlobalLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchDataSequentially();
    }

    return () => {
      controller1.abort();
    };
  }, [invalidateCategories]);

  useEffect(() => {
    const controller1 = new AbortController();
    if (invalidateCountries) {
      const fetchCountries = () => getGlobalCountries(controller1.signal);
      const fetchDataSequentially = async () => {
        try {
          setGlobalLoading(true);
          await fetchCountries();
          setInvalidateCountries(false);
          setGlobalLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchDataSequentially();
    }
    return () => {
      controller1.abort();
    };
  }, [invalidateCountries]);

  useEffect(() => {
    const controller1 = new AbortController();

    if (invalidateCities) {
      const fetchCities = () => getGlobalCities(controller1.signal);
      const fetchDataSequentially = async () => {
        try {
          setGlobalLoading(true);
          await fetchCities();
          setGlobalLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchDataSequentially();
    }

    return () => {
      controller1.abort();
    };
  }, [invalidateCities]);

  useEffect(() => {
    const controller1 = new AbortController();
    if (invalidateAreas) {
      const fetchAreas = () => getGlobalAreas(controller1.signal);
      const fetchDataSequentially = async () => {
        try {
          setGlobalLoading(true);
          await fetchAreas();
          setGlobalLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchDataSequentially();
    }
    return () => {
      controller1.abort();
    };
  }, [invalidateAreas]);

  // Filter sub-categories based on the selected category
  useEffect(() => {
    if (categories.length === 0 || subCategories.length === 0) return;
    const filteredSubs = subCategories.filter(
      (sub) => sub.categoryId == selectedCategory?.id
    );
    setFilteredSubCategories(filteredSubs);
  }, [selectedCategory, categories, subCategories]);

  const handleFilterSub = (id) => {
    if (categories.length === 0 || subCategories.length === 0) return;
    const filteredSubs = subCategories.filter((sub) => sub.categoryId == id);
    setFilteredSubCategories(filteredSubs);
  };

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

  // Filter child-categories based on the selected sub-category
  useEffect(() => {
    if (countries.length === 0 || cities.length === 0) return;
    const filteredcity =
      selectedCountry === null || selectedCountry === ""
        ? cities
        : cities.filter((city) => city.country_id == selectedCountry?.id);
    setFilteredCities(filteredcity);
    setSelectedCountry("");
  }, [selectedCountry, countries, cities]);

  useEffect(() => {
    if (cities.length === 0 || areas.length === 0) return;
    const filteredAreas =
      selectedCity === null || selectedCity === ""
        ? areas
        : areas.filter((area) => area.city_id == selectedCity?.id);
    setFilteredAreas(filteredAreas);
  }, [selectedCity, cities, areas]);

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
        globalLoading,
        getGlobalCategories,
        getGlobalSubCategories,
        getGlobalChildCategories,
        getGlobalCities,
        getGlobalCountries,
        handleFilterSub,
        setSelectedCountry,
        filteredCities,
        areas,
        setSelectedCity,
        filteredAreas,
        setInvalidateAreas,
        setInvalidateCategories,
        setInvalidateChildCategories,
        setInvalidateCities,
        setInvalidateCountries,
        setInvalidateSubCategories,
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};
export const useGlobalDataContext = () => useContext(GlobalDataContext);
