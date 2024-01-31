import ReusableForm from "../../../Components/ReusableForm";

export default function exampleForForm() {
  /*
   ** template can take:
   *** 1. title of the form
   *** 2. fields added to form and for now can accept these types:
   ****** text
   ****** email
   ****** select
   ****** checkbox
   ****** file
  and field props can take
      1. title
      2. name
      3. type
      4. readOnly
      5. disabled
      6. value
      7. styles
      8. (for files): 1. fileFor: "image", 2. imgStyle: "w-[150px] h-[150px]",
      8. validationProps for validation in every input registered in react hook form
        8.1. required: {value: true/ false, message: ""}
        {
        name: "image",
        type: "file",
        styles: "w-[100%] items-center justify-center",
        fileFor: "image",
        imgStyle: "w-[150px] h-[150px]",
      },
   */
  let template = {
    title: "Job Application Form",
    fields: [
      {
        title: "First Name",
        type: "text",
        name: "firstname",
        validationProps: {
          required: { value: true, message: "this field is required" },
        },
      },
      {
        title: "Second Name",
        type: "text",
        name: "secondname",
        value: "hello 2",
      },
      {
        title: "Email",
        type: "email",
        name: "email",
      },
      {
        title: "Include Portfolio",
        type: "checkbox",
        name: "include_portfolio",
      },
      {
        title: "select lang",
        type: "select",
        name: "language",
        options: [
          {
            value: "1",
            title: "arabic",
          },
          {
            value: "2",
            title: "english",
          },
        ],
      },
      {
        title: "selected language",
        type: "text",
        name: "selectedLang",
        readOnly: true,
      },
    ],
  };
  return (
    <ReusableForm
      template={template} // the template you want to implement
      watchFields={["firstname", "secondname", "language"]} // to specify the fields you want it to be watched and apply custom validation
      validate={validate} // to pass the custom validate function
      onSubmit={onSubmit} // to pass the custom submit function
    />
  );
}

function onSubmit(values) {
}

function validate(watchValues, methods) {
  //watchValues: the inputs name you want to watch and validate the values of them
  //errors: it is an array contains errors recieved from form inputs
  // setError: to set a custom error
  // clear errors: can clean all the errors from the form or specify the error you want to clear [key]
  //setValue: set input value depending on specific thing
  //resetField: if you want to reset the field from the value
  let { errors, setError, clearErrors, setValue, resetField } = methods;

  if (watchValues.firstname === "") {
    if (!errors?.firstname) {
      setError("firstname", {
        type: "manual",
        message: "first name can't be empty",
      });
    }
  } else if (watchValues.firstname === "admin") {
    if (errors?.firstname?.type !== "manual") {
      setError("firstname", {
        type: "manual",
        message: "You cannot use this first name",
      });
    }
  } else {
    clearErrors("firstname");
  }

  if (watchValues.language !== "") {
    setValue("selectedLang", watchValues.language);
  } else {
    setValue("selectedLang", "");
  }
  if (watchValues.secondname === "" || watchValues.secondname?.length === 0) {
    setError("secondname", {
      type: "manual",
      message: "cannot be empty",
    });
  } else {
    clearErrors("secondname");
  }
}
