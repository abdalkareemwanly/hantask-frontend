import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import axiosClient from "../../../../axios-client";
const postData = async (data) => {
  const res = await axiosClient.post(
    `/admin/verifySeller/changeStatusMethod/${data.id}`,
    { status: data.workStatus }
  );
  return res;
};
const workStatusArray = [
  {
    id: 1,
    title: "not verified",
  },
  {
    id: 2,
    title: "verified",
  },
];

const ChangeStatus = ({ data, setIsModalOpen }) => {
  let template = {
    fields: [
      {
        title: "change work status",
        name: "status",
        value: Number(data.status),
        options: [...workStatusArray],
        optionText: "title",
        optionValue: "id",
        type: "select",
      },
    ],
  };

  const changeStatusMutation = useMutationHook(postData, [
    "serviceProviderVerify",
  ]);

  const onSubmit = async (values) => {
    const toastId = toast.loading("loading...");
    const workStatus = values.status;
    try {
      const user = await changeStatusMutation.mutateAsync({
        workStatus,
        id: data.id,
      });
      setIsModalOpen((prev) => !prev);
      toast.update(toastId, {
        type: "success",
        render: user.data.mes,
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
