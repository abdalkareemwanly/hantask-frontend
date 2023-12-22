import { useEffect, useState } from "react";
import Button from "../../../Components/Button";
import PageTitle from "../../../Components/PageTitle";
import { Page } from "../../../Components/StyledComponents";
import TableData from "../../../Components/TableData";
import { toast } from "react-toastify";
import ModalContainer from "../../../Components/ModalContainer";
import axiosClient from "../../../axios-client";
import { AddCountry } from "./components/AddCountry";
import { EditCountry } from "./components/EditCountry";
import { ExcelIcon } from "../../../Components/Icons";
import ImportExcel from "./components/ImportExcel";

const Countries = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [clickedRow, setClickedRow] = useState();
  const [allCountries, setAllCountries] = useState([]);
  const getLanguages = () => {
    fetch("/src/admin/Json/countries.json")
      .then((response) => response.json())
      .then((data) => {
        setAllCountries(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    getLanguages();
  }, []);

  const getCountries = async () => {
    const res = await axiosClient.get("/admin/countries");
    setCountries(res.data?.data);
  };

  useEffect(() => {
    countries.length === 0 && getCountries();
  }, []);

  const editBtnFun = (row) => {
    setIsModalOpen(true);
    setClickedRow(row);
  };

  const handleDelete = async (id) => {
    const toastId = toast.loading("processing");
    const res = await axiosClient.get(`/admin/country/delete/${id}`);
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
      getCountries();
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
      name: "name",
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
    const res = await axiosClient.get("/admin/country/excel");
    const excelUrl = "http://127.0.0.1:8000" + res.data.url;
    const downloadLink = document.createElement("a");
    downloadLink.href = excelUrl;
    downloadLink.download = "Countries.xlsx";
    downloadLink.click();
  };

  return (
    <Page>
      <PageTitle
        text={"manage all countries"}
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
            <EditCountry
              data={clickedRow}
              getCountries={getCountries}
              setIsModalOpen={setIsModalOpen}
              allCountries={allCountries}
            />
          }
        />
      )}

      {isAddModalOpen && (
        <ModalContainer
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
          component={
            <AddCountry
              getCountries={getCountries}
              allCountries={allCountries}
              setIsAddModalOpen={setIsAddModalOpen}
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
              getMethod={getCountries}
              setIsModalOpen={setIsImportModalOpen}
              apiLink={"/admin/country/import"}
            />
          }
        />
      )}

      <div className="my-4">
        <TableData
          columns={columns}
          data={countries}
          paginationBool={true}
          noDataMessage={"no countries to show!"}
        />
      </div>
    </Page>
  );
};

export default Countries;
