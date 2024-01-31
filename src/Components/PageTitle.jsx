const PageTitle = ({ text, right }) => {
  return (
    <div className="flex justify-between w-full flex-wrap md:flex-row flex-col gap-4">
      <h3 className="font-bold text-3xl ">{text}</h3>
      <div className="w-fit ">{right}</div>
    </div>
  );
};

export default PageTitle;
