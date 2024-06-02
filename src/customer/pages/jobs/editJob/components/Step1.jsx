import ReusableForm from "../../../../../Components/ReusableForm";
import { useGlobalDataContext } from "../../../../../contexts/GlobalDataContext";

export const Step1 = ({ data, setStepData, setStep, stepData }) => {
  const onSubmit = async (values) => {
    setStepData({ ...values });
    setStep(2);
  };
  console.log(stepData);

  const validate = () => {
    return;
  };

  const {
    categories,
    filteredSubCategories,
    filteredChildCategories,
    countries,
    filteredCities,
    setSelectedCategory,
    setSelectedSubCategory,
    setSelectedCountry,
    filteredAreas,
    setSelectedCity,
  } = useGlobalDataContext();

  let template = {
    title: "",
    fields: [
      {
        title: "budget ",
        name: "budget",
        value: stepData?.budget,
        type: "number",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
      {
        title: "deadline date to apply to this job",
        name: "deadlineDate",
        value: stepData?.deadlineDate,
        type: "date",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
      {
        title:
          "the main category, <strong style='color: red'>can't change</strong>",
        name: "category",
        type: "select",
        readOnly: true,
        options: categories,
        optionText: "name",
        searchKey: "name",
        value: stepData?.category,
        optionValue: "id",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        onFieldChange: (option, setValue, setSelectedOptions, selectIndex) => {
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
        title:
          "choose sub category, <strong style='color: red'>can't change</strong>",
        name: "subCategory",
        type: "select",
        options: filteredSubCategories,
        optionText: "name",
        readOnly: true,
        searchKey: "name",
        value: stepData?.subCategory,
        optionValue: "id",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        onFieldChange: (option, setValue, setSelectedOptions, selectIndex) => {
          setSelectedSubCategory({ id: option });
          setValue && setValue("child_category", null);
          // setSelectedOptions &&
          //   setSelectedOptions((prev) => {
          //     prev.map((ele, i) => (i === selectIndex + 1 ? [] : ele));
          //   });
        },
        styles: "md:w-[45%]",
      },
      {
        title:
          "choose child category, <strong style='color: red'>can't change</strong>",
        name: "childCategory",
        readOnly: true,
        type: "select",
        options: filteredChildCategories,
        optionText: "name",
        searchKey: "name",
        value: stepData?.childCategory,
        optionValue: "id",
        styles: "md:w-[45%]",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
      },
      {
        title: "choose country",
        name: "country",
        type: "select",
        options: countries,
        optionText: "country",
        searchKey: "country",
        value: stepData?.country,
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
        options: filteredCities,
        optionText: "service_city",
        searchKey: "service_city",
        value: stepData?.city,
        optionValue: "id",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        onFieldChange: (option, setValue, setSelectedOptions, selectIndex) => {
          setSelectedCity({ id: option });
          setValue && setValue("area", null);
          setSelectedOptions &&
            setSelectedOptions((prev) =>
              prev.map((ele, i) => (i === selectIndex + 1 ? [] : ele))
            );
        },
        styles: "md:w-[45%]",
      },
      {
        title: "choose area",
        name: "area",
        type: "select",
        options: filteredAreas,
        optionText: "service_area",
        searchKey: "service_area",
        value: stepData?.area,
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
        title: "line address ",
        name: "line_address",
        value: stepData?.line_address,
        type: "text",
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
    stepData && (
      <ReusableForm
        template={template}
        onSubmit={onSubmit}
        validate={validate}
        btnWidth={"w-[150px] self-end"}
        btnText={"next"}
        addedStyles={"md:w-[400px] lg:w-[100%]"}
      />
    )
  );
};
