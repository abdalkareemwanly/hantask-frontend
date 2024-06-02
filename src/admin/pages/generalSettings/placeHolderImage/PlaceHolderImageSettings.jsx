import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useEffect, useState } from "react";
import { useQueryHook } from "../../../../hooks/useQueryHook";
import { Page } from "../../../../Components/StyledComponents";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "../../../../Components/Loader";
const getData = async () => {
  const res = await axiosClient.get("/admin/webSetting");
  return res.data?.data;
};
const PlaceHolderImageSettings = () => {
  const { data, isLoading, isRefetching, isError } = useQueryHook(
    "placeHolderImage",
    getData
  );
  const query = useQueryClient();
  const [image, setImage] = useState();
  console.log(image);
  useEffect(() => {
    if (data) {
      setImage(data[0].image);
    }
  }, [data]);

  let template = {
    title: "edit place holder image",
    fields: [
      {
        name: "image",
        type: "file",

        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "w-[100%] items-center justify-center",
        fileFor: "image",
        imgStyle: "w-[350px] h-[350px] rounded-none",
      },
    ],
  };

  const onSubmit = async (values) => {
    const id = toast.loading("submitting, please wait...");
    const formData = new FormData();
    if (typeof values?.image !== "string") {
      formData.append("image", image);
    }
    axiosClient
      .post(`/admin/webSetting/update/${data[0]?.id}`, formData)
      .then((res) => {
        console.log(res);
        if (res.data.success == true) {
          query.invalidateQueries("placeHolderImage");
          toast.update(id, {
            type: "success",
            render: res.data.mes,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        } else {
          toast.update(id, {
            type: "error",
            render: res.data.mes,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        }
      })
      .catch((err) => {
        toast.update(id, {
          type: "error",
          render: err.response.data.message,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
      });
  };

  const validate = () => {};
  if (isLoading || isRefetching) return <Loader />;
  return (
    <Page>
      <ReusableForm
        template={template}
        onSubmit={onSubmit}
        validate={validate}
        btnWidth={"w-[150px]"}
        btnText={"edit"}
        addedStyles={"md:w-[400px] lg:w-[800px]"}
        image={image}
        setImage={setImage}
      />
    </Page>
  );
};

export default PlaceHolderImageSettings;
