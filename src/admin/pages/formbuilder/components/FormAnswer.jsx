import React, { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../../../Components/Button";

export default function FormAnswer({ formbuilder, createFrom }) {
  const [numberOfChoices, setNumberOfChoices] = useState(1);
  const [answers, setAnswers] = useState([
    {
      answer_content: "",
    },
  ]);

  console.log(answers);

  const handleAddOption = () => {
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        answer_content: "",
      },
    ]);
  };

  const handleDeleteOption = (index) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers.splice(index, 1);
      return newAnswers;
    });
  };

  const handleAnswerChange = (index, ev) => {
    const { value } = ev.target;
    const newAnswers = answers.map((answer, choiceIndex) => {
      if (index === choiceIndex) {
        return {
          ...answer,
          answer_content: value,
        };
      }
      return answer;
    });
    setAnswers(newAnswers);
    createFrom("answer", { answer: answers });
  };

  return formbuilder === "answer" ? (
    <AnimatePresence>
      <motion.div
        key="step4"
        className="px-4 py-2 w-full"
        initial={{ opacity: 0, y: "110%" }}
        animate={{ opacity: 1, y: "0" }}
        exit={{ opacity: 0, y: "-110%" }}
        transition={{ duration: 0.9, ease: "backInOut" }}
      >
        <div className="flex flex-col gap-4  bg-blocks-color rounded-lg ">
          <div className="flex px-1 mt-2">Answers</div>
          {answers.map((answer, index) => (
            <div key={`answer_${index}`}>
              {Array.from({ length: numberOfChoices }).map((_, choiceIndex) => (
                <div key={`choice_${choiceIndex}`}>
                  <div className="flex flex-row items-center w-full">
                    <input
                      className="input-box w-[60%] bg-background-color"
                      type="text"
                      placeholder="Option"
                      name={`content`}
                      onChange={(ev) => handleAnswerChange(index, ev)}
                      value={answer.value}
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
      </motion.div>
    </AnimatePresence>
  ) : null;
}
