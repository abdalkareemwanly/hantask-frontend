import { toast } from "react-toastify";
import PageTitle from "../../../../Components/PageTitle";
import ReusableForm from "../../../../Components/ReusableForm";
import { Page } from "../../../../Components/StyledComponents";
import { useEffect, useState } from "react";
import CropeerImage from "../../../../Components/CropeerImage";
import { MdDelete } from "react-icons/md";
import axiosClient from "../../../../axios-client";
import { useGlobalDataContext } from "../../../../contexts/GlobalDataContext";

const AddJob = () => {
  const [stepData, setStepData] = useState();
  const { countries, cities, categories, subCategories, childCategories } =
    useGlobalDataContext();

  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const handleMainCategoryChange = (e) => {
    const selectedMainCategory = categories?.find(
      (obj) => obj.id == e.target.value
    );
    const updatedFilteredSubCategories = subCategories?.filter(
      (obj) => obj.categoryName === selectedMainCategory?.name
    );
    setFilteredSubCategories(updatedFilteredSubCategories);
  };

  const [filteredChilds, setFilteredChilds] = useState([]);
  const handleChangeSubCategories = (e) => {
    const selectedMainCategory = subCategories?.find(
      (obj) => obj.id == e.target.value
    );
    const updatedFilteredSubCategories = childCategories?.filter(
      (obj) => obj.subcategoryName === selectedMainCategory?.name
    );
    setFilteredChilds(updatedFilteredSubCategories);
  };

  const [filteredCities, setFilteredCities] = useState([]);
  const handleCountriesChange = (e) => {
    const selectedCountry = countries?.find((obj) => obj.id == e.target.value);
    const updatedCiteis = cities?.filter(
      (obj) => obj.country === selectedCountry?.country
    );
    setFilteredCities(updatedCiteis);
  };
  let template = {
    title: "",
    fields: [
      {
        title: "job title *",
        name: "title",
        type: "text",
        value: stepData?.title,
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[30%]",
      },
      {
        title: "budget *",
        name: "budget",
        value: stepData?.budget,
        type: "number",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[30%]",
      },
      {
        title: "deadline date to apply to this job",
        name: "deadlineDate",
        value: stepData?.deadlineDate,
        type: "date",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[30%]",
      },
      {
        title: "category *",
        value: stepData?.category,
        name: "category",
        type: "select",
        optionValue: "id",
        options: [...categories],
        optionText: "name",
        firstOptionText: "select category",
        validationProps: {
          onChange: handleMainCategoryChange,
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[30%]",
      },
      {
        title: "sub category *",
        value: stepData?.subCategory,
        name: "subCategory",
        type: "select",
        optionValue: "id",
        options: [...filteredSubCategories],
        optionText: "name",
        firstOptionText: "select sub category",
        validationProps: {
          onChange: handleChangeSubCategories,
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[30%]",
      },
      {
        title: "child category *",
        value: stepData?.childCategory,
        name: "childCategory",
        type: "select",
        optionValue: "id",
        options: [...filteredChilds],
        optionText: "name",
        firstOptionText: "select subCategory",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[30%]",
      },
      {
        title: "country *",
        name: "country",
        value: stepData?.country,
        options: [...countries],
        optionValue: "id",
        optionText: "country",
        type: "select",
        firstOptionText: "select sub category",
        validationProps: {
          onChange: handleCountriesChange,
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
      {
        title: "city *",
        name: "city",
        type: "select",
        optionValue: "id",
        options: [...filteredCities],
        value: stepData?.city,
        optionText: "service_city",
        firstOptionText: "select sub category",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
      {
        title: "description *",
        name: "description",
        value: stepData?.description,
        type: "textArea",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[100%]",
      },
    ],
  };

  const [_images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [step, setStep] = useState(1);

  const onSubmit = async (values) => {
    setStepData({ ...values });
    setStep(2);
    // const id = toast.loading("please wait...");
    // const area = {
    //   ...values,
    // };
    // const formData = new FormData();
    // formData.append("service_area", area.service_area);
    // formData.append("country_id", area.country_id);
    // formData.append("service_city_id", area.service_city_id);
    // try {
    //   //   const city = await mutation.mutateAsync(formData);
    //   //   setIsAddModalOpen((prev) => !prev);
    //   toast.update(id, {
    //     type: "success",
    //     render: city.mes,
    //     closeOnClick: true,
    //     isLoading: false,
    //     autoClose: true,
    //     closeButton: true,
    //     pauseOnHover: false,
    //   });
    //   setStep(2);
    // } catch (error) {
    //   toast.update(id, {
    //     type: "error",
    //     render: error.response.data.message,
    //     closeOnClick: true,
    //     isLoading: false,
    //     autoClose: true,
    //     closeButton: true,
    //     pauseOnHover: false,
    //   });
    // }
  };

  const handleFinish = async () => {

    const formData = new FormData();
    formData.append("title", stepData.title);
    formData.append("description", stepData.description);
    formData.append("budget", stepData.budget);
    formData.append("dead_line", stepData.deadlineDate);
    formData.append("category_id", stepData.category);
    formData.append("subcategory_id", stepData.subCategory);
    formData.append("childCategory_id", stepData.childCategory);
    formData.append("country_id", stepData.country);
    formData.append("city_id", stepData.city);
    formData.append("image", thumbnail.file);

    const res = await axiosClient.post(`/buyer/post/store`, formData);

    if (res.data?.success === true) {
      const images = new FormData();
      const id = res.data.data?.id;
      _images.map((ele) => {
        images.append("image[]", ele.file);
      });
      const res2 = await axiosClient.post(
        `/buyer/post/image/store/${id}`,
        images
      );

    }
  };

  const validate = () => {
    console.log("no");
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };
  return (
    <Page>
      <PageTitle text={"create job post"} />
      {step === 1 ? (
        <ReusableForm
          template={template}
          onSubmit={onSubmit}
          validate={validate}
          btnWidth={"w-[150px] self-end"}
          btnText={"next"}
          addedStyles={"md:w-[400px] lg:w-[100%]"}
        />
      ) : (
        <div className="my-4 max-w-[500px] mx-auto">
          <div className="flex flex-col gap-2">
            <h3>choose thumbnail *</h3>
            <CropeerImage
              type={1}
              isFirstButton={true}
              height={"250px"}
              setImages={setImages}
              setThumbnail={setThumbnail}
              thumbnail={thumbnail}
              selectedImage={selectedImage}
              noBackground={true}
              setSelectedImage={setSelectedImage}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3>add more images: </h3>
            <div className="flex flex-col  gap-4 flex-wrap">
              <div className="flex-[30%]">
                <CropeerImage
                  type={2}
                  isFirstButton={false}
                  setImages={setImages}
                  setThumbnail={setThumbnail}
                  thumbnail={thumbnail}
                  selectedImage={selectedImage}
                  noBackground={true}
                  setSelectedImage={setSelectedImage}
                />
              </div>
              <div className="flex-[58%] flex gap-4 flex-wrap justify-evenly">
                {_images.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      width: "200px",
                      height: "120px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      marginBottom: "1rem",
                      position: "relative",
                    }}
                  >
                    <p
                      style={{
                        position: "absolute",
                        top: "0rem",
                        left: "0rem",
                        color: "white",
                        padding: "0.2rem 0.4rem",
                        background: "rgba(0, 0, 0, 0.5)",
                        fontSize: "12px",
                        fontWeight: "600",
                        borderRadius: "12px 0px",
                        backgroundColor: "rgba(17, 17, 17, 0.47)",
                        width: "32px",
                        height: "24px",
                        textAlign: "center",
                      }}
                    >
                      {index + 1}
                    </p>

                    <img
                      key={index}
                      src={image.show}
                      alt={`Selected Image ${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <MdDelete
                      size={35}
                      style={{
                        position: "absolute",
                        top: "0rem",
                        right: "0rem",
                        color: "white",
                        cursor: "pointer",
                        // zIndex: 1,
                        padding: "4px",
                        borderRadius: "0px 0px 0px 12px",
                        background:
                          "radial-gradient(at left bottom, rgba(255, 0, 0, 0.67) 0%, rgba(255, 0, 0, 0.2) 75%)",
                      }}
                      onClick={() => handleDeleteImage(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="bg-orangeColor p-2 rounded-md"
              onClick={() => setStep(1)}
            >
              back
            </button>
            <button
              className="bg-greenColor p-2 rounded-md"
              onClick={handleFinish}
            >
              finish
            </button>
          </div>
        </div>
      )}
    </Page>
  );
};

export default AddJob;
