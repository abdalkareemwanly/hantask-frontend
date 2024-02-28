import { createContext, useContext, useState, useEffect } from "react";
import Pusher from "pusher-js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { NavigationLink } from "../router";

const StateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
  translation: null,
  setTranslation: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [translation, _setTranslation] = useState(
    JSON.parse(localStorage.getItem("TRANSLATION")) || {}
  );
  const [pusherChanel, setPusherChannel] = useState();

  useEffect(() => {
    const pusher = new Pusher("a19565747705d7f226db", {
      cluster: "eu",
      encrypted: true,
    });
    console.log(pusher);
    const channel = pusher.subscribe("hantask");
    setPusherChannel(channel);
    channel.bind("App\\Events\\PusherNotification", function (data) {
      console.log(data);
      toast.info(data?.message, {
        autoClose: false,
        onClick: () => {
          console.log(data);
        },
      });
    });

    return () => {
      channel.unbind();
      pusher.unsubscribe("notifications");
      pusher.disconnect();
    };
  }, []);
  const setToken = (newToken) => {
    _setToken(newToken);
    if (newToken) {
      localStorage.setItem("ACCESS_TOKEN", newToken);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setTranslation = (newTranslation) => {
    _setTranslation(newTranslation);
    if (newTranslation) {
      localStorage.setItem("TRANSLATION", JSON.stringify(newTranslation));
    } else {
      localStorage.removeItem("TRANSLATION");
    }
  };

  // Ensure that the user data is updated from localStorage on page load
  useEffect(() => {
    const storedToken = localStorage.getItem("ACCESS_TOKEN");
    if (storedToken) {
      _setToken(storedToken);
    }

    const storedTranslation =
      JSON.parse(localStorage.getItem("TRANSLATION")) || {};
    _setTranslation(storedTranslation);
  }, []);

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        translation,
        setTranslation,
        pusherChanel,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
