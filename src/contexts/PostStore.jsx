import { createContext, useContext, useState } from "react";

const PostStore = createContext();

export const PostStoreProvider = ({ children }) => {
  const [postStoreData, setPostStoreData] = useState();

  return (
    <PostStore.Provider
      value={{
        postStoreData,
        setPostStoreData,
      }}
    >
      {children}
    </PostStore.Provider>
  );
};
export const usePostStore = () => useContext(PostStore);
