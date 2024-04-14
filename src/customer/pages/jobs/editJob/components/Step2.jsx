import { MdDelete } from "react-icons/md";
import CropeerImage from "../../../../../Components/CropeerImage";

const Step2 = ({
  setImages,
  setThumbnail,
  thumbnail,
  selectedImage,
  setSelectedImage,
  _images,
  readyImages,
  handleDeleteImage,
  confirmHandleDeleteImages,
  handleFinish,
  setStep,
}) => {
  return (
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
          {readyImages?.length > 0 && (
            <div>
              <h3>added images:</h3>
              <div className="flex-[58%] flex gap-4 flex-wrap justify-evenly">
                {readyImages?.map((image, index) => (
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
                      src={`${import.meta.env.VITE_WEBSITE_URL + image.image}`}
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
                      onClick={() => confirmHandleDeleteImages(image.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2 items-center w-full">
        <button
          className="bg-orangeColor p-2 rounded-md self-start"
          onClick={() => setStep(1)}
        >
          back
        </button>
        {_images?.concat(readyImages)?.length >= 4 ? (
          <button
            className="bg-greenColor p-2 rounded-md self-end"
            onClick={handleFinish}
          >
            finish
          </button>
        ) : (
          <button
            className="bg-greenColor bg-opacity-75 p-2 rounded-md self-end cursor-not-allowed"
            onClick={handleFinish}
            disabled
          >
            finish
          </button>
        )}
      </div>
    </div>
  );
};

export default Step2;
