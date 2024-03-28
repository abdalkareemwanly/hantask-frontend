import ReusableForm from "../../../../../Components/ReusableForm";

export const Step1 = ({
  data,
  setStepData,
  setStep,
  categories,
  cities,
  childCategories,
  handleMainCategoryChange,
  handleChangeSubCategories,
  handleCountriesChange,
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

  let template = {
    title: "",
    fields: [
      {
        title: "job title ",
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
        value: data?.deadlineDate,
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
        title: "category ",
        options: [...categories],
        value: data.category,
        name: "category",
        type: "select",
        optionValue: "id",
        optionText: "name",
        firstOptionText: "select category",
        validationProps: {
          onChange: (e) => handleMainCategoryChange(e.target.value),
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[30%]",
      },
      {
        title: "sub category ",
        options: [...subCategories],
        value: data.subCategory,
        name: "subCategory",
        type: "select",
        optionValue: "id",
        optionText: "name",
        firstOptionText: "select sub category",
        validationProps: {
          onChange: (e) => handleChangeSubCategories(e.target.value),
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[30%]",
      },
      {
        title: "child category ",
        value: data?.childCategory,
        name: "childCategory",
        type: "select",
        optionValue: "id",
        options: [...childCategories],
        optionText: "name",
        firstOptionText: "select subCategory",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[30%]",
      },
      {
        title: "country ",
        name: "country",
        value: data?.country,
        options: [...countries],
        optionValue: "id",
        optionText: "country",
        type: "select",
        firstOptionText: "select sub category",
        validationProps: {
          onChange: (e) => handleCountriesChange(e.target.value),
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
      {
        title: "city ",
        name: "city",
        type: "select",
        optionValue: "id",
        options: [...cities],
        value: data?.city,
        optionText: "service_city",
        firstOptionText: "select sub category",
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
    template &&
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
