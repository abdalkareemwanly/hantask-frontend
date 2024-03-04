import React, { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import Button from "../../../../Components/Button";

export default function PlanTable() {
  const [AllPlan, setPlan] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlan();
  }, []);

  const getPlan = async () => {
    await axiosClient.get("/admin/paypal/Plans/all").then((res) => {
      setPlan(res.data.plans);
      setLoading(false);
    });
  };

  const handleSelectedRowsChange = (data) => {
    const selectedIds = data.selectedRows.map((row) => row.id);
    setSelectedRows(selectedIds);
  };

  return (
    <div className="p-5">
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-400 mb-4"></div>
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Plan ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Usage Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Create Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {AllPlan.map((plan, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{plan.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{plan.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{plan.usage_type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{plan.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{plan.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{plan.create_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
