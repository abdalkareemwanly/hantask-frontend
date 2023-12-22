import { useEffect, useState } from "react";
import Button from "../../../Components/Button";
import PageTitle from "../../../Components/PageTitle";
import { Page } from "../../../Components/StyledComponents";
import TableData from "../../../Components/TableData";
import { toast } from "react-toastify";
import ModalContainer from "../../../Components/ModalContainer";
import axiosClient from "../../../axios-client";
import { AddCity } from "./components/AddCity";
import { EditCity } from "./components/EditCity";
import { ExcelIcon } from "../../../Components/Icons";
import ImportExcel from "./components/ImportExcel";

const Cities = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [clickedRow, setClickedRow] = useState();
  console.log(cities);

  const getCities = async () => {
    const res = await axiosClient.get("/admin/citys");
    setCities(res.data?.data);
  };
  const getCountries = async () => {
    const res = await axiosClient.get("/admin/countries");
    setCountries(res.data?.data);
  };

  useEffect(() => {
    cities.length === 0 && getCities();
    getCountries();
  }, []);

  const editBtnFun = (row) => {
    setIsModalOpen(true);
    setClickedRow(row);
  };

  const handleDelete = async (id) => {
    const toastId = toast.loading("processing");
    const res = await axiosClient.get(`/admin/city/delete/${id}`);
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
      getCities();
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
      maxWidth: "30%",
    },
    {
      name: "city name",
      selector: (row) => row.service_city,
      maxWidth: "30%",
    },
    {
      name: "country name",
      selector: (row) => row.country,
      maxWidth: "30%",
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
  const handleChooseExcelFile = () => {
    setIsImportModalOpen(true);
  };

  const handleDownloadExcelFile = async () => {
    const res = await axiosClient.get("/admin/city/excel");
    const excelUrl = "http://127.0.0.1:8000" + res.data.url;
    const downloadLink = document.createElement("a");
    downloadLink.href = excelUrl;
    downloadLink.download = "cities.xlsx";
    downloadLink.click();
  };

  return (
    <Page>
      <PageTitle
        text={"manage all cities"}
        right={
          <div className="flex gap-2 flex-wrap my-2 md:my-0">
            <Button
              isLink={false}
              color={"bg-greenColor"}
              title={"add new"}
              onClickFun={() => setIsAddModalOpen((prev) => !prev)}
            />
            <Button
              isLink={false}
              Icon={<ExcelIcon size={25} />}
              color={"bg-orangeColor"}
              title={"import from"}
              onClickFun={handleChooseExcelFile}
            />
            <Button
              isLink={false}
              Icon={<ExcelIcon size={25} />}
              color={"bg-blueColor"}
              title={"download template"}
              onClickFun={handleDownloadExcelFile}
            />
          </div>
        }
      />
      {isModalOpen && (
        <ModalContainer
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          component={
            <EditCity
              data={clickedRow}
              getCities={getCities}
              countries={countries}
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
            <AddCity
              getCities={getCities}
              setIsAddModalOpen={setIsAddModalOpen}
              countries={countries}
            />
          }
        />
      )}
      {isImportModalOpen && (
        <ModalContainer
          isModalOpen={isImportModalOpen}
          setIsModalOpen={setIsImportModalOpen}
          component={
            <ImportExcel
              getMethod={getCities}
              setIsModalOpen={setIsImportModalOpen}
              apiLink={"/admin/city/import"}
            />
          }
        />
      )}
      <div className="my-4">
        <TableData
          columns={columns}
          data={cities}
          paginationBool={true}
          noDataMessage={"no cities to show!"}
        />
      </div>
    </Page>
  );
};

export default Cities;
