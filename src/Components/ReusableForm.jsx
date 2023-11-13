import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const ReusableForm = ({
  template,
  onSubmit,
  watchFields,
  validate,
  btnWidth,
  btnText,
  addedStyles,
  setImage,
  image,
}) => {
  let { title, fields } = template;

  let {
    register,
    handleSubmit,
    formState, // form state includes errors
    watch, // to live watching fields changes
    setError,
    clearErrors,
    setValue,
    resetField,
    trigger,
  } = useForm({
    // for returning every value from field in the fields array to set it as default value
    defaultValues: fields.reduce((acc, field) => {
      field?.value ? (acc[field.name] = field.value) : (acc[field.name] = "");
      return acc;
    }, {}),
  });

  const { errors } = formState;

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const errorsCount = Object.entries(errors).length;
    if (errorsCount > 0) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [formState]);

  let watchValues = watchFields && watch(watchFields);

  const mergedObject = {};

  watchFields?.forEach((field, index) => {
    mergedObject[field] = watchValues[index];
  });

  const memoizedValidateFunction = useCallback(() => {
    validate(mergedObject, {
      errors,
      setError,
      clearErrors,
      setValue,
      resetField,
    });
  }, [watchValues]);
  const [previousMergedObject, setPreviousMergedObject] = useState(watchValues);

  useEffect(() => {
    if (JSON.stringify(previousMergedObject) !== JSON.stringify(watchValues)) {
      memoizedValidateFunction();
      setPreviousMergedObject(watchValues);
    }
  }, [watchValues, memoizedValidateFunction, previousMergedObject]);

  const handleFileChange = (name) => (event) => {
    const fileInput = event.target;
    const image = document.getElementById("imageFile");
    setImage(event.target.files[0]);
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      console.log("form state:", watch());
      reader.onload = function (e) {
        if (/^image/.test(fileInput.files[0].type)) {
          image.src = e.target.result;
          setValue(name, fileInput.files[0]);
          clearErrors(name);
        } else {
          alert("Selected file is not an image!");
        }
      };

      reader.readAsDataURL(fileInput.files[0]);
    }
  };

  const renderFields = (fields) => {
    return fields?.map((field) => {
      let {
        title,
        type,
        name,
        validationProps,
        readOnly,
        disabled,
        optionValue,
        optionText,
        styles,
      } = field;

      switch (type) {
        case "text":
          return (
            <div key={name} className={`input-field w-full ${styles}`}>
              <label htmlFor={name} className="input-label">
                {title}
              </label>
              <input
                className="input-box"
                type="text"
                name={name}
                id={name}
                readOnly={readOnly}
                disabled={disabled}
                {...register(name, validationProps)}
              />
              {errors && errors[name] && (
                <span className="red-text">{errors[name]["message"]}</span>
              )}
            </div>
          );
        case "password":
          return (
            <div key={name} className={`input-field w-full ${styles}`}>
              <label htmlFor={name} className="input-label">
                {title}
              </label>
              <input
                className="input-box"
                type="password"
                name={name}
                id={name}
                readOnly={readOnly}
                disabled={disabled}
                {...register(name, validationProps)}
              />
              {errors && errors[name] && (
                <span className="red-text">{errors[name]["message"]}</span>
              )}
            </div>
          );
        case "email":
          return (
            <div key={name} className={`input-field w-full ${styles}`}>
              <label htmlFor={name} className="input-label">
                {title}
              </label>
              <input
                className="input-box"
                type="email"
                name={name}
                readOnly={readOnly}
                disabled={disabled}
                id={name}
                {...register(name, validationProps)}
              />
              {errors && errors[name] && (
                <span className="red-text">{errors[name]["message"]}</span>
              )}
            </div>
          );
        case "checkbox":
          return (
            <div key={name} className={`form-group w-full ${styles}`}>
              <input
                type="checkbox"
                name={name}
                value="yes"
                readOnly={readOnly}
                disabled={disabled}
                id={name}
                {...register(name, validationProps)}
              />
              <label htmlFor={name}>{title}</label>
              {errors && errors[name] && (
                <span className="red-text">{errors[name]["message"]}</span>
              )}
            </div>
          );
        case "select":
          return (
            <div key={name} className={`input-field w-full ${styles}`}>
              <label htmlFor={name}>{title}</label>
              <select
                className="input-box"
                readOnly={readOnly}
                disabled={disabled}
                {...register(name, validationProps)}
                id={name}
              >
                <option value="">select an option</option>
                {field.options?.map((option) => (
                  <option key={option[optionValue]} value={option[optionValue]}>
                    {option[optionText]}
                  </option>
                ))}
              </select>
              {errors && errors[name] && (
                <span className="red-text">{errors[name]["message"]}</span>
              )}
            </div>
          );
        case "file":
          return (
            <div key={name} className={`input-field w-full  ${styles}`}>
              {field?.fileFor === "image" ? (
                <>
                  <div className={`${field.imgStyle} relative`}>
                    <img
                      src=""
                      alt=""
                      onClick={() => {
                        const fileInput = document.getElementById(name);
                        fileInput.click();
                      }}
                      id="imageFile"
                      className={`absolute w-full rounded-full text-center object-cover cursor-pointer ${field.imgStyle}`}
                    />
                    {!image && (
                      <span
                        className="absolute top-[50%] left-[50%] text-sm w-max"
                        style={{ transform: "translate(-50%, -50%)" }}
                      >
                        choose image
                      </span>
                    )}
                  </div>
                  <input
                    type="file"
                    name={name}
                    {...register(name, validationProps)}
                    id={name}
                    onChange={handleFileChange(name)}
                    className="imageFileInput"
                  />
                  {errors && errors[name] && (
                    <span className="red-text">{errors[name]["message"]}</span>
                  )}
                </>
              ) : (
                <>
                  <label htmlFor={name}>{title}</label>
                  <input
                    type="file"
                    name={name}
                    className="fileInput"
                    {...register(name, validationProps)}
                    id={name}
                  />
                </>
              )}
              {/* {errors && errors[name] && (
                  <span className="red-text">{errors[name]["message"]}</span>
                )} */}
            </div>
          );

        default:
          return (
            <div key={name}>
              <span className="red-text">Invalid Field</span>
            </div>
          );
      }
    });
  };

  return (
    <form
      className={`flex flex-col gap-2 text-primary-text ${addedStyles}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="font-bold text-2xl bt-3">{title}</h3>
      <div className="flex gap-2 flex-wrap justify-between">
        {renderFields(fields)}
      </div>
      <button
        type="submit"
        disabled={!isValid}
        className={`bg-greenColor text-white  p-2 outline-none border-none ${btnWidth} text-base mt-3  px-6 rounded-[4px] disabled:bg-gray-600`}
      >
        {btnText}
      </button>
    </form>
  );
};

export default ReusableForm;
