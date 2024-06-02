import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import axiosClient from "../../../../axios-client";
import { workStatusArray } from "../data/workStatus";
const postData = async (data) => {
  const res = await axiosClient.get(
    `/buyer/acceptedComment/changeWorkStatusMethod/${data.id}?workStatus=${data.workStatus}`
  );
  return res;
};
const ChangeStatus = ({ data, setIsModalOpen }) => {
  let template = {
    fields: [
      {
        title: "change work status",
        name: "status",
        value: Number(data.work_status),
        options: [...workStatusArray],
        optionText: "title",
        optionValue: "id",
        type: "select",
      },
    ],
  };
  const changeStatusMutation = useMutationHook(postData, ["acceptedOrders"]);
  const onSubmit = async (values) => {
    const toastId = toast.loading("submitting, submitting, please wait...");
    const workStatus = values.status;
    try {
      const res = await changeStatusMutation.mutateAsync({
        workStatus,
        id: data.id,
      });
      setIsModalOpen((prev) => !prev);
      toast.update(toastId, {
        type: "success",
        render: res.data.mes,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    } catch (error) {
      toast.update(toastId, {
        type: "error",
        render: error.response.data.message,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    }
  };

  const validate = () => {
    console.log("no");
  };

  return (
    <>
      <h2 className="font-bold">
        if you change to completed you want be able <br /> to change it again
        <span className="text-redColor"> so be sure</span>
      </h2>
      <ReusableForm
        template={template}
        onSubmit={onSubmit}
        validate={validate}
        btnWidth={" text-white"}
        btnText={"submit"}
        addedStyles={"md:w-[400px]"}
      />
    </>
  );
};

export default ChangeStatus;
