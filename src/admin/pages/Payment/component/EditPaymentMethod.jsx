import React from "react";
import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";

export const EditPaymentMethod = ({ data, getPaymentMethod, setIsAddModalOpen }) => {
  const handleSubmit = async (values) => {
    try {
      const id = toast.loading("Please wait...");

      const paymentMethodData = {
        client_id: values.ClientId,
        client_secret: values.ClientSecret,
        currency: values.currency,
        locale: values.locale,
      };

      const { data: responseData } = await axiosClient.post(`/admin/paymentMethod/update/${data?.id}`, paymentMethodData);

      if (responseData.success) {
        toast.success("Payment method updated successfully");
        getPaymentMethod();
        setIsAddModalOpen((prev) => !prev);
      } else {
        toast.error(responseData.mes);
      }
    } catch (error) {
      console.error("Error updating payment method:", error);
      toast.error("Failed to update payment method");
    }
  };

  const validate = (watchValues) => {
    console.log(watchValues);
  };

  const formTemplate = {
    title: "",
    fields: [
      {
        title: "Client ID",
        name: "ClientId",
        type: "text",
        value: data?.client_id,
        styles:  "md:w-[45%]",
      },
      {
        title: "Client Secret",
        name: "ClientSecret",
        type: "text",
        value: data?.client_secret,
        styles: "md:w-[45%]" ,
      },
      {
        title: "Currency",
        name: "currency",
        type: "text",
        value: data?.currency,
        styles: "md:w-[45%]",
      },
      {
        title: "Locale",
        name: "locale",
        type: "text",
        value: data?.locale,
        styles: "md:w-[45%]",
      }
    ],
  };

  return (
    <ReusableForm
      template={formTemplate}
      onSubmit={handleSubmit}
      validate={validate}
      btnWidth="w-full text-white"
      btnText="Update"
      addedStyles="md:w-[800px]"
    />
  );
};
