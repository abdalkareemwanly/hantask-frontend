import { useEffect, useState } from "react";
import ReusableForm from "../../../../../Components/ReusableForm";

const QuestionsStep = ({ data, setStepData, setStep, post }) => {
  console.log(post);
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

          if (!isNaN(submittedData[key])) {
            // Check if value is a number
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
    console.log(transformedData);
    setStepData((prev) => ({
      ...prev,
      ...transformedData,
    }));
    setStep(3);
  };
  const [template, setTemplate] = useState();

  const generateTemplate = () => {
    let newTemplate = {
      title: "",
      fields: [],
    };

    post?.questions?.forEach((question) => {
      let field = {
        title: question.question_content,
        name: `question_${question.question_id}`,
        type: question?.form_answer ? "select" : "text",
        optionValue: "answer_id",
        firstOptionText: "select category",
        optionText: "text",
        validationProps: {
          required: {
            value: true,
            message: "This field is required",
          },
        },
        styles: "md:w-[100%]",
        value: question.buyer_answer
          ? question.buyer_answer.answer_id
            ? question.buyer_answer.answer_id
            : question.buyer_answer.buyer_answer
          : null,
      };

      if (field.type === "select") {
        field.options = question.form_answer.map((answer) => ({
          answer_id: answer.id,
          text: answer.content,
        }));

        console.log(field);
      } else {
        console.log(field);
      }

      newTemplate.fields.push(field);
    });

    setTemplate(newTemplate);
  };
  useEffect(() => {
    generateTemplate();
  }, [data]); // Ensure generateTemplate runs whenever data changes

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
