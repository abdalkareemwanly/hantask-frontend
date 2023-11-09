import { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  setUser: () => { },
  setToken: () => { },
  setNotification: () => { },
  translation: null,
  setTranslation: () => { }
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [translation, _setTranslation] = useState(JSON.parse(localStorage.getItem('TRANSLATION')) || {});
  const [notification, _setNotification] = useState('');

  const setToken = (newToken) => {
    _setToken(newToken);
    if (newToken) {
      localStorage.setItem('ACCESS_TOKEN', newToken);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  };

  const setTranslation = (newTranslation) => {
    _setTranslation(newTranslation);
    if (newTranslation) {
      localStorage.setItem('TRANSLATION', JSON.stringify(newTranslation));
    } else {
      localStorage.removeItem('TRANSLATION');
    }
  };

  const setNotification = (message) => {
    _setNotification(message);
  };

  // Ensure that the user data is updated from localStorage on page load
  useEffect(() => {
    const storedToken = localStorage.getItem('ACCESS_TOKEN');
    if (storedToken) {
      _setToken(storedToken);
    }

    const storedTranslation = JSON.parse(localStorage.getItem('TRANSLATION')) || {};
    _setTranslation(storedTranslation);
  }, []);

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        notification,
        setNotification,
        translation,
        setTranslation
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
