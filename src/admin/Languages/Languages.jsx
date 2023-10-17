import Addlanguage from "./components/Addlanguage";

export default function Languages() {
  return (
    <div className="flex flex-row gap-5 px-3 items-center justify-center h-full">
      <div className="flex flex-col w-3/5 px-4 py-3 border shadow-lg">
        <Addlanguage />
      </div>
      <div className="flex flex-col w-2/5 px-4 py-3 border shadow-lg items-start">
        <Addlanguage />
      </div>
    </div>
  );
}
