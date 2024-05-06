import ReusableForm from "../../../../../Components/ReusableForm";
import { useGlobalDataContext } from "../../../../../contexts/GlobalDataContext";

export const Step1 = ({
  data,
  setStepData,
  setStep,
  categories,
  cities,
  childCategories,
  subCategories,
  countries,
  stepData,
}) => {
  const onSubmit = async (values) => {
    setStepData({ ...values });
    setStep(2);
  };
  const validate = () => {
    console.log("no");
  };

  const { setSelectedCategory, setSelectedSubCategory, setSelectedCountry } =
    useGlobalDataContext();

  let template = {
    title: "",
    fields: [
      {
        title: "title ",
        name: "title",
        type: "text",
        value: data?.title,
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[30%]",
      },
      {
        title: "budget ",
        name: "budget",
        value: data?.budget,
        type: "number",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[30%]",
      },
      {
        title: "deadline date to apply to this job",
        name: "deadlineDate",
        value: data?.dead_line,
        type: "date",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[30%]",
      },
      {
        title: "choose the main category",
        name: "category",
        type: "select",
        options: categories,
        optionText: "name",
        searchKey: "name",
        value: data?.category_id,
        optionValue: "id",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        onFieldChange: (option, setValue, setSelectedOptions, selectIndex) => {
          console.log(option);
          setSelectedCategory({ id: option });
          setValue && setValue("subCategory", null);
          setSelectedOptions &&
            setSelectedOptions((prev) =>
              prev.map((ele, i) => (i === selectIndex + 1 ? [] : ele))
            );
        },
        styles: "md:w-[45%]",
      },
      {
        title: "choose sub category",
        name: "subCategory",
        type: "select",
        options: subCategories,
        optionText: "name",
        searchKey: "name",
        value: data?.subcategory_id,
        optionValue: "id",
        onFieldChange: (option, setValue, setSelectedOptions, selectIndex) => {
          setSelectedSubCategory({ id: option });
          setValue && setValue("child_category", null);
          setSelectedOptions &&
            setSelectedOptions((prev) =>
              prev.map((ele, i) => (i === selectIndex + 1 ? [] : ele))
            );
        },
        styles: "md:w-[45%]",
      },
      {
        title: "choose child category",
        name: "childCategory",
        type: "select",
        options: childCategories,
        optionText: "name",
        searchKey: "name",
        value: data?.childcategory_id,
        optionValue: "id",
        styles: "md:w-[45%]",
      },

      {
        title: "choose country",
        name: "country",
        type: "select",
        options: countries,
        optionText: "country",
        searchKey: "country",
        value: data?.country_id,
        optionValue: "id",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        onFieldChange: (option, setValue, setSelectedOptions, selectIndex) => {
          setSelectedCountry({ id: option });
          setValue && setValue("city", null);
          setSelectedOptions &&
            setSelectedOptions((prev) =>
              prev.map((ele, i) => (i === selectIndex + 1 ? [] : ele))
            );
        },
        styles: "md:w-[45%]",
      },

      {
        title: "choose city",
        name: "city",
        type: "select",
        options: cities,
        optionText: "service_city",
        searchKey: "service_city",
        value: data?.city_id,
        optionValue: "id",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
      {
        title: "description ",
        name: "description",
        value: data?.description,
        type: "textArea",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[100%]",
      },
    ],
  };
  return (
    <ReusableForm
      template={template}
      onSubmit={onSubmit}
      validate={validate}
      btnWidth={"w-[150px] self-end"}
      btnText={"next"}
      addedStyles={"md:w-[400px] lg:w-[100%]"}
    />
  );
};
