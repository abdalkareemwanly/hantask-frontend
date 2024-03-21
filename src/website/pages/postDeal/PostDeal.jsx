import { useEffect, useReducer, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StepOnePostDeal } from "./components/StepOnePostDeal";
import { StepTwoPostDeal } from "./components/StepTwoPostDeal";
import { StepThreePostDeal } from "./components/StepThreePostDeal";
import StepFourPostDeal from "./components/StepFourPostDeal";
import StepFivePostDeal from "./components/StepFivePostDeal";
import { useGlobalDataContext } from "../../../contexts/GlobalDataContext";
import QuestionComponent from "./components/QuestionComponent";
import axiosClient from "../../../axios-client";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  getQuestionsById,
  questions,
  setQuestions,
  watch,
  handleSubmitData,
  register,
  setValue,
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
          className="absolute h-full"
          initial={{ opacity: 0, x: "110%" }}
          animate={{ opacity: 1, x: "0" }}
          exit={{ opacity: 0, x: "-110%" }}
          transition={{ duration: 0.9, ease: "backInOut" }}
        >
          <StepOnePostDeal
            categories={categories}
            getQuestionsById={getQuestionsById}
            handleDataChange={handleDataChange}
            setSelectedCategory={setSelectedCategory}
            state={state}
            watch={watch}
            goToNextStep={goToNextStep}
            register={register}
            setValue={setValue}
          />
        </motion.div>
      )}
      {step === 2 && (
        <motion.div
          className="absolute h-full"
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
            getQuestionsById={getQuestionsById}
            state={state}
            watch={watch}
            register={register}
            setValue={setValue}
          />
        </motion.div>
      )}
      {/* Render questions dynamically for each step */}
      {questions?.map((question, index) => (
        <AnimatePresence key={`step${step}-question${index}`}>
          {step === index + 3 && (
            <motion.div
              className="absolute h-full"
              key={`step${step}-question${index}`}
              initial={{ opacity: 0, x: "110%" }}
              animate={{ opacity: 1, x: "0" }}
              exit={{ opacity: 0, x: "-110%" }}
              transition={{ duration: 0.9, ease: "backInOut" }}
            >
              <QuestionComponent
                question={question}
                register={register}
                setValue={setValue}
                watch={watch}
                goToNextStep={goToNextStep}
                goToPrevStep={goToPrevStep}
              />
            </motion.div>
          )}
        </AnimatePresence>
      ))}
      {step === questions?.length + 3 && (
        <motion.div
          className="absolute h-full"
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
            watch={watch}
            register={register}
            setValue={setValue}
          />
        </motion.div>
      )}
      {step === questions?.length + 4 && (
        <motion.div
          className="absolute h-full"
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
            watch={watch}
            register={register}
            setValue={setValue}
          />
        </motion.div>
      )}
      {step === questions?.length + 5 && (
        <motion.div
          className="absolute h-full w-[80%]"
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
            watch={watch}
            register={register}
            setValue={setValue}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PostDeal = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nav = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [catQuestions, setCatQuestions] = useState([]);
  const [subQuestions, setSubQuestions] = useState([]);
  const [childQuestions, setChildQuestions] = useState([]);
  const { register, handleSubmit, watch, setValue } = useForm();
  const islogin = localStorage.getItem("ACCESS_TOKEN");
  const isBuyer =
    JSON.parse(localStorage.getItem("USER"))?.user_type === "buyer";

  useEffect(() => {
    if (!islogin) {
      toast.info("login first to access the page");
      setTimeout(() => {
        nav("/login");
      }, 300);
    } else {
      if (!isBuyer) {
        toast.info("this page is only designed for homeowners");
      }
    }
  }, [islogin, isBuyer, nav]);
  console.log(watch());

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

  useEffect(() => {
    setQuestions([...catQuestions, ...subQuestions, ...childQuestions]);
  }, [catQuestions, subQuestions, childQuestions]);

  const getQuestionsById = async (obj) => {
    const res = await axiosClient.post("site/question/show", obj);
    console.log(res.data);
    if (res.data.success) {
      if (obj.category_id !== null) {
        setCatQuestions(res.data.questions);
      } else if (obj.subcategory_id !== null) {
        setSubQuestions(res.data.questions);
      } else if (obj.cahild_category_id !== null) {
        setChildQuestions(res.data.questions);
      }
    }
  };

  const onSubmit = (data) => console.log(data);

  return isBuyer ? (
    <div className="min-h-[700px] flex flex-col justify-between lg:px-20 md:px-12 px-6">
      <div className="py-12 h-auto w-full min-h-[700px]">
        <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
          <StepComponent
            handleDataChange={handleDataChange}
            register={register}
            setValue={setValue}
            step={Number(state.step)}
            state={state}
            watch={watch}
            goToNextStep={goToNextStep}
            goToPrevStep={goToPrevStep}
            handleSubmitData={handleSubmitData}
            getQuestionsById={getQuestionsById}
            questions={questions}
            setQuestions={setQuestions}
          />
        </form>
      </div>
    </div>
  ) : null;
};

export default PostDeal;
