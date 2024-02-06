const FILTER_DATA = {
  country: {
    type: "select",
    placeholder: "choose country",
    list: [
      { name: "choose country", value: "" },
      { name: "syria", value: "syria" },
    ],
  },
  city: {
    type: "select",
    placeholder: "choose city",
    list: [
      { name: "choose city", value: "" },
      { name: "homs", value: "homs" },
    ],
  },
  category: {
    type: "select",
    placeholder: "choose category",
    list: [
      { name: "choose category", value: "" },
      { name: "anything", value: "anything" },
      { name: "anything", value: "anything" },
      { name: "anything", value: "anything" },
      { name: "anything", value: "anything" },
      { name: "anything", value: "anything" },
    ],
  },
  subcategory: {
    type: "select",
    placeholder: "choose subcategory",
    list: [
      { name: "choose subcategory", value: "" },
      { name: "anything", value: "anything" },
      { name: "anything", value: "anything" },
      { name: "anything", value: "anything" },
      { name: "anything", value: "anything" },
      { name: "anything", value: "anything" },
      { name: "anything", value: "anything" },
    ],
  },
  childcategory: {
    type: "select",
    placeholder: "choose childcategory",
    list: [
      { name: "choose childcategory", value: "" },
      { name: "anything", value: "anything" },
      { name: "anything", value: "anything" },
      { name: "anything", value: "anything" },
      { name: "anything", value: "anything" },
      { name: "anything", value: "anything" },
    ],
  },
  price: {
    type: "select",
    placeholder: "choose price",
    list: [
      { name: "choose price", value: "" },
      { name: "anything", value: "anything" },
      { name: "anything", value: "anything" },
      { name: "anything", value: "anything" },
      { name: "anything", value: "anything" },
      { name: "anything", value: "anything" },
    ],
  },
  search: {
    type: "input",
    placeholder: "input what are you looking for",
  },
};

export default FILTER_DATA;
