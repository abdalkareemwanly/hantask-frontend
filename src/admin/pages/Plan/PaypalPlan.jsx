import React, { useEffect, useState } from "react";
import { useStateContext } from "../../../contexts/ContextsProvider";
import { FaSearch, FaFilter } from "react-icons/fa";
import axiosClient from "../../../axios-client";
import Button from "../../../Components/Button";
import { AddPlan } from "./component/AddPlan";
import ProductTable from "./component/ProductTable";
import { Page } from "../../../Components/StyledComponents";
import PageTitle from "../../../Components/PageTitle";
import useCheckPermission from "../../../hooks/checkPermissions";
import ModalContainer from "../../../Components/ModalContainer";
import { AddProduct } from "./component/AddProduct";
import PlanTable from "./component/PlanTable";

const CreatePlan = () => {
  const { hasPermissionFun } = useCheckPermission();
  let hasAddPermission = hasPermissionFun("addUser");

  const [languagedirection, setlanguagedirection] = useState("LTR");
  const { translation } = useStateContext();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [category, setCategory] = useState();

  useEffect(() => {
    getLanguage();
    getProductCategory();
  }, []);

  const getProductCategory = () => {
    fetch("/src/admin/Json/ProductCategory.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCategory(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getLanguage = () => {
    axiosClient.get("/languages/active").then((response) => {
      setlanguagedirection(response.data.data.direction);
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full">
      {isAddModalOpen && (
        <ModalContainer
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
          component={
            <AddProduct
              category={category}
              setIsAddModalOpen={setIsAddModalOpen}
            />
          }
        />
      )}
      {isModalOpen && (
        <ModalContainer
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          component={
            <AddPlan category={category} setIsModalOpen={setIsModalOpen} />
          }
        />
      )}
      <Page>
        <PageTitle
          text={"manage all Subscriptions"}
          right={
            hasAddPermission && (
              <div className="flex gap-4">
                <Button
                  isLink={false}
                  color={"bg-greenColor"}
                  title={"Add New Plan"}
                  onClickFun={() => setIsModalOpen((prev) => !prev)}
                />
                <Button
                  isLink={false}
                  color={"bg-orangeColor"}
                  title={"Add New Product"}
                  onClickFun={() => setIsAddModalOpen((prev) => !prev)}
                />
              </div>
            )
          }
        />

        <div className="flex flex-row bg-blocks-color w-1/4 m-auto rounded-3xl border border-blocks-color">
          <button
            onClick={() => setPlanModalOpen(false)}
            className={`rounded-l-3xl p-4 w-1/2 text-center ${
              planModalOpen === false ? "bg-background-color" : ""
            }`}
            href=""
          >
            Plan
          </button>
          <button
            onClick={() => setPlanModalOpen(true)}
            className={`rounded-r-3xl p-4 w-1/2 text-center ${
              planModalOpen === true ? "bg-background-color" : ""
            }`}
            href=""
          >
            Product
          </button>
        </div>
        <div className="my-4">
          {planModalOpen === false ? (
            <PlanTable />
          ) : (
            <div>
              <ProductTable />
            </div>
          )}
        </div>
      </Page>
    </div>
  );
};

export default CreatePlan;
