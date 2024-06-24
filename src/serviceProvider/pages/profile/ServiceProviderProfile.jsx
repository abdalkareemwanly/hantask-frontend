import { useEffect, useState } from "react";
import Button from "../../../Components/Button";
import { Page } from "../../../Components/StyledComponents";
import axiosClient from "../../../axios-client";
import { useQueryHook } from "../../../hooks/useQueryHook";
import ModalContainer from "../../../Components/ModalContainer";
import EditProfile from "./components/EditProfile";
import Loader from "../../../Components/Loader";
import { useGlobalDataContext } from "../../../contexts/GlobalDataContext";
import NetworkErrorComponent from "../../../Components/NetworkErrorComponent";
const getData = async () => {
  const res = await axiosClient.get("seller/profile");
  return res.data.data;
};

const ServiceProviderProfile = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { countries, cities, setSelectedCountry, setSelectedCity, areas } =
    useGlobalDataContext();

  const {
    data: profile,
    queryClient,
    isLoading,
    isSuccess,
    isError,
  } = useQueryHook(["profile"], () => getData(), "normal");

  const editBtn = () => {
    setEditModalOpen((prev) => !prev);
  };
  if (isLoading) return <Loader />;
  if (isError) return <NetworkErrorComponent />;
  return (
    <Page>
      {editModalOpen && (
        <ModalContainer
          isModalOpen={editModalOpen}
          setIsModalOpen={setEditModalOpen}
          component={
            <EditProfile
              countries={countries}
              cities={cities}
              setSelectedCountry={setSelectedCountry}
              data={profile[0]}
              areas={areas}
              setIsModalOpen={setEditModalOpen}
            />
          }
        />
      )}
      <div className="bg-blocks-color  max-w-[600px] mx-auto p-4 rounded-md component-shadow flex flex-col  gap-3">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <img
              src={`${import.meta.env.VITE_WEBSITE_URL}${profile[0]?.image}`}
              className="w-[70px] h-[70px] rounded-full"
            />
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold">{profile[0]?.username}</h3>
              <span className="text-xs">{profile[0]?.email}</span>
            </div>
          </div>
          <div>
            <Button
              onClickFun={editBtn}
              isLink={false}
              title={"edit profile"}
              color={"bg-greenColor"}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-secondary-text flex items-center gap-9">
            <span>full name: </span>
            <span>{profile[0]?.name}</span>
          </div>
          <div className="text-secondary-text flex items-center gap-9">
            <span>username: </span>
            <span>{profile[0]?.username}</span>
          </div>
          <div className="text-secondary-text flex items-center gap-9">
            <span>email: </span>
            <span>{profile[0]?.email}</span>
          </div>
          <div className="text-secondary-text flex items-center gap-9">
            <span>phone number: </span>
            <span>{profile[0]?.phone}</span>
          </div>
          <div className="text-secondary-text flex items-center gap-9">
            <span>address: </span>
            <span>
              {profile[0]?.country?.name +
                ", " +
                profile[0]?.city?.name +
                ", " +
                profile[0]?.area?.name}
            </span>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default ServiceProviderProfile;
