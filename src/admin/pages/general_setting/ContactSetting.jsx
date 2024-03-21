import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import Button from "../../../Components/Button";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useStateContext } from "../../../contexts/ContextsProvider";

export default function ContactSetting() {
  const [phone, setPhone] = useState([]);
  const [email, setEmail] = useState([]);
  const { translation } = useStateContext();
  const [location, setLocation] = useState([]);
  const [inputs, setInputs] = useState({
    type: "",
    title: "",
    content: "",
  });
  const [FormInput, showFormInput] = useState(false);
  const variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    getContact();
  }, []);

  const getContact = () => {
    axiosClient.get("admin/contact/all").then((data) => {
      const contactus = data.data;
      console.log(contactus);
      const phoneArray = contactus.filter(
        (element) => element.type === "phone"
      );
      const emailArray = contactus.filter(
        (element) => element.type === "email"
      );
      const locatArray = contactus.filter(
        (element) => element.type === "location"
      );
      setPhone(phoneArray);
      setEmail(emailArray);
      setLocation(locatArray);
    });
  };

  const showFormPhone = () => {
    showFormInput(true);
  };

  const handCloseForm = () => {
    showFormInput(false);
  };

  const handleSubmit = () => {
    const id = toast.loading("please wait...");
    console.log(inputs);
    axiosClient.post("admin/contact/store", inputs).then((res) => {
      if (res.data.success == true) {
        showFormInput(false);
        getContact();
        toast.update(id, {
          type: "success",
          render: res.data.mes,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
      } else {
        toast.update(id, {
          type: "error",
          render: res.data.mes,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
      }
    });
  };

  const deletePhone = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    axiosClient.delete(`/DeleteContact/${id}`).then((data) => {
      console.log(data);
      getContact();
    });
  };

  return (
    <div className="container p-5">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between gap-3 bg-blocks-color my-3 p-4">
          <h2 className="text-lg">Contacts Us</h2>
          <Button
            isLink={false}
            color={"bg-greenColor"}
            title={"add new"}
            onClickFun={() => showFormPhone()}
          />
        </div>
        {FormInput && (
          <div className="w-full">
            <motion.div
              initial="hidden"
              animate="visible"
              className="w-full pb-3 bg-blocks-color"
              exit="hidden"
              variants={variants}
              transition={{ duration: 0.5 }}
            >
              <h6 className="flex justify-between gap-y-3 p-4 border-b-[1px] border-background-color">
                <span>Insert Your Contact , Location And Email</span>
                <button onClick={handCloseForm}>
                  <AiOutlineClose />
                </button>
              </h6>
              <div className="flex flex-col gap-y-3 p-4 m-4 bg-background-color">
                <select
                  defaultValue={"1"}
                  onChange={(ev) =>
                    setInputs({ ...inputs, type: ev.target.value })
                  }
                  className="input-box w-1/2"
                  name=""
                  id=""
                >
                  <option value="1">Select your option</option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                  <option value="location">Location</option>
                </select>
                <input
                  placeholder="Title Or Name"
                  onChange={(ev) =>
                    setInputs({ ...inputs, title: ev.target.value })
                  }
                  className="input-box w-1/2"
                  type="text"
                />
                <input
                  placeholder="Content { number , email ,.... etc }"
                  onChange={(ev) =>
                    setInputs({ ...inputs, content: ev.target.value })
                  }
                  className="input-box w-1/2"
                  type="text"
                />
                <Button
                  isLink={false}
                  color={"bg-greenColor w-fit"}
                  title={"save"}
                  onClickFun={() => handleSubmit()}
                />
              </div>
            </motion.div>
          </div>
        )}
        <div className="body">
          <div className="flex flex-col gap-3 bg-blocks-color my-3 p-4">
            <h2 className="text-lg ms-2">Phone</h2>
            {phone.map((element, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-5 bg-background-color"
              >
                <span className="w-1/3">{element.title}</span>
                <span className="w-1/3">{element.content}</span>
                <Button
                  color="bg-redColor"
                  isLink={false}
                  title={"delete"}
                  onClickFun={() => {
                    deletePhone(element.id);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 bg-blocks-color my-3 p-4">
            <h2 className="text-lg ms-2">Email</h2>
            {email.map((element, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-5 bg-background-color"
              >
                <span className="w-1/3">{element.title}</span>
                <span className="w-1/3">{element.content}</span>
                <Button
                  color="bg-redColor"
                  isLink={false}
                  title={"delete"}
                  onClickFun={() => {
                    deletePhone(element.id);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 bg-blocks-color my-3 p-4">
            <h2 className="text-lg ms-2">Location</h2>
            {location.map((element, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-5 bg-background-color"
              >
                <span className="w-1/3">{element.title}</span>
                <span className="w-1/3">{element.content}</span>
                <Button
                  color="bg-redColor"
                  isLink={false}
                  title={"delete"}
                  onClickFun={() => {
                    deletePhone(element.id);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
