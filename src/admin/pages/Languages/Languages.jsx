import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import Addlanguage from "./components/Addlanguage";
import { Page } from "../../../Components/StyledComponents";
import TableData from "../../../Components/TableData";
import Button from "../../../Components/Button";
import EditLanguage from "./components/EditLanguage";
import { toast } from "react-toastify";
import ModalContainer from "../../../Components/ModalContainer";
export default function Languages() {
  const [allLanguages, setAllLanguages] = useState([]);
  const [langs, setLangs] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState();

  useEffect(() => {
    getAllLanguages();
    getLanguages();
  }, []);
  const getAllLanguages = async () => {
    try {
      const response = await axiosClient.get("/admin/languages");
      setAllLanguages(response.data.data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };
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

  const handleChangeStatus = (id) => {
    const toastId = toast.loading("Please wait...");

    axiosClient.get(`/admin/language/update_default/${id}`).then(() => {
      getAllLanguages();
      toast.update(toastId, {
        render: "ok",
        type: "success",
        isLoading: false,
        autoClose: true,
        closeButton: true,
        closeOnClick: true,
        pauseOnHover: false,
      });
    });
  };

  const handleEdit = (row) => {
    setSelectedLang(row);
    setIsModalOpen((prev) => !prev);
  };

  const deleteLang = (Id) => {
    const id = toast.loading("Please wait...");

    axiosClient.get(`/admin/language/delete/${Id}`).then(() => {
      getAllLanguages();
      toast.update(id, {
        render: "ok",
        type: "success",
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    });
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      maxWidth: "100px",
      minWidth: "fit-content",
    },
    {
      name: "name",
      selector: (row) => row.name,
      maxWidth: "100px",
      minWidth: "fit-content",
    },
    {
      name: "direction",
      selector: (row) => row.direction,
      maxWidth: "100px",
      minWidth: "fit-content",
    },
    {
      name: "slug",
      selector: (row) => row.slug,
      maxWidth: "100px",
      minWidth: "fit-content",
    },
    {
      name: "status",
      selector: (row) => row.status,
      maxWidth: "100px",
      minWidth: "80px",
    },
    {
      name: "default",
      maxWidth: "150px",
      minWidth: "max-content",
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
      maxWidth: "350px",
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
              goto={`/admin/EditWord?slug=${row.slug}`}
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

  return (
    <Page className="flex md:flex-row items-start flex-col-reverse justify-between gap-2">
      <div className="flex flex-col lg:w-[65%] w-[100%]">
        <TableData columns={columns} data={allLanguages} />
      </div>
      <div className="flex flex-col bg-blocks-color component-shadow px-4 py-3 rounded-md lg:w-[35%] w-[100%]">
        {langs && (
          <Addlanguage getAllLanguages={getAllLanguages} langs={langs} />
        )}
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
              getAllLanguages={getAllLanguages}
            />
          }
        />
      )}
    </Page>
  );
}
