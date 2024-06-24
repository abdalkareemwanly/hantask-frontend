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
import { useQueryHook } from "../../../hooks/useQueryHook";
import { useMutationHook } from "../../../hooks/useMutationHook";
import Swal from "sweetalert2";
import { useGlobalDataContext } from "../../../contexts/GlobalDataContext";
import NetworkErrorComponent from "../../../Components/NetworkErrorComponent";

const getData = async (page = 1, searchTerm) => {
  const res = await axiosClient.get(
    `admin/countries?page=${page}${
      searchTerm.length > 0 ? `&search=${searchTerm}` : ""
    }`
  );
  return res;
};
const deleteFunc = async (id) => {
  const res = await axiosClient.get(`/admin/country/delete/${id}`);
  return res;
};
const Countries = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState();
  const { countries: allCountries, setInvalidateCountries } =
    useGlobalDataContext();
  // const [allCountries, setAllCountries] = useState([]);
  // const getLanguages = () => {
  //   fetch("/src/admin/Json/countries.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAllCountries(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };
  // useEffect(() => {
  //   getLanguages();
  // }, []);

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: countries,
    queryClient,
    isError,
  } = useQueryHook(
    ["countries", page, searchTerm],
    () => getData(page, searchTerm),
    "paginate",
    page
  );

  const deleteMutation = useMutationHook(deleteFunc, [
    "countries",
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
    const excelUrl = "https://api.hantask.at/api" + res.data.url;
    const downloadLink = document.createElement("a");
    downloadLink.href = excelUrl;
    downloadLink.download = "Countries.xlsx";
    downloadLink.click();
  };
  if (isError) return <NetworkErrorComponent />;
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
              setIsModalOpen={setIsModalOpen}
              setInvalidateCountries={setInvalidateCountries}
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
              setIsAddModalOpen={setIsAddModalOpen}
              setInvalidateCountries={setInvalidateCountries}
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
              // getMethod={getCountries}
              setIsModalOpen={setIsImportModalOpen}
              apiLink={"/admin/country/import"}
              importFor={"countries"}
            />
          }
        />
      )}

      <div className="my-4">
        <TableData
          columns={columns}
          enableSearch={true}
          response={countries}
          actualData={countries?.data.data}
          setPage={setPage}
          paginationBool={true}
          noDataMessage={"no countries to show!"}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </Page>
  );
};

export default Countries;
