import { useState } from "react";
import { Page } from "../../../Components/StyledComponents";
import ModalContainer from "./../../../Components/ModalContainer";
import PageTitle from "./../../../Components/PageTitle";
import TableData from "./../../../Components/TableData";
import ChangeStatus from "./components/ChangeStatus";
import { useQueryHook } from "../../../hooks/useQueryHook";
import axiosClient from "../../../axios-client";
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
  console.log(serviceProviders);
  return (
    <Page>
      {isModalOpen && (
        <ModalContainer
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          component={
            <ChangeStatus
            //   data={clickedRow}
            //   setIsModalOpen={setIsChangeModalOpen}
            />
          }
        />
      )}

      <PageTitle text={"all handymans verifications requests"} />
      <div className="my-4">
        <TableData
          //   columns={columns}
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
