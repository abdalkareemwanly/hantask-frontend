function FilterField({ type, placeholder, name, title, dispatch }) {
  try {
    function handleInputChange(e) {
      dispatch({
        type: `change_${name}`,
        newValue: e.target.value,
      });
    }

    return (
      <>
        <div className=" flex flex-col form-input">
          <label htmlFor={name}>{title}</label>
          <input
            // className="border border-[rgba(221, 221, 221, 0.5)] outline-none h-[60px] px-[20px] bg-blocks-color focus:shadow-[var(--input-shadow)] focus:border focus:border-[rgba(29, 191, 115, 0.3)]"
            type={type}
            placeholder={placeholder}
            id={name}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default FilterField;
