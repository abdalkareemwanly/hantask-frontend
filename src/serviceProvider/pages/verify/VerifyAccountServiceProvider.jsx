import { useEffect, useState } from "react";
import PageTitle from "../../../Components/PageTitle";
import { Page } from "../../../Components/StyledComponents";
import axiosClient from "../../../axios-client";
import ReusableForm from "../../../Components/ReusableForm";
import { MdVerified } from "react-icons/md";
import Loader from "../../../Components/Loader";

const VerifyAccountServiceProvider = () => {
  const [isVerefied, setIsVerefied] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [profileInfo, setProfileInfo] = useState();
  const [dataProfessionalStatus, setdataProfessionalStatus] = useState([]);
  const [dataManyEmployeess, setdataManyEmployeess] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const check = await axiosClient.get("/seller/profileVerify/check");
      setIsVerefied(check.data.data);

      console.log(check);

      if (check.data.data === false) {
        const res = await axiosClient.get("seller/profileVerify");
        setProfileInfo(res.data);
        console.log(res.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        return;
      }
    };
    !profileInfo && getData();
  }, [profileInfo, isLoading]);

  useEffect(() => {
    if (profileInfo) {
      setdataProfessionalStatus(profileInfo?.dataProfessionalStatus);
      setdataManyEmployeess(profileInfo?.dataManyEmployeess);
    }
  }, [profileInfo]);
  console.log(dataProfessionalStatus);
  let template = {
    title: "",
    fields: [
      {
        title: "What is your company name?",
        type: "text",
        name: "companyName",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
      },
      {
        title: "What is your current professional status? ",
        type: "select",
        options: [...dataProfessionalStatus],
        name: "company_type",
        optionText: "company_status",
        optionValue: "id",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
      },
      {
        title: "How many employees do you employ in your company?",
        type: "select",
        options: [...dataManyEmployeess],
        name: "employees_type",
        optionText: "employee_status",
        optionValue: "id",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
      },
      {
        title: "GISA",
        type: "text",
        name: "gisa",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
      },
      {
        title: "Address",
        type: "text",
        name: "address",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
      },
      {
        title: "Zip code",
        type: "number",
        name: "zip_code",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
      },
      {
        title: "busines license",
        type: "file",
        name: "busines_license",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
      },
    ],
  };
  const onSubmit = async (values) => {
    console.log(values.busines_license);
    const formData = new FormData();
    formData.append("many_employee_id", values.employees_type);
    formData.append("professional_status_id", values.company_type);
    formData.append("gisa", values.gisa);
    formData.append("company_name", values.companyName);
    formData.append("address", values.address);
    formData.append("zip_code", values.zip_code);
    formData.append("busines_license", values.busines_license[0]);

    const res = await axiosClient.post(`/seller/profileVerify/store`, formData);
    setIsLoading(true);
    console.log(res);
  };

  const validate = () => {
    return;
  };

  if (isLoading) return <Loader />;
  return (
    <Page>
      <PageTitle text={"verify account page"} />
      <div className="my-4">
        {!isVerefied ? (
          <ReusableForm
            template={template}
            onSubmit={onSubmit}
            validate={validate}
            btnWidth={"w-[150px] self-end"}
            btnText={"verify"}
            addedStyles={"md:w-[400px] lg:w-[100%]"}
          />
        ) : (
          <div className="bg-greenColor p-4 text-white flex items-center gap-2 rounded-xl">
            <MdVerified size={30} />
            your profile is verefied
          </div>
        )}
      </div>
    </Page>
  );
};

export default VerifyAccountServiceProvider;
