import { useEffect, useState } from "react";
import ReusableForm from "../../../../../Components/ReusableForm";

const QuestionsStep = ({ template, setStepData, setStep }) => {
  const onSubmit = async (values) => {
    // Transform function
    const transformData = (submittedData) => {
      const transformedData = { ...submittedData }; // Copy submitted data

      const questions = [];
      // Extract question IDs and answer IDs or buyer answers
      Object.keys(submittedData).forEach((key) => {
        if (key.startsWith("question_")) {
          const question_id = parseInt(key.replace("question_", ""));
          let answer_id = null;
          let buyer_answer = null;

          // Check if value is a number
          if (!isNaN(submittedData[key])) {
            answer_id = parseInt(submittedData[key]);
          } else {
            buyer_answer = submittedData[key];
          }

          if (answer_id !== null) {
            questions.push({ question_id, answer_id });
            delete transformedData[key];
          } else if (buyer_answer !== null) {
            questions.push({ question_id, buyer_answer });
            delete transformedData[key];
          }
        }
      });

      // Add questions array to transformed data
      transformedData.questions = questions;

      return transformedData;
    };

    // Transformed data
    const transformedData = transformData(values);
    setStepData((prev) => ({
      ...prev,
      ...transformedData,
    }));
    setStep(3);
  };

  return (
    <div>
      {template && (
        <ReusableForm
          template={template}
          onSubmit={onSubmit}
          // validate={validate}
          btnWidth={"w-[150px] self-end"}
          btnText={"next"}
          addedStyles={"md:w-[400px] lg:w-[100%]"}
        />
      )}
    </div>
  );
};

export default QuestionsStep;
