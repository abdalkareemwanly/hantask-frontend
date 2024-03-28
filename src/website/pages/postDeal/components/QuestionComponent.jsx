const QuestionComponent = ({
  question,
  goToPrevStep,
  goToNextStep,
  setValue,
  watch,
  register,
}) => {
  const renderQuestionType = () => {
    switch (question.type) {
      case "write":
        return (
          <div className="flex flex-col gap-2 mb-4 min-w-[400px]">
            <label htmlFor={question.content}> {question.content}</label>
            <input
              name={question.content}
              className="input-box w-full"
              id={question.content}
              type="text"
              value={watch(question.content) ? watch(question.content) : ""}
              onChange={(e) => setValue(question.content, e.target.value)}
              placeholder={question.content}
            />
          </div>
        );
      case "singlechoisdrop":
        return (
          <div className="flex flex-col gap-2 mb-4 min-w-[400px]">
            <label htmlFor={question.content}> {question.content}</label>
            <select
              id={question.content}
              {...register(question.content, {
                required: "This field is required",
              })}
              className="input-box w-full"
            >
              {question.answers.map((answer) => (
                <option key={answer.id} value={answer.id}>
                  {answer.answer_content}
                </option>
              ))}
            </select>
          </div>
        );
      case "multiplechoise":
        return (
          <div className="flex flex-col gap-2 mb-4 min-w-[400px]">
            <label htmlFor={question.content}> {question.content}</label>

            <select
              name={question.content}
              id={question.content}
              onChange={(e) => setValue(question.content, e.target.value)}
              value={watch(question.content) ? watch(question.content) : ""}
              className="input-box w-full"
              multiple
            >
              {question.answers.map((answer) => (
                <option key={answer.id} value={answer.id}>
                  {answer.answer_content}
                </option>
              ))}
            </select>
          </div>
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
      <div className="flex gap-2 ">
        <div
          className="bg-orangeColor text-white  p-2 rounded-lg"
          onClick={goToPrevStep}
        >
          Previous
        </div>
        <div
          className="bg-greenColor text-white  p-2 rounded-lg"
          onClick={goToNextStep}
          // disabled={Object.values(errors).length == 0}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default QuestionComponent;
