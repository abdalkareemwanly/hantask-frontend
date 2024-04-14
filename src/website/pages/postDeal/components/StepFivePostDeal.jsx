import { useState } from "react";
import CropeerImage from "../../../../Components/CropeerImage";
import { MdDelete } from "react-icons/md";

const StepFivePostDeal = ({
  handleDataChange,
  watch,
  setValue,
  goToPrevStep,
  _images,
  setImages,
  thumbnail,
  setThumbnail,
  errors,
  register,
}) => {
  const [selectedImage, setSelectedImage] = useState();

  const handleDeleteImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold">ok finally lets finish our deal</h2>

      <div className="flex flex-col gap-2">
        <p className="text-gray-500">deal thumbnail</p>
        <CropeerImage
          type={1}
          isFirstButton={true}
          height={"400px"}
          setImages={setImages}
          setThumbnail={setThumbnail}
          thumbnail={thumbnail}
          selectedImage={selectedImage}
          noBackground={true}
          setSelectedImage={setSelectedImage}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3>other photos: </h3>
        <span>
          <strong>you must add at least 4 photos</strong>
        </span>
        <div className=" flex gap-4 flex-wrap ">
          <CropeerImage
            type={2}
            isFirstButton={false}
            setImages={setImages}
            setThumbnail={setThumbnail}
            width={"200px"}
            height={"200px"}
            thumbnail={thumbnail}
            selectedImage={selectedImage}
            noBackground={true}
            setSelectedImage={setSelectedImage}
          />
          {_images.map((image, index) => (
            <div
              key={index}
              style={{
                width: "200px",
                height: "200px",
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
      <div className="flex gap-2">
        <div
          className="bg-orangeColor text-white  p-2 rounded-lg"
          onClick={goToPrevStep}
        >
          Previous
        </div>
        {console.log(!thumbnail && _images.length < 3)}
        {!thumbnail || _images.length < 3 ? (
          <button
            className={`bg-greenColor text-white  p-2 rounded-lg cursor-not-allowed`}
            disabled
          >
            submit
          </button>
        ) : (
          <button
            className={`bg-greenColor text-white  p-2 rounded-lg cursor-pointer`}
          >
            submit
          </button>
        )}
      </div>
    </div>
  );
};

export default StepFivePostDeal;
