import APPLY_JOB_STEPS from "../data/applyJobSteps";
import "../style/ApplyJobSteps.css";

function ApplyJobSteps({ step, setStep }) {
  try {
    return (
      <>
        <div className="flex flex-col gap-[20px] mt-[3rem]">
          {APPLY_JOB_STEPS.map((item, index) => {
            return (
              <div key={index} className={"flex items-center gap-[10px]"}>
                <div className={"step-icon" + (step > index + 1 ? " previous" : step == index + 1 ? " current" : "")}>{item.icon}</div>
                <div className="step-name">{item.name}</div>
                {step > index + 1 ? (
                  <div
                    className="edit-button"
                    onClick={() => {
                      setStep(index + 1);
                    }}
                  >
                    Edit
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ApplyJobSteps;
