import Button from "../../../../Components/Button";
import { FaCheck } from "react-icons/fa";

function StartAsSeller({ image, paragraph, list }) {
  try {
    return (
      <>
        <div className="bg-[var(--second-bg)] grid lg:grid-cols-2 grid-cols-1 py-[3rem] sm:px-[5%] px-[2%] ">
          <div className="px-[10px] lg:order-0 order-1">
            <h2 className="font-[700] md:text-[45px] sm:text-[38px] text-[28px] lg:mt-0 mt-[20px]">Start As Seller</h2>
            <p className="text-[var(--light-text)] my-[30px] ellipsis">{paragraph}</p>
            <ul className="flex flex-col">
              {list.map((item, index) => {
                return (
                  <li className={`relative text-[var(--dark-gray)] hover:text-[var(--main-color)] pl-[30px] pb-[20px] `}>
                    {item}
                    <span className="absolute bg-transparent w-[10px] h-[10px] flex justify-center items-center top-[7px] left-0 text-[var(--main-color)]">
                      <FaCheck />
                    </span>
                  </li>
                );
              })}
            </ul>
            <Button isLink={true} goto={"/register"} title={"Become Seller"} width={"max-content"} color={"bg-[var(--main-color)]"} />
          </div>
          <div className="flex justify-center px-[10px] lg:order-1 order-0">
            <div className="xl:w-[600px] xl:h-[500px] lg:w-[400px] lg:h-[360px] w-[100%] aspect-[6/5]">
              <img src={image} className="w-[100%] h-[100%] object-cover rounded-[10px]" />
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StartAsSeller;
