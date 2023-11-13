const PageTitle = ({ text, right }) => {
  return (
    <div className="flex justify-between w-full flex-wrap md:flex-row flex-col">
      <h3 className="font-bold text-3xl">{text}</h3>
      <div>{right}</div>
    </div>
  );
};

export default PageTitle;
