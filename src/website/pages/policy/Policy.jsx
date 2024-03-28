import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";

function Policy() {
  const [value, setValue] = useState("<p>hello world</p>");
  console.log(value);
  const [loading, setLoading] = useState(true);
  const [pageUpdate, setPageUpdate] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await axiosClient.post("/site/pageContent/showbytitle", {
        title: "privacy",
      });
      console.log(res);
      setValue(res.data?.content);
      setLoading(false);
    };
    getData();
  }, [pageUpdate]);

  try {
    return (
      <div
        className="lg:py-20 md:px-12 px-6 py-24"
        dangerouslySetInnerHTML={{ __html: value }}
      ></div>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Policy;
