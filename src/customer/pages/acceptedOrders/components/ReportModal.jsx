import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import axiosClient from "../../../../axios-client";
import { useQueryClient } from "@tanstack/react-query";

const postData = async ({ data }) => {
  const res = await axiosClient.post(`/buyer/report/store`, data);
  return res;
};
const ReportModal = ({ order, setIsModalOpen }) => {
  const queryClient = useQueryClient();
  console.log(order);
  let template = {
    title: "report to admin",
    fields: [
      {
        title: "report description",
        name: "report",
        type: "textArea",
      },
    ],
  };
  const changeStatusMutation = useMutationHook(postData, ["acceptedOrders"]);

  const onSubmit = async (values) => {
    const toastId = toast.loading("loading...");
    const data = {
      report: values.report,
      comment_id: order.id,
      recipient_id: order.seller_id,
    };
    try {
      const user = await changeStatusMutation.mutateAsync({ data });
      setIsModalOpen((prev) => !prev);
      queryClient.invalidateQueries("reports");
      toast.update(toastId, {
        type: "success",
        render: user.mes,
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

export default ReportModal;
