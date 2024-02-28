import { Page } from "../../../Components/StyledComponents";
import Chart from "./components/Chart";
import Statistics from "./components/Statistics";
import Table from "./components/Table";
export default function Index() {
  return (
    <Page>
      {/* Statistics for important data */}
      <Statistics />

      {/* Most Viewed Services And Most Ordered Services */}
      <Table />

      {/* Chart For Information */}
      {/* <Chart /> */}
    </Page>
  );
}
