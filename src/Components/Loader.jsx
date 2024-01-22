import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 z-[1000] opacity-70 flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="z-[10000]">
        <CircularProgress color="success" size={50} />
      </div>
    </div>
  );
};

export default Loader;
