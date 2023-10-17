import Addlanguage from "./components/Addlanguage";

export default function Languages() {
  return (
    <div className="flex flex-col my-[320px] lg:my-[50px] lg:flex-row gap-5 px-3 items-center justify-center h-full">
      <div className="flex flex-col lg:w-3/5 px-4 py-3 border shadow-lg bg-white">
        <Addlanguage />
      </div>
      <div className="flex flex-col lg:w-2/5 px-4 py-3 border shadow-lg bg-white ">
        <Addlanguage />
      </div>
    </div>
  );
}
