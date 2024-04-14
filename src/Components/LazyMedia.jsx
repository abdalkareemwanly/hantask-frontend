import { useState, useEffect, useRef } from "react";

const LazyMedia = ({ src, classes, width, height, style }) => {
  const mediaRef = useRef(null);
  const [loaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], self) => {
        // isIntersecting is a property exposed by the interface
        if (entry.isIntersecting) {
          // custom function that copies the path to the img
          // from data-src to src
          loadImages(entry.target);
          // the image is now in place, stop watching
          self.unobserve(entry.target);
        }
      },
      { threshold: 0.2 } // Adjust threshold as needed
    );

    if (mediaRef.current) {
      observer.observe(mediaRef.current);
    }

    return () => {
      if (mediaRef.current) {
        observer.unobserve(mediaRef.current);
      }
    };
  }, []);

  const loadImages = (media) => {
    media.src = media.dataset.src;
  };

  return (
    <img
      ref={mediaRef}
      src={""}
      data-src={src}
      width={width}
      height={height}
      className={`${classes} ${loaded ? "loadedMedia" : "loadingMedia"}`}
      onLoad={() => setIsLoaded(true)}
      style={style}
    />
  );
};

export default LazyMedia;
