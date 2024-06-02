import { useEffect } from "react";
import { useGlobalDataContext } from "../../../../contexts/GlobalDataContext";
import { motion, AnimatePresence } from "framer-motion";
import StepFivePostDeal from "./StepFivePostDeal";
import StepFourPostDeal from "./StepFourPostDeal";
import { StepThreePostDeal } from "./StepThreePostDeal";
import QuestionComponent from "./QuestionComponent";
import { StepTwoPostDeal } from "./StepTwoPostDeal";
import { StepOnePostDeal } from "./StepOnePostDeal";

export const StepComponent = ({
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
  selectedOptions,
  setSelectedOptions,
}) => {
  const {
    categories,
    countries,
    setSelectedCategory,
    setSelectedSubCategory,
    filteredSubCategories,
    filteredChildCategories,
    setSelectedCountry,
    filteredCities,
    setSelectedCity,
    filteredAreas,
  } = useGlobalDataContext();
  console.log(filteredCities);
  const categoryValue = watch("category_id");
  const subcategoryValue = watch("subcategory_id");
  const childCategoryValue = watch("child_category_id");
  const countryValue = watch("country_id");
  const cityValue = watch("city_id");
  useEffect(() => {
    console.log(countryValue);
    setSelectedCountry({ id: Number(countryValue) });
    console.log("change country");
  }, [countryValue]);

  useEffect(() => {
    setSelectedCity({ id: Number(cityValue) });
    console.log("change city");
  }, [cityValue]);

  useEffect(() => {
    if (
      categoryValue !== null ||
      categoryValue !== "" ||
      categoryValue?.length !== 0
    ) {
      getQuestionsById({
        category_id: categoryValue,
        subcategory_id: null,
        child_category_id: null,
      });
      setSelectedCategory({ id: categoryValue });
    }
  }, [categoryValue]);

  useEffect(() => {
    if (
      subcategoryValue !== null ||
      subcategoryValue !== "" ||
      subcategoryValue?.length !== 0
    ) {
      getQuestionsById({
        category_id: null,
        subcategory_id: subcategoryValue,
        child_category_id: null,
      });
      setSelectedSubCategory({ id: subcategoryValue });
    }
  }, [subcategoryValue]);

  useEffect(() => {
    if (
      childCategoryValue !== null ||
      childCategoryValue !== "" ||
      childCategoryValue?.length !== 0
    ) {
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
            handleDataChange={handleDataChange}
            setSelectedCategory={setSelectedCategory}
            state={state}
            watch={watch}
            trigger={trigger}
            errors={errors}
            goToNextStep={goToNextStep}
            register={register}
            setValue={setValue}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
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
            state={state}
            watch={watch}
            trigger={trigger}
            errors={errors}
            register={register}
            setValue={setValue}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
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
                trigger={trigger}
                goToNextStep={goToNextStep}
                goToPrevStep={goToPrevStep}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
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
            cities={filteredCities}
            handleDataChange={handleDataChange}
            state={state}
            areas={filteredAreas}
            goToNextStep={goToNextStep}
            goToPrevStep={goToPrevStep}
            watch={watch}
            errors={errors}
            register={register}
            setValue={setValue}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            trigger={trigger}
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
            errors={errors}
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
            errors={errors}
            setThumbnail={setThumbnail}
            onSubmit={onSubmit}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
