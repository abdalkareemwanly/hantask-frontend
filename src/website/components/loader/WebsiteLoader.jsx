import { ThreeDots } from "react-loader-spinner";

const WebsiteLoader = () => {
  return (
    <div className="fixed inset-0 w-[100vw] h-[100vh] flex items-center justify-center z-[10000]">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default WebsiteLoader;
