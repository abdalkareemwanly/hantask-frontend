function StatisticsCard({ iconColor, title, value, icon }) {
  try {
    return (
      <>
        <div className="flex justify-between bg-blocks-color p-[20px] rounded-[10px]">
          <div className="flex flex-col justify-center items-start">
            <span className="text-[16px] leading-[24px] font-[500] text-light-text">{title}</span>
            <span className="text-[32px] leading-[1.2] font-[600] text-primary-text">{value}</span>
          </div>
          <div className="flex justify-center items-center">
            <div className={`w-[60px] h-[60px] rounded-full flex justify-center items-center bg-${iconColor} text-${iconColor} text-[24px]`} style={{ "--tw-bg-opacity": ".15" }}>
              {icon}
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StatisticsCard;
