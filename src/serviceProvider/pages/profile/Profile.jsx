import { useState } from "react";
import ModalContainer from "../../../Components/ModalContainer";
import EditProfile from "./components/EditProfile";
import axiosClient from "../../../axios-client";
import { useQueryHook } from "../../../hooks/useQueryHook";

const getData = async () => {
  const res = await axiosClient.get(`admin/users`);
  return res;
};

const Profile = () => {
  const { data: profile, queryClient } = useQueryHook(
    ["profile"],
    () => getData(),
    "normal"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <p> Profile page </p>
      {isModalOpen && (
        <ModalContainer
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          component={
            <EditProfile
              data={clickedRow}
              countries={countries}
              getTax={getTax}
              setIsModalOpen={setIsModalOpen}
            />
          }
        />
      )}
    </div>
  );
};

export default Profile;
