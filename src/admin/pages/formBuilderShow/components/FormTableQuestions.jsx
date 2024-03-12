import { AnimatePresence, motion } from "framer-motion";
import Button from "../../../../Components/Button";
import TableData from "../../../../Components/TableData";

const FormTableQuestions = ({ formbuilder, createFrom, data }) => {
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
              onClickFun={() => editBtnFun(row)}
            />
            <Button
              isLink={false}
              color={"bg-blueColor"}
              title={"delete"}
              onClickFun={() => handleChangeStatus(row.id)}
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
          className="px-4 py-2 w-full"
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormTableQuestions;
