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
import { useQueryHook } from "../../../hooks/useQueryHook";
import { useMutationHook } from "../../../hooks/useMutationHook";
import Swal from "sweetalert2";
import NetworkErrorComponent from "../../../Components/NetworkErrorComponent";

const getData = async () => {
  const res = await axiosClient.get("/admin/taxes");
  return res;
};
const deleteFunc = async (id) => {
  const res = await axiosClient.get(`/admin/taxe/delete/${id}`);
  return res;
};

const Tax = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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

  const {
    data: tax,
    queryClient,
    isError,
  } = useQueryHook(["taxes", page], () => getData(page), "paginate", page);
  const deleteMutation = useMutationHook(deleteFunc, ["taxes", page]);

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
    const toastId = toast.loading("processing");
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

  if (isError) <NetworkErrorComponent />;
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
              // getTax={getTax}
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
              // getTax={getTax}
              setIsAddModalOpen={setIsAddModalOpen}
            />
          }
        />
      )}

      <div className="my-4">
        <TableData
          columns={columns}
          enableSearch={false}
          response={tax}
          actualData={tax?.data.data}
          setPage={setPage}
          paginationBool={true}
          noDataMessage={"no taxes to show!"}
        />
      </div>
    </Page>
  );
};

export default Tax;
