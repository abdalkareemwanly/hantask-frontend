import { useEffect, useReducer } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StepOnePostDeal } from "./components/StepOnePostDeal";
import { StepTwoPostDeal } from "./components/StepTwoPostDeal";
import { StepThreePostDeal } from "./components/StepThreePostDeal";
import StepFourPostDeal from "./components/StepFourPostDeal";
import StepFivePostDeal from "./components/StepFivePostDeal";
import { useGlobalDataContext } from "../../../contexts/GlobalDataContext";
import QuestionComponent from "./components/QuestionComponent";

const initialState = {
  categoryId: "",
  subCategoryId: "",
  childCategoryId: "",
  countyId: "",
  cityId: "",
  budget: "",
  deadline: "",
  title: "",
  description: "",
  imageFile: "",
  step: 1,
};

const questions = [
  {
    id: 1,
    question: "what is your name",
    type: "custom",
  },
  {
    id: 2,
    question: "where are you from",
    type: "selectOne",
    answers: [
      {
        id: 1,
        answer: "syria",
      },
      {
        id: 2,
        answer: "bla",
      },
      {
        id: 3,
        answer: "bla 2",
      },
    ],
  },
  {
    id: 2,
    question: "choose one or more from this services",
    type: "selectMany",
    answers: [
      {
        id: 1,
        answer: "service1",
      },
      {
        id: 2,
        answer: "service2",
      },
      {
        id: 3,
        answer: "service3",
      },
    ],
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "EDIT_FIELD": {
      const newState = {
        ...state,
        [action.payload.key]: action.payload.value,
      };
      return newState;
    }
    case "SET_FORM_DATA":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const StepComponent = ({
  step,
  handleDataChange,
  state,
  goToNextStep,
  goToPrevStep,
  handleSubmitData,
}) => {
  const {
    categories,
    subCategories,
    childCategories,
    countries,
    cities,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    filteredSubCategories,
    filteredChildCategories,
  } = useGlobalDataContext();

  return (
    <AnimatePresence>
      {step === 1 && (
        <motion.div
          key="step1"
          className="absolute"
          initial={{ opacity: 0, x: "110%" }}
          animate={{ opacity: 1, x: "0" }}
          exit={{ opacity: 0, x: "-110%" }}
          transition={{ duration: 0.9, ease: "backInOut" }}
        >
          <StepOnePostDeal
            categories={categories}
            handleDataChange={handleDataChange}
            setSelectedCategory={setSelectedCategory}
            state={state}
            goToNextStep={goToNextStep}
          />
          {/* <div className="my-14 flex items-center justify-center gap-8">
            {state.step !== 1 && (
              <button
                className="bg-orangeColor text-white  p-2 rounded-lg"
                onClick={goToPrevStep}
              >
                Previous
              </button>
            )}
            {state.step !== questions.length + 5 && (
              <button
                className="bg-greenColor text-white  p-2 rounded-lg"
                onClick={goToNextStep}
              >
                Next
              </button>
            )}
            {state.step === 5 && (
              <button
                className="bg-greenColor text-white  p-2 rounded-lg"
                onClick={handleSubmitData}
              >
                finish
              </button>
            )}
          </div> */}
        </motion.div>
      )}
      {step === 2 && (
        <motion.div
          className="absolute"
          key="step2"
          initial={{ opacity: 0, x: "110%" }}
          animate={{ opacity: 1, x: "0" }}
          exit={{ opacity: 0, x: "-110%" }}
          transition={{ duration: 0.9, ease: "backInOut" }}
        >
          <StepTwoPostDeal
            subCategories={filteredSubCategories}
            childCategories={filteredChildCategories}
            setSelectedSubCategory={setSelectedSubCategory}
            handleDataChange={handleDataChange}
            goToNextStep={goToNextStep}
            goToPrevStep={goToPrevStep}
            state={state}
          />
        </motion.div>
      )}

      {/* Render questions dynamically for each step */}
      {questions.map((question, index) => (
        <AnimatePresence key={`step${step}-question${index}`}>
          {step === index + 3 && (
            <motion.div
              className="absolute"
              key={`step${step}-question${index}`}
              initial={{ opacity: 0, x: "110%" }}
              animate={{ opacity: 1, x: "0" }}
              exit={{ opacity: 0, x: "-110%" }}
              transition={{ duration: 0.9, ease: "backInOut" }}
            >
              <QuestionComponent
                question={question}
                goToNextStep={goToNextStep}
                goToPrevStep={goToPrevStep}
              />
            </motion.div>
          )}
        </AnimatePresence>
      ))}
      {step === questions.length + 3 && (
        <motion.div
          className="absolute"
          key="step3"
          initial={{ opacity: 0, x: "110%" }}
          animate={{ opacity: 1, x: "0" }}
          exit={{ opacity: 0, x: "-110%" }}
          transition={{ duration: 0.9, ease: "backInOut" }}
        >
          <StepThreePostDeal
            countries={countries}
            cities={cities}
            handleDataChange={handleDataChange}
            state={state}
            goToNextStep={goToNextStep}
            goToPrevStep={goToPrevStep}
          />
        </motion.div>
      )}
      {step === questions.length + 4 && (
        <motion.div
          className="absolute"
          key="step4"
          initial={{ opacity: 0, x: "110%" }}
          animate={{ opacity: 1, x: "0" }}
          exit={{ opacity: 0, x: "-110%" }}
          transition={{ duration: 0.9, ease: "backInOut" }}
        >
          <StepFourPostDeal
            goToNextStep={goToNextStep}
            goToPrevStep={goToPrevStep}
            handleDataChange={handleDataChange}
            state={state}
          />
        </motion.div>
      )}
      {step === questions.length + 5 && (
        <motion.div
          className="absolute w-[80%]"
          key="step5"
          initial={{ opacity: 0, x: "110%" }}
          animate={{ opacity: 1, x: "0" }}
          exit={{ opacity: 0, x: "-110%" }}
          transition={{ duration: 0.9, ease: "backInOut" }}
        >
          <StepFivePostDeal
            goToNextStep={goToNextStep}
            goToPrevStep={goToPrevStep}
            handleDataChange={handleDataChange}
            handleSubmitData={handleSubmitData}
            state={state}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PostDeal = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const islogin = localStorage.getItem("ACCESS_TOKEN");

  const goToNextStep = () => {
    dispatch({
      type: "EDIT_FIELD",
      payload: {
        key: "step",
        value: Number(state.step) + 1,
      },
    });
  };

  const goToPrevStep = () => {
    dispatch({
      type: "EDIT_FIELD",
      payload: {
        key: "step",
        value: Number(state.step) - 1,
      },
    });
  };

  const handleDataChange = (key, value) => {
    dispatch({
      type: "EDIT_FIELD",
      payload: {
        key: key,
        value: value,
      },
    });
  };

  const handleSubmitData = async () => {
    if (islogin) {
      console.log("yes logged in");
    } else {
      console.log("no login");
    }
  };

  return (
    <div className="min-h-[300px] flex flex-col justify-between lg:px-20 md:px-12 px-6">
      <div className="py-12 h-auto w-full min-h-[550px]">
        <StepComponent
          handleDataChange={handleDataChange}
          step={Number(state.step)}
          state={state}
          goToNextStep={goToNextStep}
          goToPrevStep={goToPrevStep}
          handleSubmitData={handleSubmitData}
        />
      </div>
    </div>
  );
};

export default PostDeal;
