import { useState } from "react";
import CropeerImage from "../../../../Components/CropeerImage";

const StepFivePostDeal = ({
  handleDataChange,
  state,
  watch,
  setValue,
  goToNextStep,
  goToPrevStep,
}) => {
  const [selectedImage, setSelectedImage] = useState();
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold">ok finally lets finish our deal</h2>
      <p className="text-gray-500">
        lets type our deal title with it's description and thumbnail
      </p>
      <div className="flex justify-between gap-4 w-full items-start">
        <input
          name="title"
          onChange={(e) => setValue("title", e.target.value)}
          value={watch("title")}
          type="text"
          className="input-box w-full"
        />
        <textarea
          name="description"
          onChange={(e) => setValue("description", e.target.value)}
          value={watch("description")}
          type="text"
          className="input-box w-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-gray-500">deal thumbnail</p>
        <CropeerImage
          height={"200px"}
          width={"400px"}
          thumbnail={state.image}
          type={3}
          handleDataChange={handleDataChange}
          noBackground={true}
          state={state}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          isFirstButton={false}
        />
      </div>
      <div className="flex gap-2">
        <button
          className="bg-orangeColor text-white  p-2 rounded-lg"
          onClick={goToPrevStep}
        >
          Previous
        </button>
        <button
          className="bg-greenColor text-white  p-2 rounded-lg"
          onClick={goToNextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepFivePostDeal;
