import React, { useEffect, useState } from "react";
import { useStateContext } from "../../../contexts/ContextsProvider";
import { FaSearch, FaFilter } from "react-icons/fa";
import axiosClient from "../../../axios-client";
import Button from "../../../Components/Button";
import { AddPlan } from "./component/AddPlan";
import { AddProduct } from "./component/AddProduct";
import PlanTable from "./component/PlanTable";
import ModalContainer from "../../../Components/ModalContainer";

const CreatePlan = () => {
  const [languagedirection, setlanguagedirection] = useState("LTR");
  const { translation } = useStateContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planModalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();

  useEffect(() => {
    getLanguage();
    getProductCategory();
  }, []);

  const getProductCategory = () => {
    fetch("/Json/ProductCategory.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCategory(data);
        console.log(data);
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
      <div
        className={`flex ${
          languagedirection == "RTL" ? "flex-row-reverse" : "flex-row"
        } justify-between gap-3 bg-blocks-color my-3 p-4`}
      >
        <div className="flex items-center gap-4">
          <h2 className="text-lg">
            {(translation && translation["Plan"]) || "Plan"} /{" "}
            {(translation && translation["Add Plan"]) || "Add Plan"}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <Button
            isLink={false}
            color={"bg-greenColor"}
            title={"Add New Product"}
            onClickFun={() => setIsAddModalOpen((prev) => !prev)}
          />
          <Button
            isLink={false}
            color={"bg-orangeColor"}
            title={"Add New Plan"}
            onClickFun={() => setIsModalOpen((prev) => !prev)}
          />
        </div>
      </div>
      <PlanTable />
    </div>
  );
};

export default CreatePlan;
