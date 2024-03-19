import { useState } from "react";
import { Page } from "../../../Components/StyledComponents";
import ModalContainer from "./../../../Components/ModalContainer";
import PageTitle from "./../../../Components/PageTitle";
import TableData from "./../../../Components/TableData";
import ChangeStatus from "./components/ChangeStatus";
import { useQueryHook } from "../../../hooks/useQueryHook";
import axiosClient from "../../../axios-client";
import Button from "../../../Components/Button";
const getData = async () => {
  const res = await axiosClient.get("/admin/verifySeller");
  return res;
};

const ServiceProvidersVerify = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const {
    data: serviceProviders,
    errors,
    isLoading,
    refetch,
  } = useQueryHook(["serviceProviderVerify", page], getData);
  const [clickedRow, setClickedRow] = useState();
  const handleSelectedRow = (row) => {
    setClickedRow(row);
    setIsModalOpen(true);
  };

  const columns = [
    {
      name: "handyman name",
      minWidth: "150px",
      compact: true,
      selector: (row) => row.seller_name,
    },
    {
      name: "handyman email",
      compact: true,
      width: "150px",
      selector: (row) => row.seller_email,
    },
    {
      name: "company name",
      compact: true,
      minWidth: "150px",
      selector: (row) => row.company_name,
    },
    {
      name: "gisa",
      minWidth: "150px",
      compact: true,
      selector: (row) => row.gisa,
    },
    {
      name: "address",
      minWidth: "150px",
      compact: true,
      selector: (row) => row.address,
    },
    {
      name: "zip code",
      compact: true,
      minWidth: "150px",
      selector: (row) => row.zip_code,
    },
    {
      name: "license",
      compact: true,
      minWidth: "150px",
      selector: (row) => (
        <a
          href={import.meta.env.VITE_WEBSITE_URL + row.busines_license}
          target="_blank"
          rel="noreferrer"
        >
          download license
        </a>
      ),
    },
    {
      minWidth: "150px",
      name: "status",
      selector: (row) => {
        return (
          <div
            className={`p-1 rounded-md ${
              row.status == 0
                ? "border border-orangeColor text-orangeColor bg-orangeColor bg-opacity-20"
                : row.status == 1
                ? "border border-redColor text-redColor bg-redColor bg-opacity-20"
                : "border border-greenColor text-greenColor bg-greenColor bg-opacity-20"
            }`}
          >
            {row.status == 0
              ? "pending"
              : row.status == 1
              ? "not verified"
              : "verified"}
          </div>
        );
      },
    },
    {
      name: "actions",
      minWidth: "150px",
      selector: (row) => {
        return (
          <div className="flex gap-1">
            <Button
              isLink={false}
              color={"bg-blueColor"}
              title={"change status"}
              onClickFun={() => handleSelectedRow(row)}
            />
          </div>
        );
      },
    },
  ];
  return (
    <Page>
      {isModalOpen && (
        <ModalContainer
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          component={
            <ChangeStatus data={clickedRow} setIsModalOpen={setIsModalOpen} />
          }
        />
      )}

      <PageTitle text={"all handymans verifications requests"} />
      <div className="my-4">
        <TableData
          columns={columns}
          enableSearch={false}
          response={serviceProviders}
          actualData={serviceProviders?.data.data}
          setPage={setPage}
          paginationBool={true}
          noDataMessage={"no verifications requests to show!"}
        />
      </div>
    </Page>
  );
};

export default ServiceProvidersVerify;
