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
  } = useForm({
    defaultValues: fields?.reduce((acc, field) => {
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
      reader.onload = function (e) {
        if (/^image/.test(fileInput.files[0].type)) {
          image.src = e.target.result;
          // setValue(name, fileInput.files[0], {
          //   shouldValidate: true,
          //   shouldDirty: true,
          // });
          clearErrors(name);
        } else {
          alert("Selected file is not an image!");
        }
      };

      reader.readAsDataURL(fileInput.files[0]);
    }
  };

  const renderFields = (fields) => {
    return fields?.map((field, i) => {
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
        firstOptionText,
        acceptTypes,
        checkboxStyle,
        placeHolder,
      } = field;

      switch (type) {
        case "text":
          return (
            <div key={i} className={`input-field w-full ${styles}`}>
              <label htmlFor={name} className="input-label">
                {title}
              </label>
              <input
                className="input-box"
                type="text"
                name={name}
                id={name}
                placeholder={placeHolder}
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
            <div key={i} className={`input-field w-full ${styles}`}>
              <label htmlFor={name} className="input-label">
                {title}
              </label>
              <input
                className="input-box"
                type="password"
                name={name}
                id={name}
                readOnly={readOnly}
                placeholder={placeHolder}
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
            <div key={i} className={`input-field w-full ${styles}`}>
              <label htmlFor={name} className="input-label">
                {title}
              </label>
              <input
                className="input-box"
                type="email"
                name={name}
                placeholder={placeHolder}
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
          return !checkboxStyle ? (
            <div key={i} className={`form-group w-full ${styles}`}>
              <input
                type="checkbox"
                name={name}
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
          ) : (
            <div key={i} className={`${styles}`}>
              <label>
                <div className="switch">
                  <input
                    type="checkbox"
                    name={name}
                    readOnly={readOnly}
                    disabled={disabled}
                    hidden
                    id={name}
                    {...register(name, validationProps)}
                  />
                  <div className="slider"></div>
                  <label htmlFor={name}>{title}</label>
                </div>
              </label>
            </div>
          );
        case "select":
          return (
            <div key={i} className={`input-field w-full ${styles}`}>
              <label htmlFor={name}>{title}</label>
              <select
                className="input-box"
                readOnly={readOnly}
                disabled={disabled}
                {...register(name, validationProps)}
                id={name}
              >
                <option value="">
                  {firstOptionText ? firstOptionText : "select an option"}
                </option>
                {field.options?.map((option) => (
                  <option
                    key={option[optionValue]}
                    value={
                      typeof option[optionValue] === "string"
                        ? option[optionValue].toLowerCase()
                        : option[optionValue]
                    }
                  >
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
            <div key={i} className={`input-field w-full  ${styles}`}>
              {field?.fileFor === "image" ? (
                <>
                  <div className={`${field.imgStyle} relative`}>
                    <img
                      src=""
                      onError="this.style.display='none'"
                      alt=""
                      onClick={() => {
                        const fileInput = document.getElementById(name);
                        fileInput.click();
                      }}
                      id="imageFile"
                      className={`absolute w-full rounded-full text-center component-shadow border-mainBorder object-cover ${field.imgStyle}`}
                    />
                    <input
                      type="file"
                      name={name}
                      {...register(name, validationProps)}
                      accept={acceptTypes}
                      id={name}
                      onChange={handleFileChange(name)}
                      className="imageFileInput"
                    />
                    {!image && (
                      <span
                        className="absolute top-[50%] left-[50%] text-sm w-max "
                        style={{ transform: "translate(-50%, -50%)" }}
                      >
                        choose a file
                      </span>
                    )}
                  </div>

                  {errors && errors[name] && (
                    <span role="alert" className="red-text">
                      {errors[name]["message"]}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <label htmlFor={name}>{title}</label>
                  <input
                    type="file"
                    name={name}
                    accept={acceptTypes}
                    className="fileInput"
                    {...register(name, validationProps)}
                    id={name}
                  />
                  {errors && errors[name] && (
                    <span className="red-text">{errors[name]["message"]}</span>
                  )}
                </>
              )}
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
      className={`${addedStyles}  flex flex-col  gap-4 text-primary-text w-auto`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="font-bold text-2xl bt-3">{title}</h3>
      <div className="flex gap-2 flex-wrap justify-between">
        {renderFields(fields)}
      </div>
      <button
        type="submit"
        disabled={!isValid}
        className={`bg-greenColor text-white  p-2 outline-none border-none ${btnWidth} text-base  px-6 rounded-[4px] disabled:bg-gray-600`}
      >
        {btnText}
      </button>
    </form>
  );
};

export default ReusableForm;
