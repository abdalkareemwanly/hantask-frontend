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
  const { countries, cities, categories, subCategories, childCategories } =
    useGlobalDataContext();
  const { data: post, isLoading } = useQueryHook(["post", id], () =>
    getData(id)
  );
  const [filteredSubCategories, setFilteredSubCategories] = useState();
  const [filteredChilds, setFilteredChilds] = useState();
  const [filteredCities, setFilteredCities] = useState();

  const deleteMutate = useMutationHook(deleteFunc, ["post", id]);
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
      handleMainCategoryChange(post.category_id);
      handleChangeSubCategories(post.subcategory_id);
      handleCountriesChange(post.country_id);

      setThumbnail(post?.image);
      setReadyImages(post.postimages);
    }
  }, [post, countries, cities, categories, subCategories, childCategories]);

  useEffect(() => {
    if (filteredChilds && filteredCities && filteredSubCategories) {
      setStepData({
        category: post.category_id,
        subCategory: post.subcategory_id,
        childCategory: post.childCategory_id,
        country: post.country_id,
        city: post.city_id,
        title: post.title,
        budget: post.budget,
        deadlineDate: post.dead_line,
        description: post.description,
      });
    }
  }, [filteredChilds, filteredCities, filteredSubCategories]);

  const handleMainCategoryChange = (value) => {
    const selectedMainCategory = categories?.find((obj) => obj.id == value);
    const updatedFilteredSubCategories = subCategories?.filter(
      (obj) => obj.categoryName === selectedMainCategory?.name
    );
    setFilteredSubCategories(updatedFilteredSubCategories);
  };

  const handleChangeSubCategories = (value) => {
    const selectedMainCategory = subCategories?.find((obj) => obj.id == value);
    const updatedFilteredSubCategories = childCategories?.filter(
      (obj) => obj.subcategoryName === selectedMainCategory?.name
    );
    setFilteredChilds(updatedFilteredSubCategories);
  };

  const handleCountriesChange = (value) => {
    const selectedCountry = countries?.find((obj) => obj.id == value);
    const updatedCiteis = cities?.filter(
      (obj) => obj.country === selectedCountry?.country
    );
    setFilteredCities(updatedCiteis);
  };

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

  const handleDeleteAddedImage = (id) => {
    try {
      const user = deleteMutate.mutateAsync(id);
      const updatedImages = readyImages.filter((ele) => ele.id == id);
      setReadyImages(updatedImages);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFinish = async () => {
    const formData = new FormData();
    // Append each key-value pair to FormData\
    console.log(stepData);
    Object.entries(stepData).forEach(([key, value]) => {
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
    if (thumbnail?.file) {
      formData.append("image", thumbnail.file);
    }
    const toastId = toast.loading("loading...");
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
      toast.update(toastId, {
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
  console.log(stepData);

  if (isLoading) return <Loader />;
  return (
    <Page>
      <PageTitle text={"edit job post"} />
      {step === 1 ? (
        stepData &&
        filteredChilds &&
        filteredCities &&
        filteredSubCategories && (
          <Step1
            data={stepData}
            categories={categories}
            countries={countries}
            subCategories={filteredSubCategories}
            childCategories={filteredChilds}
            cities={filteredCities}
            setStepData={setStepData}
            setStep={setStep}
            handleMainCategoryChange={handleMainCategoryChange}
            handleChangeSubCategories={handleChangeSubCategories}
            handleCountriesChange={handleCountriesChange}
            stepData={stepData}
          />
        )
      ) : step === 2 ? (
        <QuestionsStep
          data={stepData}
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
