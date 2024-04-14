import { AnimatePresence, motion, useScroll } from "framer-motion";
import Button from "../../../../Components/Button";
import TableData from "../../../../Components/TableData";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axiosClient from "../../../../axios-client";

const FormTableQuestions = ({
  formbuilder,
  createFrom,
  data,
  setEditModal,
  setEditQuestionSelected,
}) => {
  const deleteFun = async (id) => {
    const toastId = toast.loading("deleting..");
    try {
      const category = await axiosClient.delete(`/admin/question/delete/${id}`);
      toast.update(toastId, {
        type: "success",
        render: category.mes,
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

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      // sortable: true,
    },
    {
      name: "question",
      width: "50%",
      selector: (row) => row.content,
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
              onClickFun={() => {
                setEditQuestionSelected(row);
                setEditModal((prev) => !prev);
              }}
            />
            <Button
              isLink={false}
              color={"bg-blueColor"}
              title={"delete"}
              onClickFun={() => handleDelete(row.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <AnimatePresence>
      {(formbuilder === "question" || formbuilder === "answer") && (
        <motion.div
          key="step4"
          className="px-4 py-2 w-full z-1"
          initial={{ opacity: 0, x: "10%" }}
          animate={{ opacity: 1, x: "0" }}
          exit={{ opacity: 0, x: "-10%" }}
          transition={{ duration: 0.9, ease: "backOut" }}
        >
          <TableData
            columns={columns}
            enableSearch={false}
            response={data}
            actualData={data.data?.questions}
            // setPage={setPage}
            paginationBool={false}
            noDataMessage={"no questions to show!"}
          />
          {/* {showEditForm && <EditFormData formbuilder={formbuilder} row={selectedRow} />} */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormTableQuestions;
