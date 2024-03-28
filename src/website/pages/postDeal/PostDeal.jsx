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
  errors,
  trigger,
  handleSubmitData,
  register,
  setValue,
  _images,
  setImages,
  thumbnail,
  setThumbnail,
  onSubmit,
}) => {
  const {
    categories,
    countries,
    cities,
    setSelectedCategory,
    setSelectedSubCategory,
    filteredSubCategories,
    filteredChildCategories,
  } = useGlobalDataContext();

  const categoryValue = watch("category_id");
  const subcategoryValue = watch("subcategory_id");
  const childCategoryValue = watch("child_category_id");

  useEffect(() => {
    if (categoryValue !== null || categoryValue !== "") {
      getQuestionsById({
        category_id: categoryValue,
        subcategory_id: null,
        child_category_id: null,
      });
      setSelectedCategory({ id: categoryValue });
    }
  }, [categoryValue]);
  useEffect(() => {
    if (subcategoryValue !== null || subcategoryValue !== "") {
      getQuestionsById({
        category_id: null,
        subcategory_id: subcategoryValue,
        child_category_id: null,
      });
      setSelectedSubCategory({ id: subcategoryValue });
    }
  }, [subcategoryValue]);
  useEffect(() => {
    if (childCategoryValue !== null || childCategoryValue !== "") {
      getQuestionsById({
        category_id: null,
        subcategory_id: null,
        child_category_id: childCategoryValue,
      });
    }
  }, [childCategoryValue]);

  return (
    <AnimatePresence>
      {step === 1 && (
        <motion.div
          key="step1"
          className="absolute h-full w-full"
          initial={{ opacity: 0, x: "110%" }}
          animate={{ opacity: 1, x: "0" }}
          exit={{ opacity: 0, x: "-110%" }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <StepOnePostDeal
            categories={categories}
            getQuestionsById={getQuestionsById}
            handleDataChange={handleDataChange}
            setSelectedCategory={setSelectedCategory}
            state={state}
            watch={watch}
            trigger={trigger}
            errors={errors}
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
            trigger={trigger}
            errors={errors}
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
                errors={errors}
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
          className="absolute h-hull w-full"
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
            _images={_images}
            setImages={setImages}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            onSubmit={onSubmit}
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
  const [_images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      category_id: null,
      child_category_id: null,
      subcategory_id: null,
    },
  });
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

  useEffect(() => {
    setQuestions([...catQuestions, ...subQuestions, ...childQuestions]);
  }, [catQuestions, subQuestions, childQuestions]);

  const getQuestionsById = async (obj) => {
    const res = await axiosClient.post("site/question/show", obj);
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

  const onSubmit = async (data) => {
    const toastID = toast.loading("storing...");
    // Function to find question ID based on content
    function findQuestionId(content) {
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].content === content) {
          return questions[i].id;
        }
      }
      return null; // Return null if question not found
    }
    function findQuestionType(content) {
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].content === content) {
          return questions[i].type;
        }
      }
      return null; // Return null if question not found
    }
    console.log(data);
    let transformedData = {
      category_id: data.category_id,
      childCategory_id: data.child_category_id,
      subcategory_id: data.subcategory_id,
      questions: Object.keys(data)
        .filter(
          (key) =>
            key !== "category_id" &&
            key !== "child_category_id" &&
            key !== "subcategory_id" &&
            key !== "country_id" &&
            key !== "city_id" &&
            key !== "budget" &&
            key !== "deadline" &&
            key !== "title" &&
            key !== "description"
        )
        .map((key) => {
          const type = findQuestionType(key);
          console.log(type);
          if (type === "singlechoisdrop") {
            return {
              question_id: findQuestionId(key),
              answer_id: data[key],
            };
          } else {
            return {
              question_id: findQuestionId(key),
              buyer_answer: data[key],
            };
          }
        }),
      country_id: data.country_id,
      city_id: data.city_id,
      budget: data.budget,
      dead_line: data.deadline,
      title: data.title,
      description: data.description,
      image: thumbnail?.file,
    };

    const formData = new FormData();

    // Append each key-value pair to FormData
    Object.entries(transformedData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // If value is an array of objects, handle it accordingly
        value.forEach((item, index) => {
          Object.entries(item).forEach(([subKey, subValue]) => {
            formData.append(`${key}[${index}][${subKey}]`, subValue);
          });
        });
      } else {
        // For non-array values, simply append
        formData.append(key, value);
      }
    });
    const res = await axiosClient.post("/buyer/post/store", formData);
    if (res.data?.success === true) {
      const images = new FormData();
      const id = res.data.data;
      _images.map((ele) => {
        images.append("image[]", ele.file);
      });
      toast.update(toastID, {
        type: "success",
        render: res.data.mes,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
      nav("/customer/jobs");
      const res2 = await axiosClient.post(
        `/buyer/post/image/store/${id}`,
        images
      );
    } else {
      toast.update(toastID, {
        type: "error",
        render: res.data.mes,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    }
  };

  return isBuyer ? (
    <div className="flex flex-col justify-between lg:px-20 md:px-12 px-6 ">
      <div className="my-12 relative  w-full h-[600px] overflow-y-auto overflow-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <StepComponent
            handleDataChange={handleDataChange}
            register={register}
            setValue={setValue}
            step={Number(state.step)}
            state={state}
            watch={watch}
            trigger={trigger}
            errors={errors}
            goToNextStep={goToNextStep}
            goToPrevStep={goToPrevStep}
            getQuestionsById={getQuestionsById}
            questions={questions}
            setQuestions={setQuestions}
            _images={_images}
            setImages={setImages}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            onSubmit={onSubmit}
          />
        </form>
      </div>
    </div>
  ) : null;
};

export default PostDeal;
