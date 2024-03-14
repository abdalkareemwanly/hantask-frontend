import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

export default function FormAnswer({
  setEditQuestionSelected,
  editQuestionSelected,
}) {
  const [numberOfChoices, setNumberOfChoices] = useState(1);
  const handleAddOption = () => {
    setEditQuestionSelected((prevAnswers) => ({
      ...prevAnswers,
      answers: [
        ...editQuestionSelected.answers,
        {
          answer_content: "",
        },
      ],
    }));
  };

  const handleDeleteOption = (index) => {
    setEditQuestionSelected((prevAnswers) => {
      const newAnswers = [...prevAnswers.answers];
      newAnswers.splice(index, 1);
      return {
        ...prevAnswers,
        answers: newAnswers,
      };
    });
  };

  const handleAnswerChange = (index, ev) => {
    const { value } = ev.target;

    const newAnswers = editQuestionSelected.answers.map(
      (answer, choiceIndex) => {
        if (index === choiceIndex) {
          return {
            ...answer,
            answer_content: value,
          };
        }
        return answer;
      }
    );
    setEditQuestionSelected((prev) => ({
      ...prev,
      answers: newAnswers,
    }));
  };

  return (
    editQuestionSelected.type !== "write" && (
      <div className="w-full">
        <div className="flex flex-col gap-4 ">
          <div className="flex px-1 mt-2">Answers</div>
          {editQuestionSelected?.answers?.map((answer, index) => (
            <div key={`answer_${index}`}>
              {Array.from({ length: numberOfChoices }).map((_, choiceIndex) => (
                <div key={`choice_${choiceIndex}`}>
                  <div className="flex flex-row items-center w-full">
                    <input
                      className="input-box w-[60%] bg-blocks-color"
                      type="text"
                      placeholder="Option"
                      name={`content`}
                      onChange={(ev) => handleAnswerChange(index, ev)}
                      value={answer.answer_content}
                    />
                    <button
                      type="button"
                      className="rounded-full bg-red-500 text-white p-1 mx-2 w-fit h-fit"
                      onClick={() => handleDeleteOption(index)}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <button
            type="button"
            className="w-fit bg-green-500 text-white p-2 rounded-lg"
            onClick={handleAddOption}
          >
            <BiAddToQueue />
          </button>
        </div>
      </div>
    )
  );
}
