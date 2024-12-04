import { createContext, useState } from "react";

export const Context = createContext();
function ContextProvider({ children }) {
  const [deleteProject, setDeleteProject] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [userData, setUserData] = useState("");
  const [readData, setReadData] = useState("");
  const [deleteInfo, setDeleteInfo] = useState({
    id: "",
    title: "",
  });
  const [updateCode, setUpdateCode] = useState({
    html: "",
    css: "",
    js: "",
  });
  return (
    <Context.Provider
      value={{
        deleteProject,
        setDeleteProject,
        addProject,
        setAddProject,
        userData,
        setUserData,
        readData,
        setReadData,
        deleteInfo,
        setDeleteInfo,
        updateCode,
        setUpdateCode,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export default ContextProvider;
