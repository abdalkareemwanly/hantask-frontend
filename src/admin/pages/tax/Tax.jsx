import { useEffect, useState } from "react";
import Button from "../../../Components/Button";
import PageTitle from "../../../Components/PageTitle";
import { Page } from "../../../Components/StyledComponents";
import TableData from "../../../Components/TableData";
import { toast } from "react-toastify";
import ModalContainer from "../../../Components/ModalContainer";
import axiosClient from "../../../axios-client";
import { AddTax } from "./components/AddTax";
import { EditTax } from "./components/EditTax";
import { SuccessIcon, ErrorIcon } from "../../../Components/Icons";

const Tax = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [tax, setTax] = useState([]);
  const [countries, setCountries] = useState([]);
  const [clickedRow, setClickedRow] = useState();

  const getTax = async () => {
    const res = await axiosClient.get("/admin/taxes");
    setTax(res.data?.data);
  };
  const getCountries = async () => {
    const res = await axiosClient.get("/admin/countries");
    setCountries(res.data?.data);
  };

  useEffect(() => {
    getTax();
    getCountries();
  }, []);

  const editBtnFun = (row) => {
    setIsModalOpen(true);
    setClickedRow(row);
  };

  const handleDelete = async (id) => {
    const toastId = toast.loading("processing");
    const res = await axiosClient.get(`/admin/taxe/delete/${id}`);
    console.log(res);
    if (res.data.success == false) {
      toast.update(toastId, {
        type: "error",
        render: res.data.message,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    } else {
      getTax();
      toast.update(toastId, {
        type: "success",
        render: res.data.mes,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    }
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      maxWidth: "9%",
    },
    {
      name: "tax amount",
      selector: (row) => row.tax,
      maxWidth: "15%",
    },
    {
      name: "country",
      selector: (row) => row.country,
      maxWidth: "15%",
    },

    {
      name: "Actions",
      cell: (row) => {
        return (
          <div className="flex gap-x-2 gap-y-1 items-center w-full flex-wrap">
            <Button
              isLink={false}
              color={"bg-orangeColor"}
              title={"edit"}
              onClickFun={() => editBtnFun(row)}
            />
            <Button
              isLink={false}
              color={"bg-redColor"}
              title={"delete"}
              onClickFun={() => handleDelete(row.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <Page>
      <PageTitle
        text={"manage all countries tax"}
        right={
          <div>
            <Button
              isLink={false}
              color={"bg-greenColor"}
              title={"add new"}
              onClickFun={() => setIsAddModalOpen((prev) => !prev)}
            />
          </div>
        }
      />
      {isModalOpen && (
        <ModalContainer
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          component={
            <EditTax
              data={clickedRow}
              countries={countries}
              getTax={getTax}
              setIsModalOpen={setIsModalOpen}
            />
          }
        />
      )}

      {isAddModalOpen && (
        <ModalContainer
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
          component={
            <AddTax
              countries={countries}
              getTax={getTax}
              setIsAddModalOpen={setIsAddModalOpen}
            />
          }
        />
      )}

      <div className="my-4">
        <TableData
          columns={columns}
          data={tax}
          paginationBool={true}
          noDataMessage={"no countries tax to show!"}
        />
      </div>
    </Page>
  );
};

export default Tax;
