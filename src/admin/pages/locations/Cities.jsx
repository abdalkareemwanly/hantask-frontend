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
import { useQueryHook } from "../../../hooks/useQueryHook";
import { useMutationHook } from "../../../hooks/useMutationHook";
import Swal from "sweetalert2";
import NetworkErrorComponent from "../../../Components/NetworkErrorComponent";

const getData = async (page = 1, searchTerm) => {
  const res = await axiosClient.get(
    `admin/citys?page=${page}${
      searchTerm.length > 0 ? `&search=${searchTerm}` : ""
    }`
  );
  return res;
};
const deleteFunc = async (id) => {
  const res = await axiosClient.get(`/admin/city/delete/${id}`);
  return res;
};
const Cities = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [clickedRow, setClickedRow] = useState();

  const getCountries = async () => {
    const res = await axiosClient.get("/admin/countries");
    setCountries(res.data?.data);
  };

  useEffect(() => {
    getCountries();
  }, []);

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: cities, isError } = useQueryHook(
    ["cities", page, searchTerm],
    () => getData(page, searchTerm),
    "paginate",
    page
  );
  const deleteMutation = useMutationHook(deleteFunc, [
    "cities",
    page,
    searchTerm,
  ]);

  const editBtnFun = (row) => {
    setIsModalOpen(true);
    setClickedRow(row);
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
    const toastId = toast.loading("submitting, please wait...");
    try {
      const country = await deleteMutation.mutateAsync(id);
      toast.update(toastId, {
        type: "success",
        render: country.mes,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
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
    const excelUrl = import.meta.env.VITE_WEBSITE_URL + res.data.url;
    const downloadLink = document.createElement("a");
    downloadLink.href = excelUrl;
    downloadLink.download = "cities.xlsx";
    downloadLink.click();
  };
  if (isError) return <NetworkErrorComponent />;

  return (
    <Page>
      <PageTitle
        text={"manage all regions"}
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
            <EditCity data={clickedRow} setIsModalOpen={setIsModalOpen} />
          }
        />
      )}

      {isAddModalOpen && (
        <ModalContainer
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
          component={<AddCity setIsAddModalOpen={setIsAddModalOpen} />}
        />
      )}
      {isImportModalOpen && (
        <ModalContainer
          isModalOpen={isImportModalOpen}
          setIsModalOpen={setIsImportModalOpen}
          component={
            <ImportExcel
              // getMethod={getCities}
              importFor={"cities"}
              setIsModalOpen={setIsImportModalOpen}
              apiLink={"/admin/city/import"}
            />
          }
        />
      )}
      <div className="my-4">
        <TableData
          columns={columns}
          enableSearch={true}
          response={cities}
          actualData={cities?.data.data}
          setPage={setPage}
          paginationBool={true}
          noDataMessage={"no countries to show!"}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </Page>
  );
};

export default Cities;
