import "./style/SubmitButton.css";

function SubmitButton({ width, text, classes, notSubmit, onClick }) {
  try {
    return (
      <>
        <input type={notSubmit ? "button" : "submit"} onClick={onClick ? onClick : null} value={text ? text : "Submit"} className={`flex justify-between gap-1 ${`w-[${width ? width : "max-content"}]`} items-center cursor-pointer px-3 py-2 rounded-[4px] text-white submit-button ${classes ? classes : ""}`} />
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default SubmitButton;
