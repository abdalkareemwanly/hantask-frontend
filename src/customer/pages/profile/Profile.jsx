import { useEffect, useState } from "react";
import Button from "../../../Components/Button";
import { Page } from "../../../Components/StyledComponents";
import axiosClient from "../../../axios-client";
import { useQueryHook } from "../../../hooks/useQueryHook";
import ModalContainer from "../../../Components/ModalContainer";
import EditProfile from "./components/EditProfile";
import Loader from "../../../Components/Loader";
import { useGlobalDataContext } from "../../../contexts/GlobalDataContext";
const getData = async () => {
  const res = await axiosClient.get("buyer/profile");
  return res.data.data;
};

const Profile = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [areas, setAreas] = useState();
  const { countries, cities } = useGlobalDataContext();
  const getAreas = async (signal) => {
    const res = await axiosClient.get(`admin/areas`, { signal: signal });
    setAreas(res.data.data);
  };
  const {
    data: profile,
    queryClient,
    isLoading,
  } = useQueryHook(["profile"], () => getData(), "normal");

  useEffect(() => {
    const controller1 = new AbortController();
    const controller2 = new AbortController();
    const controller3 = new AbortController();

    setTimeout(() => {
      getAreas(controller3.signal);
    }, 500);

    return () => {
      controller1.abort();
      controller2.abort();
      controller3.abort();
    };
  }, []);

  const editBtn = () => {
    setEditModalOpen((prev) => !prev);
  };
  if (isLoading) return <Loader />;
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
              areas={areas}
              data={profile[0]}
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
              alt=""
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
            <span>full name: </span>
            <span>{profile[0]?.name}</span>
          </div>
          <div className="text-secondary-text flex items-center gap-9">
            <span>address: </span>
            <span>{profile[0]?.name}</span>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Profile;
