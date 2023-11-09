import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const ReusableForm = ({
  template,
  onSubmit,
  watchFields,
  validate,
  btnWidth,
  btnText,
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

  const renderFields = (fields) => {
    return fields?.map((field) => {
      let { title, type, name, validationProps, readOnly, disabled } = field;
      switch (type) {
        case "text":
          return (
            <div key={name} className="input-field">
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
        case "email":
          return (
            <div key={name} className="input-field">
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
            <div key={name} className="form-group">
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
            <div key={name} className="input-field">
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
                  <option key={option.title} value={option.value}>
                    {option.title}
                  </option>
                ))}
              </select>
              {errors && errors[name] && (
                <span className="red-text">{errors[name]["message"]}</span>
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
    <div>
      <form
        className="flex flex-col gap-2 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="font-bold text-2xl">{title}</h3>
        {renderFields(fields)}
        <button
          type="submit"
          name={name}
          disabled={!isValid}
          className={`bg-greenBtn p-2 outline-none border-none ${btnWidth} mt-3  px-6 rounded-[4px] disabled:bg-gray-600`}
        >
          {btnText}
        </button>
      </form>
    </div>
  );
};

export default ReusableForm;
