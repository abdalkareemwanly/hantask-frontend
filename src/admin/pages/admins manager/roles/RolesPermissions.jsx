import { useParams } from "react-router-dom";
import PageTitle from "../../../../Components/PageTitle";
import { Page } from "../../../../Components/StyledComponents";
import ReusableForm from "../../../../Components/ReusableForm";
import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import { toast } from "react-toastify";

export const RolesPermissions = () => {
  const id = useParams().id;
  const [permissions, setPermissions] = useState([]);
  const getPermissions = async () => {
    const res = await axiosClient.get(`/admin/role/show/${id}`);
    setPermissions(res.data.data);
  };
  useEffect(() => {
    getPermissions();
  }, []);

  let fields = permissions.map((ele) => {
    let eleValue = ele?.value === 1 ? true : false;
    return {
      type: "checkbox",
      name: ele?.permissionName,
      title: ele?.permissionName,
      value: eleValue,
      checkboxStyle: true,
      styles: "lg:w-[24%] md:w-[32%] w-[49%]",
    };
  });

  let template = {
    fields: fields,
  };

  const onSubmit = async (values) => {
    const toastId = toast.loading("running...");

    const ids = [];
    Object.entries(values).map((ele) => {
      const id = permissions.find((item) => item.permissionName === ele[0]).id;
      const value = ele[1] === true ? true : false;
      const obj = {
        id,
        value,
      };
      ids.push(obj);
    });
    const formData = new FormData();
    formData.append("permission[]", JSON.stringify(ids));
    const res = await axiosClient.post(
      `/admin/role/permission/${id}`,
      formData
    );
    if (res.data.success === true) {
      toast.update(toastId, {
        render: res.data.mes,
        type: "success",
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
        closeOnClick: true,
      });
    } else {
      toast.update(toastId, {
        render: "Oops! something bad happened",
        type: "error",
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
        closeOnClick: true,
      });
    }
  };

  return (
    <Page>
      <PageTitle text={"manage all permissions"} />
      {permissions.length > 0 && (
        <ReusableForm
          template={template}
          onSubmit={onSubmit}
          addedStyles={"w-[100%] mt-4"}
          btnWidth={"w-[150px]"}
          btnText={"submit"}
        />
      )}
    </Page>
  );
};

export default RolesPermissions;
