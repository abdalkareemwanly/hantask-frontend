import Chart from "./components/Chart";
import Statistics from "./components/Statistics";
import Table from "./components/Table";



export default function Index() {
  

  return (
    <div className="flex flex-col justify-center items-center my-10">
      {/* Statistics for important data */}
      <Statistics />

      {/* Most Viewed Services And Most Ordered Services */}
      <Table />

      {/* Chart For Information */}
      <Chart />
      
    </div>
  );
}
