const FILTER_DATA = {
  country: {
    type: "select",
    placeholder: "Service Country *",
    list: [
      { name: "Service Country", value: "" },
      { name: "syria", value: "syria" },
    ],
  },
  city: {
    type: "select",
    placeholder: "Service City *",
    list: [
      { name: "Service City", value: "" },
      { name: "homs", value: "homs" },
      { name: "hama", value: "hama" },
      { name: "dama", value: "dama" },
    ],
  },
  area: {
    type: "select",
    placeholder: "Service Area *",
    list: [
      { name: "Service Area", value: "" },
      { name: "homs", value: "homs" },
      { name: "homs", value: "homs" },
      { name: "homs", value: "homs" },
    ],
  },
};

export default FILTER_DATA;
