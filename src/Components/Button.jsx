import { Link } from "react-router-dom";
const Button = ({ isLink, goto, Icon, title, width, color, onClickFun }) => {
  return isLink ? (
    <Link
      to={goto}
      className={`flex justify-between gap-1 ${
        width && `w-[${width}]`
      } items-center cursor-pointer px-3 py-2 ${color} rounded-[4px] text-white`}
    >
      <span>{title}</span> {Icon && <span>{Icon}</span>}
    </Link>
  ) : (
    <div
      onClick={onClickFun}
      className={`flex justify-between gap-1 ${
        width && `w-[${width}]`
      } items-center cursor-pointer px-3 py-2 ${color} rounded-[4px] text-white`}
    >
      <span>{title}</span> {Icon && <span>{Icon}</span>}
    </div>
  );
};

export default Button;

//? usage like that
{
  /* <Button
  isLink={true}
  goto={`../Chat Users/${row.id}`}
  Icon={<AiFillEye size={20} />}
  color={"red"}
  // width={"100%"}
  title={"hello"}
  onClickFun={() => console.log(row)}
/>; */
}
