const QuestionComponent = ({ question, goToPrevStep, goToNextStep }) => {
  const renderQuestionType = () => {
    switch (question.type) {
      case "custom":
        return (
          <input
            className="input-box w-full"
            type="text"
            placeholder={question.question}
          />
        );
      case "selectOne":
        return (
          <div>
            <select className="input-box w-full">
              {question.answers.map((answer) => (
                <option key={answer.id} value={answer.id}>
                  {answer.answer}
                </option>
              ))}
            </select>
          </div>
        );
      case "selectMany":
        return (
          <div>
            <p>{question.question}</p>
            {question.answers.map((answer) => (
              <label key={answer.id}>
                <input type="checkbox" value={answer.id} /> {answer.answer}
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="question max-w-[620px] flex flex-col gap-4">
      <h3 className="text-2xl font-bold">{question.question}</h3>
      {renderQuestionType()}
      <div>
        <button
          className="bg-orangeColor text-white  p-2 rounded-lg"
          onClick={goToPrevStep}
        >
          Previous
        </button>
        <button
          className="bg-greenColor text-white  p-2 rounded-lg"
          onClick={goToNextStep}
          // disabled={Object.values(errors).length == 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionComponent;
