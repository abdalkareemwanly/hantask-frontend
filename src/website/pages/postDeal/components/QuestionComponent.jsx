import { useEffect } from "react";
import CustomSelectForManyUses from "../../../../Components/formComponents/CustomSelectForManyUses";

const QuestionComponent = ({
  question,
  goToPrevStep,
  goToNextStep,
  setValue,
  watch,
  register,
  errors,
  trigger,
  selectedOptions,
  setSelectedOptions,
}) => {
  useEffect(() => {
    trigger();
  }, []);
  const renderQuestionType = () => {
    switch (question.type) {
      case "write":
        return (
          <>
            <div className="flex flex-col gap-2 mb-4 min-w-[400px]">
              <label htmlFor={question.content}> {question.content}</label>
              <input
                name={question.content}
                className="input-box w-full"
                id={question.content}
                {...register(question.content, {
                  required: "This field is required",
                })}
                type="text"
                // value={watch(question.content) ? watch(question.content) : ""}
                // onChange={(e) => setValue(question.content, e.target.value)}
                placeholder={question.content}
              />
              {errors[question.content] && errors[question.content].message}
            </div>
            <div className="flex gap-2 ">
              <div
                className="bg-orangeColor text-white  p-2 rounded-lg"
                onClick={goToPrevStep}
              >
                Previous
              </div>
              <div
                className={`bg-greenColor text-white  p-2 rounded-lg ${
                  errors[question?.content]?.message ||
                  watch(question?.content) === null ||
                  watch(question?.content) === ""
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }  `}
                onClick={
                  errors[question?.content]?.message ||
                  watch(question?.content) === null ||
                  watch(question?.content) === ""
                    ? null
                    : goToNextStep
                }
              >
                Next
              </div>
            </div>
          </>
        );
      case "singlechoisdrop":
        return (
          <>
            <div className="flex flex-col gap-2 mb-4 min-w-[400px]">
              <label htmlFor={question.content}> {question.content}</label>
              <select
                id={question.content}
                {...register(question.content, {
                  required: "This field is required",
                })}
                className="input-box w-full"
              >
                <option value={""}>choose an option</option>

                {question.answers.map((answer) => (
                  <option key={answer.id} value={answer.id}>
                    {answer.answer_content}
                  </option>
                ))}
              </select>
              {errors[question.content] && errors[question.content].message}
            </div>
            <div className="flex gap-2 ">
              <div
                className="bg-orangeColor text-white  p-2 rounded-lg"
                onClick={goToPrevStep}
              >
                Previous
              </div>
              <div
                className={`bg-greenColor text-white  p-2 rounded-lg ${
                  errors[question?.content]?.message ||
                  watch(question?.content) === null ||
                  watch(question?.content) === ""
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }  `}
                onClick={
                  errors[question?.content]?.message ||
                  watch(question?.content) === null ||
                  watch(question?.content) === ""
                    ? null
                    : goToNextStep
                }
              >
                Next
              </div>
            </div>
          </>
        );
      case "multiplechoise":
        return (
          <>
            <div className="flex flex-col gap-2 mb-4 min-w-[400px]">
              <CustomSelectForManyUses
                errors={errors}
                isMultiple={true}
                optionText={"answer_content"}
                optionValue={"id"}
                options={question.answers}
                nameOfField={question.content}
                register={register}
                trigger={trigger}
                watch={watch}
                validationProps={{
                  required: {
                    value: true,
                    message: "please choose a profile image first",
                  },
                }}
                title={question.content}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                setValue={setValue}
              />
            </div>
            <div className="flex gap-2 ">
              <div
                className="bg-orangeColor text-white  p-2 rounded-lg"
                onClick={goToPrevStep}
              >
                Previous
              </div>
              <div
                className={`bg-greenColor text-white  p-2 rounded-lg ${
                  errors[question?.content] ||
                  errors[question?.content]?.message ||
                  watch(question?.content) === null ||
                  watch(question?.content) === ""
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }  `}
                onClick={
                  errors[question?.content]?.message ||
                  watch(question?.content) === null ||
                  watch(question?.content) === ""
                    ? null
                    : goToNextStep
                }
              >
                Next
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="question max-w-[620px] flex flex-col gap-4">
      <h1 className="text-3xl font-bold">answer the questions given below</h1>
      <h3 className="text-2xl font-bold">{question.question}</h3>
      {renderQuestionType()}
    </div>
  );
};

export default QuestionComponent;
