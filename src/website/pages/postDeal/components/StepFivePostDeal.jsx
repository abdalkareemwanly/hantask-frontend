import { useState } from "react";
import CropeerImage from "../../../../Components/CropeerImage";

const StepFivePostDeal = ({ handleDataChange, state }) => {
  const [selectedImage, setSelectedImage] = useState();
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold">ok finally lets finish our deal</h2>
      <p className="text-gray-500">
        lets type our deal title with it's description and thumbnail
      </p>
      <div className="flex justify-between gap-4 w-full items-start">
        <input
          onChange={(e) => handleDataChange("title", e.target.value)}
          value={state.title}
          type="text"
          className="bg-gray-200 rounded-md px-4 py-4 border-none outline-none flex-[40%]"
          placeholder="type deal title"
        />
        <textarea
          onChange={(e) => handleDataChange("description", e.target.value)}
          value={state.description}
          type="text"
          className="bg-gray-200 rounded-md px-4 py-4 border-none outline-none flex-[40%]"
          placeholder="type your budget"
        />
      </div>
      <CropeerImage
        height={"250px"}
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
  );
};

export default StepFivePostDeal;
