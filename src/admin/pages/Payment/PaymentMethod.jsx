import React, { useEffect, useState } from "react";
import { BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";
import Button from "../../../Components/Button";
import axiosClient from "../../../axios-client";
import { AddPaymentMethod } from "./component/AddPaymentMethod";
import ModalContainer from "../../../Components/ModalContainer";
import { EditPaymentMethod } from "./component/EditPaymentMethod";
import { useStateContext } from "../../../contexts/ContextsProvider";
import { Page } from "../../../Components/StyledComponents";
import PageTitle from "../../../Components/PageTitle";
import useCheckPermission from "../../../hooks/checkPermissions";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function PaymentMethod() {
  const { hasPermissionFun } = useCheckPermission();
  let hasAddPermission = hasPermissionFun("addPaymentmethod");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [openedPaymentMethodIndex, setOpenedPaymentMethodIndex] =
    useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const { translation } = useStateContext();
  const [languagedirection, setlanguagedirection] = useState("LTR");

  const handleInformationContainer = (index) => {
    openedPaymentMethodIndex === index
      ? setOpenedPaymentMethodIndex(null)
      : setOpenedPaymentMethodIndex(index);
  };

  useEffect(() => {
    getPaymentMethods();
    getLanguage();
  }, []);

  const getLanguage = () => {
    axiosClient.get("/languages/active").then((response) => {
      setlanguagedirection(response.data.data.direction);
    });
  };

  const getPaymentMethods = async () => {
    try {
      const response = await axiosClient.get("/admin/paymentMethod");
      setPaymentMethods(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      theme: "dark",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFun(id);
      }
    });
  };

  const deleteFun = async (id) => {
    const toastId = toast.loading("deleting..");
    try {
      // const user = await deleteMutation.mutateAsync(id);
      const res = await axiosClient.get(`/admin/paymentMethod/delete/${id}`);
      if (res.data.success) {
        getPaymentMethods();
        toast.update(toastId, {
          type: "success",
          render: res.data.mes,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
      } else {
        toast.update(toastId, {
          type: "error",
          render: res.data.mes,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
      }
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

  return (
    <div className="w-full">
      <Page>
        <PageTitle
          text={"manage all payment method"}
          right={
            hasAddPermission && (
              <div className="flex gap-4">
                <Button
                  isLink={false}
                  color={"bg-greenColor"}
                  title={"AddPayment"}
                  onClickFun={() => setIsAddModalOpen(true)}
                />
              </div>
            )
          }
        />
        {isAddModalOpen && (
          <ModalContainer
            isModalOpen={isAddModalOpen}
            setIsModalOpen={setIsAddModalOpen}
            component={
              <AddPaymentMethod
                getPaymentMethods={getPaymentMethods}
                setIsAddModalOpen={setIsAddModalOpen}
              />
            }
          />
        )}
        <div className="flex flex-col w-full m-auto gap-2 mt-6">
          {paymentMethods.map((paymentMethod, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center gap-3 bg-blocks-color my-3 py-4 px-4"
            >
              <div
                onClick={() => handleInformationContainer(index)}
                className="flex flex-row justify-between cursor-pointer items-center w-full"
              >
                <div className="flex items-center gap-4">
                  <h2 className="text-lg">{paymentMethod.name}</h2>
                </div>
                <button className="flex items-center px-1">
                  {openedPaymentMethodIndex === index ? (
                    <BiSolidChevronUp />
                  ) : (
                    <BiSolidChevronDown />
                  )}
                </button>
              </div>
              {openedPaymentMethodIndex === index && (
                <div className="flex  flex-col gap-4  w-full px-1">
                  <EditPaymentMethod
                    data={paymentMethod}
                    getPaymentMethods={getPaymentMethods}
                    setIsAddModalOpen={setIsAddModalOpen}
                  />
                  <button
                    className="bg-redColor w-fit py-2 px-4 rounded-md capitalize"
                    onClick={() => handleDelete(paymentMethod.id)}
                  >
                    delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </Page>
    </div>
  );
}
