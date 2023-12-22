import { useEffect, useState } from "react";
import Button from "../../../Components/Button";
import PageTitle from "../../../Components/PageTitle";
import { Page } from "../../../Components/StyledComponents";
import TableData from "../../../Components/TableData";
import { toast } from "react-toastify";
import ModalContainer from "../../../Components/ModalContainer";
import axiosClient from "../../../axios-client";
import { EditArea } from "./components/EditArea";
import { AddArea } from "./components/AddArea";
import { ExcelIcon } from "../../../Components/Icons";
import ImportExcel from "./components/ImportExcel";

const Areas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [clickedRow, setClickedRow] = useState();
  console.log(areas);
  const getAreas = async () => {
    const res = await axiosClient.get("/admin/areas");
    setAreas(res.data?.data);
  };
  const getCities = async () => {
    const res = await axiosClient.get("/admin/citys");
    setCities(res.data?.data);
  };
  const getCountries = async () => {
    const res = await axiosClient.get("/admin/countries");
    setCountries(res.data?.data);
  };

  useEffect(() => {
    areas.length === 0 && getAreas();
    setTimeout(() => {
      getCountries();
      getCities();
    }, 500);
  }, []);

  const editBtnFun = (row) => {
    setIsModalOpen(true);
    setClickedRow(row);
  };

  const handleDelete = async (id) => {
    const toastId = toast.loading("processing");
    const res = await axiosClient.get(`/admin/area/delete/${id}`);
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
      getAreas();
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
      name: "area name",
      selector: (row) => row.service_area,
      maxWidth: "30%",
    },
    {
      name: "city name",
      selector: (row) => row.city,
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
    const res = await axiosClient.get("/admin/area/excel");
    const excelUrl = "http://127.0.0.1:8000" + res.data.url;
    const downloadLink = document.createElement("a");
    downloadLink.href = excelUrl;
    downloadLink.download = "cities.xlsx";
    downloadLink.click();
  };
  return (
    <Page>
      <PageTitle
        text={"manage all areas"}
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
            <EditArea
              data={clickedRow}
              getAreas={getAreas}
              countries={countries}
              cities={cities}
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
            <AddArea
              getAreas={getAreas}
              setIsAddModalOpen={setIsAddModalOpen}
              countries={countries}
              cities={cities}
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
              getMethod={getAreas}
              setIsModalOpen={setIsImportModalOpen}
              apiLink={"/admin/area/import"}
            />
          }
        />
      )}
      <div className="my-4">
        <TableData
          columns={columns}
          data={areas}
          paginationBool={true}
          noDataMessage={"no countries to show!"}
        />
      </div>
    </Page>
  );
};

export default Areas;
