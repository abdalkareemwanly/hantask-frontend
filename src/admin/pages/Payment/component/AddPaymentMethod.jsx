// import React from "react";
// import { toast } from "react-toastify";
// import ReusableForm from "../../../../Components/ReusableForm";
// import axiosClient from "../../../../axios-client";

// export const AddPaymentMethod = ({ getPaymentMethod, setIsAddModalOpen }) => {

//   let template = {
//     title: "Add New Payment Method",
//     fields: [
//       {
//         title: "name",
//         name: "name",
//         type: "text",
//         styles: "md:w-[45%]",
//       },
//       {
//         title: "clientId",
//         name: "clientId",
//         type: "text",
//         styles: "md:w-[45%]",
//       },
//       {
//         title: "secret",
//         name: "secret",
//         type: "text",
//         styles: "md:w-[45%]",
//       },
//       {
//         title: "MonSub",
//         name: "MonSub",
//         type: "text",
//         styles: "md:w-[45%]",
//       },
//     ],
//   };

//   const onSubmit = async (values) => {
//     const id = toast.loading("please wait...");
//     const PaymentMethod = {
//       ...values,
//     };
//     axiosClient.post("/paymentMethod", PaymentMethod).then((data) => {
//       console.log(data);
//       if (data.data.success == false) {
//         toast.update(id, {
//           type: "error",
//           render: data.data.mes,
//           closeOnClick: true,
//           isLoading: false,
//           autoClose: true,
//           closeButton: true,
//           pauseOnHover: false,
//         });
//       } else {
//         getPaymentMethod();
//         setIsAddModalOpen((prev) => !prev);
//         toast.update(id, {
//           type: "success",
//           render: data.data.mes,
//           closeOnClick: true,
//           isLoading: false,
//           autoClose: true,
//           closeButton: true,
//           pauseOnHover: false,
//         });
//       }
//     });
//   };

//   const validate = (watchValues) => {
//     console.log(watchValues);
//   };

//   return (
//     <>
//       <ReusableForm
//         template={template}
//         watchFields={["username", "fullname"]}
//         onSubmit={onSubmit}
//         validate={validate}
//         btnWidth={"w-full text-white"}
//         btnText={"add"}
//         addedStyles={"md:w-[800px]"}
//       />
//     </>
//   );
// };

import React from "react";
import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";

export const AddPaymentMethod = ({ getPaymentMethod, setIsAddModalOpen }) => {
  const handleSubmit = async (values) => {
    try {
      const id = toast.loading("Please wait...");

      const paymentMethodData = {
        name: values.name,
        mode: values.mode,
        sandbox_client_id: values.sandboxClientId,
        sandbox_client_secret: values.sandboxClientSecret,
        // live_client_id: values.liveClientId,
        // live_client_secret: values.liveClientSecret,
        // live_app_id: values.liveAppId,
        payment_action: values.paymentAction,
        currency: values.currency,
        notify_url: values.notifyUrl,
        locale: values.locale,
        validate_ssl: values.validateSSL
      };

      const { data } = await axiosClient.post("/paymentMethod", paymentMethodData);

      if (data.success) {
        toast.success(data.mes);
        getPaymentMethod();
        setIsAddModalOpen((prev) => !prev);
      } else {
        toast.error(data.mes);
      }
    } catch (error) {
      console.error("Error adding payment method:", error);
      toast.error("Failed to add payment method");
    }
  };

  const validate = (watchValues) => {
    console.log(watchValues);
  };

  const formTemplate = {
    title: "Add New Payment Method",
    fields: [
      {
        title: "Name",
        name: "name",
        type: "select",
        options: [{ name: "Paypal" }, { name: "Strip" }, { name: 'en_US'}],
        optionValue: "name",
        optionText: "name",
        styles: "md:w-[45%]",
      },
      {
        title: "Client ID",
        name: "ClientId",
        type: "text",
        styles: "md:w-[45%]",
      },
      {
        title: "Client Secret",
        name: "ClientSecret",
        type: "text",
        styles: "md:w-[45%]",
      },
      {
        title: "Currency",
        name: "currency",
        type: "select",
        options: [{ name: 'USD'}],
        optionValue: "name",
        optionText: "name",
        styles: "md:w-[45%]",
      },
      {
        title: "Locale",
        name: "locale",
        type: "select",
        options: [{ name: 'en_US'}],
        optionValue: "name",
        optionText: "name",
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
      btnText="Add"
      addedStyles="md:w-[800px]"
    />
  );
};
