import "./style/SubmitButton.css";

function SubmitButton({ width, text, classes, notSubmit, onClick, disabled }) {
  try {
    return (
      <>
        <input
          type={notSubmit ? "button" : "submit"}
          onClick={onClick ? onClick : null}
          value={text ? text : "Submit"}
          disabled={disabled}
          className={` bg-greenColor disabled:cursor-not-allowed flex justify-between gap-1 ${`w-[${
            width ? width : "max-content"
          }]`} items-center cursor-pointer px-3 py-2 rounded-[4px] text-white submit-button ${
            classes ? classes : ""
          }`}
        />
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default SubmitButton;
