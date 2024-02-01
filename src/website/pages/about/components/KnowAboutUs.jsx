function KnowAboutUs({ image, paragraph, list, experienceYear }) {
  try {
    return (
      <>
        <div className="grid lg:grid-cols-2 grid-cols-1 py-[3rem] sm:px-[5%] px-[2%] ">
          <div className="flex justify-center px-[10px]">
            <div className="xl:w-[600px] xl:h-[500px] lg:w-[400px] lg:h-[360px] w-[100%] aspect-[6/5] relative">
              <img src={image} className="w-[100%] h-[100%] object-cover rounded-[10px]" />
              <div className="absolute p-[30px] flex flex-col items-center right-[30px] bottom-[-40px] bg-[var(--main-color)] rounded-[10px] text-white border border-[5px] border-white">
                <span className="md:text-[35px] sm:text-[28px] text-[24px] font-[700] w-[max-content]">{experienceYear} Years</span>
                <span className="md:text-[24px] sm:text-[18px] text-[15px]">Experience</span>
              </div>
              <div className="absolute w-[40%] aspect-[1/1] bg-transparent border sm:border-[25px] border-[10px] border-blueColor rounded-full top-[-10%] left-[-14%] z-[-1] opacity-[.15]"></div>
            </div>
          </div>
          <div className="px-[10px] lg:mt-0 mt-[40px]">
            <h2 className="font-[700] md:text-[45px] sm:text-[38px] text-[28px] ">Know About Us</h2>
            <p className="text-[var(--light-text)] my-[30px] ellipsis">{paragraph}</p>
            <ul className="flex flex-col">
              {list.map((item, index) => {
                return <li className="relative text-[var(--dark-gray)] hover:text-[var(--main-color)] pl-[30px] pb-[20px] after:absolute after:bg-[var(--main-color)] after:rounded-full after:w-[10px] after:h-[10px] after:top-[7px] after:left-0 ">{item}</li>;
              })}
            </ul>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default KnowAboutUs;
