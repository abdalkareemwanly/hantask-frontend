import PageTitle from "../../../../Components/PageTitle";
import { Page } from "../../../../Components/StyledComponents";
import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import { useGlobalDataContext } from "../../../../contexts/GlobalDataContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQueryHook } from "../../../../hooks/useQueryHook";
import Loader from "../../../../Components/Loader";
import Swal from "sweetalert2";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import { Step1 } from "./components/Step1";
import Step2 from "./components/Step2";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import QuestionsStep from "./components/QuestionsStep";
import NetworkErrorComponent from "../../../../Components/NetworkErrorComponent";
// get the query client

const getData = async (id) => {
  const res = await axiosClient.get(`/buyer/post/${id}`);
  return res.data.data[0];
};

const deleteFunc = async (id) => {
  const res = await axiosClient.get(`buyer/post/image/delete/${id}`);
  return res.data.data;
};
const updateDataFunc = async ({ data, id }) => {
  const res = await axiosClient.post(`/buyer/post/update/${id}`, data);
  return res;
};
const EditJob = () => {
  const nav = useNavigate();
  const id = useParams().id;
  const queryClient = useQueryClient();
  const {
    categories,
    countries,
    cities,
    subCategories,
    childCategories,
    setSelectedCategory,
    setSelectedSubCategory,
    filteredSubCategories,
    filteredChildCategories,
    setSelectedCountry,
    filteredCities,
    areas,
    globalLoading,
    setSelectedCity,
    filteredAreas,
  } = useGlobalDataContext();
  const {
    data: post,
    isLoading,
    isError,
  } = useQueryHook(["post", id], () => getData(id));
  const [deletedMultipleAnswers, setDeletedMultipleAnswers] = useState([]);

  const updateDataMutate = useMutationHook(updateDataFunc, ["post", id]);
  const [stepData, setStepData] = useState();

  useEffect(() => {
    if (
      post &&
      countries &&
      cities &&
      categories &&
      subCategories &&
      childCategories
    ) {
      setSelectedCategory(post?.category_id);
      setSelectedSubCategory(post?.subCategory_id);
      setSelectedCountry(post?.country_id);
      setThumbnail(post?.image);
      setReadyImages(post?.postimages);
    }
  }, [post, countries, cities, categories, subCategories, childCategories]);

  useEffect(() => {
    setStepData({
      category: post?.category_id,
      subCategory: post?.subcategory_id,
      childCategory: post?.childCategory_id,
      country: post?.country_id,
      city: post?.city_id,
      title: post?.title,
      budget: post?.budget,
      deadlineDate: post?.dead_line,
      description: post?.description,
    });
  }, [post]);

  const [_images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState();
  const [readyImages, setReadyImages] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [step, setStep] = useState(1);

  const handleDeleteImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const confirmHandleDeleteImages = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      theme: "dark",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteAddedImage(id);
      }
    });
  };

  const handleDeleteAddedImage = async (id) => {
    try {
      // const user = deleteMutate.mutateAsync(id);
      const res = await axiosClient.get(`buyer/post/image/delete/${id}`);
      if (res.data.success) {
        const updatedImages = readyImages.filter((ele) => ele.id == id);
        setReadyImages(updatedImages);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(deletedMultipleAnswers);
  console.log(stepData);
  const handleFinish = async () => {
    const toastID = toast.loading("Processing...");

    let transformedData = {
      category_id: stepData.category[0].id,
      childCategory_id: stepData.subCategory[0].id,
      subcategory_id: stepData.subCategory[0].id,
      questions: [
        ...stepData.questions
          .map((question) => {
            if (Array.isArray(question.buyer_answer)) {
              return question.buyer_answer.map((answer) => ({
                question_id: question.question_id,
                answer_id: answer.answer_id,
              }));
            } else {
              return {
                question_id: question.question_id,
                buyer_answer: question.buyer_answer,
              };
            }
          })
          .flat(),
        ...deletedMultipleAnswers,
      ],
      country_id: stepData.country[0].id,
      city_id: stepData.city[0].id,
      budget: stepData.budget,
      dead_line: stepData.deadlineDate,
      title: stepData.title,
      description: stepData.description,
    };

    const formData = new FormData();

    Object.entries(transformedData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          Object.entries(item).forEach(([subKey, subValue]) => {
            formData.append(`${key}[${index}][${subKey}]`, subValue);
          });
        });
      } else {
        formData.append(key, value);
      }
    });
    if (thumbnail?.file) {
      formData.append("image", thumbnail.file);
    }

    const images = new FormData();
    _images.map((ele) => {
      images.append("image[]", ele.file);
    });

    const res = await updateDataMutate.mutateAsync({ data: formData, id });
    const res2 = await axiosClient.post(
      `/buyer/post/image/store/${id}`,
      images
    );
    if (res.data?.success === true) {
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
      // invalidate and force refetch a query
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
        refetchType: "all",
      });
    }
  };

  // for questions step
  const [template, setTemplate] = useState(null);
  const [groupedData, setGroupedData] = useState([]);

  const generateTemplate = () => {
    if (!groupedData) return;
    let newTemplate = {
      title: "",
      fields: [],
    };
    groupedData?.forEach((question) => {
      let field = {
        title: question.question_content,
        name: `question_${question.question_id}`,
        type: question?.form_answer.length > 0 ? "select" : "text",
        optionValue: "answer_id",
        firstOptionText: "select category",
        optionText: "text",
        isMultiple: question?.question_type === "multiplechoise" ? true : false,
        validationProps: {
          required: {
            value: true,
            message: "This field is required",
          },
        },
        onFieldChange: (option) => {
          if (option) {
            console.log(option);
            setDeletedMultipleAnswers((prev) => {
              const isExist = prev.some((ele) => ele.id === option.id);

              if (isExist) {
                // If the option already exists in the deletedMultipleAnswers, remove it
                return prev.filter((ele) => ele.id !== option.id);
              } else {
                // If the option doesn't exist, add it to the deletedMultipleAnswers
                return [...prev, option];
              }
            });
          }
        },
        styles: "md:w-[100%]",
        value: question.buyer_answer
          ? question.buyer_answer.answer_id
            ? question.buyer_answer.answer_id
            : question.buyer_answer.buyer_answer
          : null,
      };
      if (field.type === "select") {
        console.log(question);
        field.options = question.form_answer.map((answer) => ({
          answer_id: answer.id,
          text: answer.content,
          question_id: question.question_id,
          post_id: id,
        }));
      }

      newTemplate.fields.push(field);
    });

    setTemplate(newTemplate);
  };
  console.log(groupedData);

  useEffect(() => {
    const groupedDataInitial = [];

    post?.questions.forEach((item) => {
      const { question_id, question_type } = item;
      if (question_type === "multiplechoise") {
        const existingItem = groupedDataInitial.find(
          (groupedItem) => groupedItem.question_id === question_id
        );
        if (!existingItem) {
          groupedDataInitial.push({
            ...item,
            form_answer: item.form_answer,
            buyer_answer: item.buyer_answer.answer_id
              ? {
                  ...item.buyer_answer,
                  answer_id: [item.buyer_answer.answer_id],
                }
              : item.buyer_answer,
          });
        } else {
          existingItem.form_answer.push(item.form_answer);
          if (item.buyer_answer.answer_id) {
            existingItem.buyer_answer.answer_id.push(
              item.buyer_answer.answer_id
            );
          }
        }
      } else {
        groupedDataInitial.push(item);
      }
    });
    setGroupedData(groupedDataInitial);
  }, [post]);

  console.log(groupedData);
  useEffect(() => {
    generateTemplate();
  }, [groupedData]); // Ensure generateTemplate runs whenever data changes
  if (globalLoading || isLoading) return <Loader />;
  if (isError) <NetworkErrorComponent />;
  return (
    <Page>
      <PageTitle text={"edit deal data"} />
      {step === 1 ? (
        <Step1
          data={post}
          categories={categories}
          countries={countries}
          subCategories={filteredSubCategories}
          childCategories={filteredChildCategories}
          cities={filteredCities}
          setStepData={setStepData}
          setStep={setStep}
          stepData={stepData}
        />
      ) : step === 2 ? (
        <QuestionsStep
          template={template}
          setStepData={setStepData}
          setStep={setStep}
          post={post}
        />
      ) : (
        <Step2
          setImages={setImages}
          setThumbnail={setThumbnail}
          thumbnail={thumbnail}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          _images={_images}
          readyImages={readyImages}
          handleDeleteImage={handleDeleteImage}
          confirmHandleDeleteImages={confirmHandleDeleteImages}
          handleFinish={handleFinish}
          setStep={setStep}
        />
      )}
    </Page>
  );
};

export default EditJob;
