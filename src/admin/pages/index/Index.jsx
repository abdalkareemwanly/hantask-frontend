import { useEffect, useState } from "react";
import { Page } from "../../../Components/StyledComponents";
// import Chart from "./components/Chart";
import Statistics from "./components/Statistics";
import Table from "./components/Table";
import axiosClient from "../../../axios-client";
export default function Index() {
  const [alldata, setData] = useState();

  useEffect(() => {
    getAdminNumber();
  }, []);

  const getAdminNumber = () => {
    axiosClient.get("/admin/dashboard").then((response) => {
      setData(response.data[0]);
    });
  };
  console.log(alldata);
  return (
    <Page>
      {/* Statistics for important data */}
      <Statistics alldata={alldata} />

      {/* Most Viewed Services And Most Ordered Services */}
      <Table alldata={alldata} />

      {/* Chart For Information */}
      {/* <Chart /> */}
    </Page>
  );
}
