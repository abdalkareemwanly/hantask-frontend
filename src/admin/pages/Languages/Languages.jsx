import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import Addlanguage from "./components/Addlanguage";
import { Page } from "../../../Components/StyledComponents";
import TableData from "../../../Components/TableData";
import Button from "../../../Components/Button";
import EditLanguage from "./components/EditLanguage";
import { toast } from "react-toastify";
import ModalContainer from "../../../Components/ModalContainer";
import { useQueryHook } from "../../../hooks/useQueryHook";
import { useMutationHook } from "../../../hooks/useMutationHook";
import NetworkErrorComponent from "../../../Components/NetworkErrorComponent";
const getData = async (page) => {
  try {
    const response = await axiosClient.get(`/admin/languages?page=${page}`);
    return response;
  } catch (error) {
    console.error("Error fetching languages:", error);
  }
};
const deleteFunc = async (Id) => {
  const res = await axiosClient.get(`/admin/language/delete/${Id}`);
  return res;
};
const changeFunc = async (Id) => {
  const res = await axiosClient.get(`/admin/language/update_default/${Id}`);
  return res;
};
export default function Languages() {
  const [langs, setLangs] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState();

  useEffect(() => {
    getLanguages();
  }, []);
  const [page, setPage] = useState(1);
  const { data: languages, isError } = useQueryHook(
    ["languages", page],
    () => getData(page),
    "paginate"
  );
  const deleteMutation = useMutationHook(deleteFunc, ["languages", page]);
  const changeMutation = useMutationHook(changeFunc, ["languages", page]);

  const getLanguages = () => {
    fetch("/src/admin/Json/LanguagesTemp.json")
      .then((response) => response.json())
      .then((data) => {
        setLangs(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleChangeStatus = async (id) => {
    const toastID = toast.loading("please wait...");
    try {
      const res = await changeMutation.mutateAsync(id);
      toast.update(toastID, {
        type: "success",
        render: res.data.mes,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    } catch (error) {
      toast.update(toastID, {
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

  const handleEdit = (row) => {
    setSelectedLang(row);
    setIsModalOpen((prev) => !prev);
  };

  const deleteLang = async (Id) => {
    const id = toast.loading("please wait...");
    try {
      const res = await deleteMutation.mutateAsync(Id);
      toast.update(id, {
        type: "success",
        render: res.data.mes,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    } catch (error) {
      toast.update(id, {
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
      sortable: true,
    },
    {
      name: "name",
      selector: (row) => row.name,
    },
    {
      name: "direction",
      selector: (row) => row.direction,
    },
    {
      name: "slug",
      selector: (row) => row.slug,
    },
    {
      name: "status",
      selector: (row) => row.status,
    },
    {
      name: "default",
      cell: (row) => {
        return (
          <Button
            isLink={false}
            title={row.default === 1 ? " default" : "make default"}
            color={row.default === 1 ? "bg-greenColor" : "bg-redColor"}
            onClickFun={() => handleChangeStatus(row.id)}
          />
        );
      },
    },
    {
      name: "actions",
      minWidth: "30%",
      cell: (row) => {
        return (
          <div className="flex gap-1 items-center flex-wrap">
            <Button
              isLink={false}
              title={"edit"}
              color={"bg-blueColor"}
              onClickFun={() => handleEdit(row)}
            />
            <Button
              isLink={true}
              title={"edit words"}
              goto={`/admin/dashboard/EditWord?slug=${row.slug}`}
              color={"bg-blueColor"}
            />
            <Button
              isLink={false}
              title={"delete"}
              color={"bg-redColor"}
              onClickFun={() => deleteLang(row.id)}
            />
          </div>
        );
      },
    },
  ];
  if (isError) <NetworkErrorComponent />;

  return (
    <Page className="flex items-start flex-col-reverse justify-between gap-2">
      <div className="flex flex-col w-full">
        <TableData
          noDataMessage={"no languages yet!"}
          columns={columns}
          response={languages}
          actualData={languages?.data.data}
          setPage={setPage}
          paginationBool={true}
        />
      </div>
      <div className="bg-blocks-color component-shadow px-4 py-3 rounded-md w-full">
        {langs && <Addlanguage langs={langs} />}
      </div>

      {isModalOpen && (
        <ModalContainer
          width={800}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          component={
            <EditLanguage
              langData={selectedLang}
              languages={langs}
              setIsModalOpen={setIsModalOpen}
            />
          }
        />
      )}
    </Page>
  );
}
