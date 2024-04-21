import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import CustomSelect from "./formComponents/CustomSelect";

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
  formType,
}) => {
  let { title, fields } = template;
  const [fieldsState, setFieldsState] = useState(fields);

  useEffect(() => {
    setFieldsState(fields);
  }, [fields]);

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
    defaultValues:
      fieldsState &&
      fieldsState?.reduce((acc, field) => {
        field?.value ? (acc[field.name] = field.value) : (acc[field.name] = "");
        return acc;
      }, {}),
  });
  console.log(watch());
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

  const [selectedOptions, setSelectedOptions] = useState([]);
  useEffect(() => {
    setSelectedOptions(
      fieldsState?.map((field) => {
        if (field.type === "select" && field?.options) {
          const selectedOptionsConst = field?.isMultiple
            ? field?.options.filter((option) => {
                // Check if field.value is an array
                if (Array.isArray(field.value)) {
                  // Check if option[field.optionValue] exists in field.value array
                  return field.value.includes(option[field.optionValue]);
                } else {
                  // Handle if field.value is not an array
                  return option[field.optionValue] == field?.value;
                }
              })
            : field?.options.find((option) => {
                if (Array.isArray(field.value)) {
                  // Handle if field.value is an array
                  return field?.value?.includes(option[field?.optionValue]);
                } else {
                  // Handle if field.value is not an array
                  return option[field.optionValue] == field?.value;
                }
              });

          if (selectedOptionsConst) {
            if (field.onFieldChange && field.options) {
              field.onFieldChange(selectedOptionsConst?.id);
            }
            return field?.isMultiple
              ? selectedOptionsConst
              : [selectedOptionsConst];
          }
        } else {
          return null;
        }
      })
    );
    console.log("hello", watch());
  }, [fields?.options]);

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
      register,
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

  // Empty dependency array ensures this runs only once on mount

  const renderFields = (fieldsState) => {
    return fieldsState?.map((field, i) => {
      let {
        title,
        type,
        name,
        validationProps,
        readOnly,
        disabled,
        optionValue,
        searchKey,
        optionText,
        styles,
        acceptTypes,
        checkboxStyle,
        placeHolder,
        connectionWith,
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
        case "number":
          return (
            <div key={i} className={`input-field w-full ${styles}`}>
              <label htmlFor={name} className="input-label">
                {title}
              </label>
              <input
                className="input-box"
                type="number"
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
        case "date":
          return (
            <div key={i} className={`input-field w-full ${styles}`}>
              <label htmlFor={name} className="input-label">
                {title}
              </label>
              <input
                className="input-box"
                type="date"
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
        case "textArea":
          return (
            <div key={i} className={`input-field w-full ${styles}`}>
              <label htmlFor={name} className="input-label">
                {title}
              </label>
              <textarea
                className="input-box"
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
            <CustomSelect
              selectIndex={i} // Example value for i
              styles={styles} // Example value for styles
              title={title} // Example value for title
              name={name} // Example value for name
              validationProps={validationProps} // Example value for validationProps
              register={register} // Example value for register
              field={field}
              errors={errors} // Pass errors object
              optionValue={optionValue}
              searchKey={searchKey}
              optionText={optionText}
              setValue={setValue}
              trigger={trigger}
              fields={fields}
              watch={watch}
              connectionWith={connectionWith}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          );
        case "custom":
          return field.customComponent({
            setError,
            setValue,
            errors,
            clearErrors,
          });

        case "file":
          return (
            <div key={i} className={`input-field w-full  ${styles}`}>
              {field?.fileFor === "image" ? (
                <>
                  <div className={`${field.imgStyle} relative`}>
                    <img
                      src={`https://api.hantask.at/${image}`}
                      onError="this.style.display='none'"
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
                    multiple={false}
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
        {fieldsState && renderFields(fieldsState)}
      </div>
      <button
        type="submit"
        disabled={!isValid}
        className={`bg-greenColor   text-white  p-2 outline-none border-none ${btnWidth} text-base  px-6 rounded-[4px] disabled:bg-gray-600`}
      >
        {btnText}
      </button>
    </form>
  );
};

export default ReusableForm;
