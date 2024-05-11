import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useEffect, useState } from "react";

export const AddPlan = ({ getUsers, setIsAddModalOpen }) => {
  const [image, setImage] = useState();
  const [AllProduct, setProduct] = useState();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    await axiosClient.get("admin/paypal/products/all").then((res) => {
      setProduct(res.data.data);
    });
  };

  let template = {
    title: "Add New Plan",
    fields: [
      {
        title: "Plan Name",
        name: "name",
        type: "text",
        styles: "md:w-[45%]",
      },
      {
        title: "Product Name",
        name: "product_id",
        type: "select",
        options: AllProduct?.map((product) => ({
          value: product.id,
          name: product.name,
        })),
        styles: "md:w-[45%]",
        optionValue: "value",
        optionText: "name",
      },
      {
        title: "Description",
        name: "description",
        type: "textArea",
        styles: "md:w-[45%]",
      },
      {
        title: "Status",
        name: "status",
        type: "select",
        options: [
          { name: "CREATED" },
          { name: "INACTIVE" },
          { name: "ACTIVE" },
        ],
        styles: "md:w-[45%]",
        optionValue: "name",
        optionText: "name",
      },
      {
        title: "Billing Cycles Type",
        name: "billing_cycles_type",
        type: "select",
        options: [{ name: "REGULAR" }, { name: "TRIAL" }],
        styles: "md:w-full",
        optionValue: "name",
        optionText: "name",
      },
      {
        title: "Billing Cycles total cycles",
        name: "total_cycles",
        type: "number",
        styles: "md:w-full",
      },
      {
        title: "interval count",
        name: "interval_count",
        type: "text",
        styles: "md:w-[45%]",
      },
      {
        title: "interval unit",
        name: "interval_unit",
        type: "select",
        options: [
          { name: "DAY" },
          { name: "WEEK" },
          { name: "MONTH" },
          { name: "YEAR" },
        ],
        styles: "md:w-[45%]",
        optionValue: "name",
        optionText: "name",
      },
      {
        title: "setup fee failure action",
        name: "setup_fee_failure_action",
        type: "select",
        options: [{ name: "CONTINUE" }, { name: "CANCEL" }],
        styles: "md:w-full",
        optionValue: "name",
        optionText: "name",
      },
      {
        title: "Value",
        name: "value",
        type: "text",
        styles: "md:w-[45%]",
      },
      {
        title: "currency code",
        name: "currency_code",
        type: "select",
        options: [{ name: "USD" }, { name: "EUR" }, { name: "CAD" }],
        optionValue: "name",
        optionText: "name",
        styles: "md:w-[45%]",
      },
      {
        title: "Taxes",
        name: "taxes",
        type: "text",
        styles: "md:w-[45%]",
      },
    ],
  };

  const onSubmit = async (values) => {
    const id = toast.loading("please wait...");

    const productData = {
      product_id: values.product_id[0].value,
      name: values.name,
      description: values.description,
      status: values.status[0].name,
      billing_cycles: [
        {
          tenure_type: values.billing_cycles_type[0].name,
          sequence: 1,
          total_cycles: parseInt(values.total_cycles),
          frequency: {
            interval_unit: values.interval_unit[0].name,
            interval_count: parseInt(values.interval_count),
          },
          pricing_scheme: {
            fixed_price: {
              value: values.value,
              currency_code: values.currency_code[0].name.toUpperCase(),
            },
          },
        },
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee: {
          currency_code: values.currency_code[0].name.toUpperCase(),
          value: values.value,
        },
        setup_fee_failure_action: values.setup_fee_failure_action[0].name,
        payment_failure_threshold: 0,
      },
      taxes: {
        inclusive: false,
        percentage: parseFloat(values.taxes),
      },
    };

    axiosClient.post("/admin/paypal/Plans/create", productData).then((data) => {
      if (data.data.success == false) {
        toast.update(id, {
          type: "error",
          render: data.data.message,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
      } else {
        // getUsers();
        // setIsAddModalOpen((prev) => !prev);
        toast.update(id, {
          type: "success",
          render: data.data.mes,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
      }
    });
  };

  const validate = (watchValues) => {
    console.log(watchValues);
  };

  return (
    <ReusableForm
      template={template}
      watchFields={[
        "product_id",
        "name",
        "description",
        "status",
        "billing_cycles",
        "payment_preferences",
        "taxes",
      ]}
      onSubmit={onSubmit}
      validate={validate}
      btnWidth={"w-full text-white"}
      btnText={"add"}
      addedStyles={"md:w-[800px]"}
      image={image}
      setImage={setImage}
    />
  );
};
