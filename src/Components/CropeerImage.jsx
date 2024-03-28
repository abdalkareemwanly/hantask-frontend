import { useRef, useState, useEffect } from "react";
import Cropper from "react-cropper";
import { IoMdCrop } from "react-icons/io";
import styles from "./cropperImage.module.css";
import "cropperjs/dist/cropper.css";
import { IoMdAdd } from "react-icons/io";
import ModalContainer from "./ModalContainer";

const CropeerImage = ({
  type,
  width,
  height,
  setImages,
  setThumbnail,
  thumbnail,
  selectedImage,
  setSelectedImage,
  noBackground,
  handleDataChange,
  state,
}) => {
  const [isImageSelected, setIsImageSelected] = useState();
  // Added hasBackground prop with default value
  const cropperRef = useRef(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const button = document.getElementById("cropper-button");
    if (button) {
      const hasImageBackground = button.style.backgroundImage !== "";
      button.style.color = hasImageBackground
        ? "var(--main-color)"
        : "rgb(118, 118, 118)";
    }
  }, [selectedImage]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (type === 1) {
      setSelectedImage(null);
    } else {
      setIsImageSelected(null);
    }
    setOpen(false);
  };

  const handleImageSelect = (e) => {
    handleOpen();
    const file = e.target.files[0];
    //thumbnail
    if (type === 1) {
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedImage(reader.result);
          handleOpen();
        };
        reader.readAsDataURL(file);
      }
    }

    //images array
    if (type === 2) {
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setIsImageSelected(reader.result);
          handleOpen();
        };
        reader.readAsDataURL(file);
      }
    }
    //post deal image
    if (type === 3) {
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedImage(reader.result);
          handleOpen();
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleCrop = async () => {
    if (cropperRef.current) {
      const counter = 0;
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      if (croppedCanvas) {
        const croppedImageUrl = croppedCanvas.toDataURL();
        const webpBlob = await new Promise((resolve) => {
          croppedCanvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            "image/webp",
            0.5
          ); // Adjust quality (0.0 to 1.0) as needed
        });

        const file = new File(
          [webpBlob],
          `image${counter}.webp`,
          {
            type: webpBlob.type,
          },
          0.3
        );

        if (type === 1) {
          setThumbnail({ show: croppedImageUrl, file: file });
        }
        if (type === 2) {
          setImages((prev) => [...prev, { show: croppedImageUrl, file: file }]);
          // setSelectedImages((prevImages) => [...prevImages, file]);
        }
        if (type === 3) {
          handleDataChange("image", { show: croppedImageUrl, file: file });
        }
      }
    }
    handleClose();
  };
  const inputRef = useRef(null);

  const handleChooseImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <div dir="ltr">
      <div
        id="cropper-button"
        style={{
          border: "1px dashed gray",
          borderRadius: "12px",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          width: width || "100%",
          height: height || "200px",
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1rem",
          backgroundImage:
            type === 1
              ? noBackground && thumbnail?.show
                ? `url(${thumbnail?.show})`
                : `url(${import.meta.env.VITE_WEBSITE_URL}${thumbnail})`
              : type === 2
              ? "none"
              : type === 3
              ? noBackground && state.image?.show
                ? `url(${state.image.show})`
                : `url(${import.meta.env.VITE_WEBSITE_URL}${thumbnail})`
              : "",
        }}
        onClick={handleChooseImage}
      >
        {noBackground && thumbnail ? (
          <>
            <div
              style={{
                padding: "2rem",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "var(--main-color)",
                maxWidth: "400px",
                margin: " 0 auto",
              }}
            >
              <IoMdAdd
                style={{
                  width: "1.5em",
                  height: "1.5em",
                  marginRight: "0.5rem",
                }}
              />
              <p> click to choose </p>
            </div>
          </>
        ) : (
          <div
            style={{
              borderRadius: "12px",
              padding: "1rem",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backgroundColor: "transparent",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IoMdAdd />
            <p
              style={{
                color: "rgb(118, 118, 118)",
              }}
            >
              click to choose
            </p>
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleImageSelect}
      />
      {open && (
        <ModalContainer
          setIsModalOpen={handleClose}
          type={2}
          component={
            <div style={{}}>
              <>
                <Cropper
                  src={selectedImage || isImageSelected}
                  style={{
                    height: "350px",
                    width: "350px",
                    borderRadius: "16px",
                  }}
                  initialAspectRatio={1}
                  ref={cropperRef}
                  viewMode={1}
                  dragMode="move"
                  className={`${styles.custom_cropper} custom_cropper`}
                />
                <div
                  style={{
                    // backgroundColor: "var(--green-color)",
                    color: "white",
                    marginTop: "1rem",
                    padding: "0.5rem 1rem",
                  }}
                  className="flex bg-greenColor rounded-md  gap-2 justify-center items-center mx-auto"
                  onClick={handleCrop}
                >
                  <span>crop</span>
                  <IoMdCrop size={30} />
                </div>
              </>
            </div>
          }
        />
      )}
    </div>
  );
};

export default CropeerImage;
