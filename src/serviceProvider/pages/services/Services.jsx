import { useEffect, useState } from "react";
import Button from "../../../Components/Button";
import PageTitle from "../../../Components/PageTitle";
import { Page } from "../../../Components/StyledComponents";
import { toast } from "react-toastify";
import ModalContainer from "../../../Components/ModalContainer";
import axiosClient from "../../../axios-client";
import { AddService } from "./components/AddService";
import Swal from "sweetalert2";
import { ErrorIcon, SuccessIcon } from "../../../Components/Icons";
import { useQueryHook } from "../../../hooks/useQueryHook";
import { useMutationHook } from "../../../hooks/useMutationHook";
import { EditService } from "./components/EditService";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import Loader from "../../../Components/Loader";

const getData = async (page = 1, searchTerm) => {
  const res = await axiosClient.get(
    `seller/services?page=${page}${
      searchTerm.length > 0 ? `&search=${searchTerm}` : ""
    }`
  );
  return res;
};

const changeStatusFunc = async (id) => {
  const res = await axiosClient.get(`/admin/user/changeStatusMethod/${id}`);
  return res;
};

const deleteFunc = async (id) => {
  const res = await axiosClient.get(`/admin/user/archiveMethod/${id}`);
  return res;
};

const Services = () => {
  const sellerId = JSON.parse(localStorage.getItem("USER")).id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: services,
    queryClient,
    isLoading,
  } = useQueryHook(
    ["services", page, searchTerm],
    () => getData(page, searchTerm),
    "paginate",
    page
  );

  const changeStatusMutation = useMutationHook(changeStatusFunc, [
    "services",
    page,
    searchTerm,
  ]);
  const deleteMutation = useMutationHook(deleteFunc, [
    "services",
    page,
    searchTerm,
  ]);

  const editBtnFun = (ele) => {
    setIsModalOpen(true);
    setClickedRow(ele);
  };

  const handleChangeStatus = async (id) => {
    const toastId = toast.loading("processing...");
    try {
      const user = await changeStatusMutation.mutateAsync(id);
      toast.update(toastId, {
        type: "success",
        render: user.mes,
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

  const deleteFun = async (id) => {
    const toastId = toast.loading("deleting..");
    try {
      const user = await deleteMutation.mutateAsync(id);
      toast.update(toastId, {
        type: "success",
        render: user.mes,
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

  // Prefetch the next page!
  useEffect(() => {
    setTimeout(() => {
      queryClient.prefetchQuery({
        queryKey: ["services", page + 1, searchTerm],
        queryFn: () => getData(page + 1),
        staleTime: 60 * 60 * 1000,
      });
    }, 500);
  }, [services, page, queryClient, searchTerm]);
  if (isLoading) return <Loader />;
  return (
    <Page>
      <PageTitle
        text={"all services"}
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
            <EditService
              sellerId={sellerId}
              data={clickedRow}
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
            <AddService
              sellerId={sellerId}
              setIsAddModalOpen={setIsAddModalOpen}
            />
          }
        />
      )}

      <div className="flex flex-wrap gap-6 my-4">
        {services.data.data.map((ele) => (
          <div
            key={ele.id}
            className="flex flex-col gap-2 flex-grow-0 flex-[48%] rounded-md bg-blocks-color component-shadow"
          >
            <div className="flex gap-1 items-center p-4">
              <div>
                <label>
                  <div className="switch">
                    <input
                      id={`check${ele.id}`}
                      type="checkbox"
                      name={`check${ele.id}`}
                      hidden
                      checked={ele.status === 0 ? false : true}
                      onChange={() => handleChangeStatus(ele.id)}
                    />
                    <div className="slider"></div>
                    <label htmlFor={`check${ele.id}`}>
                      service is{" "}
                      <span className="text-xl font-medium">
                        {ele.status === 0 ? "close" : "open"}
                      </span>
                    </label>
                  </div>
                </label>
              </div>
              <Button
                hoverStyles={"rounded-full hover:bg-orangeColor"}
                isLink={false}
                onClickFun={() => editBtnFun(ele)}
                Icon={<FaRegEdit size={20} className="text-primary-text" />}
              />
              <Button
                hoverStyles={"rounded-full  hover:bg-redColor"}
                isLink={false}
                // onClickFun={() => handleDeleteClick(ele.id)}
                Icon={<MdDelete size={20} className="text-primary-text" />}
              />
              {console.log(ele)}
            </div>
            <div className="flex flex-col gap-4">
              <img
                src={`${import.meta.env.VITE_WEBSITE_URL}${ele.image}`}
                className="w-full h-[250px] object-cover"
              />
              <div className="flex flex-col gap-2 p-4">
                <h3 className="text-2xl font-semibold">{ele.title}</h3>

                <p className="text-secondary-text flex  gap-1">
                  <span className="">category: </span>{" "}
                  <span>{ele.category_name}</span>
                </p>
                <p className="text-secondary-text flex  gap-1">
                  <span className="">sub category: </span>{" "}
                  <span>{ele.subcategory_name}</span>
                </p>
                <p className="text-secondary-text flex  gap-1">
                  <span className="">child category: </span>{" "}
                  <span>{ele.child_category_name}</span>
                </p>
                <p className="text-secondary-text flex  gap-1">
                  <span className="">city: </span>{" "}
                  <span>{ele.serviceCity_name}</span>
                </p>
                <p className="text-secondary-text flex  gap-1">
                  <span className="">description: </span>{" "}
                  <span>{ele.description}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
};

export default Services;
