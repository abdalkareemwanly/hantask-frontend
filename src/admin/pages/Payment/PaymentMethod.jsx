import React, { useEffect, useState } from "react";
import { BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";
import Button from "../../../Components/Button";
import axiosClient from "../../../axios-client";
import { AddPaymentMethod } from "./component/AddPaymentMethod";
import ModalContainer from "../../../Components/ModalContainer";
import { EditPaymentMethod } from "./component/EditPaymentMethod";
import { useStateContext } from "../../../contexts/ContextsProvider";

export default function PaymentMethod() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [openedPaymentMethodIndex, setOpenedPaymentMethodIndex] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const { translation } = useStateContext();
  const [languagedirection, setlanguagedirection] = useState("LTR");

  const handleInformationContainer = (index) => {
    openedPaymentMethodIndex === index ? setOpenedPaymentMethodIndex(null) : setOpenedPaymentMethodIndex(index);
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

  return (
    <div className="w-full">
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
      <div className="flex justify-between gap-3 bg-blocks-color my-3 p-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg">
            {(translation && translation["Payment"]) || "Payment"} /{" "}
            {(translation && translation["Payment Method"]) || "Payment Method"}
          </h2>
        </div>
        <Button
          isLink={false}
          color={"bg-blueColor"}
          title={"Add"}
          onClickFun={() => setIsAddModalOpen(true)}
        />
      </div>
      {paymentMethods.map((paymentMethod, index) => (
        <div key={index} className="flex flex-col justify-between items-center gap-3 bg-blocks-color my-3 py-2 px-4">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex items-center gap-4">
              <h2 className="text-lg">{paymentMethod.name}</h2>
            </div>
            <button
              className="flex items-center px-1"
              onClick={() => handleInformationContainer(index)}
            >
              {openedPaymentMethodIndex === index ? (
                <BiSolidChevronUp />
              ) : (
                <BiSolidChevronDown />
              )}
            </button>
          </div>
          {openedPaymentMethodIndex === index && (
            <div className="flex flex-row justify-between items-center w-full px-1">
              <EditPaymentMethod
                data={paymentMethod}
                getPaymentMethods={getPaymentMethods}
                setIsAddModalOpen={setIsAddModalOpen}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
