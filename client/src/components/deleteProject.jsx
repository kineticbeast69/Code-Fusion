import { RxCross1 } from "react-icons/rx";
import { GoCodespaces } from "react-icons/go";
import { useState } from "react";
import { Context } from "../context/context";
import { useContext } from "react";
import axios from "axios";
function DeletProject() {
  const [show, setShow] = useState(false);
  const { setDeleteProject, userData, deleteInfo } = useContext(Context);
  const [match, setMatch] = useState("");
  const deleteDetail = `${userData.username}/${deleteInfo.title}`;
  const deleteData = async (id = deleteInfo.id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/code/delete/${id}`
      );
      console.log(response.data);
      setDeleteProject(false);
    } catch (error) {
      if (error.response) console.log(error.response.data);
    }
  };
  return (
    <div className=" bg-white w-[530px] text-xl rounded-lg shadow-2xl">
      <div className="flex items-center justify-between py-2  px-2">
        <span className="text-lg">
          Delete/{userData.username || "Username"}/Project-
          {deleteInfo.title || "Project Title"}
        </span>
        <span
          className="p-2 hover:bg-slate-300 active:bg-slate-400 rounded-md"
          onClick={() => setDeleteProject(false)}
        >
          <RxCross1 size={27} />
        </span>
      </div>
      <div className="h-[0.7px] bg-slate-600" />
      <div className="flex flex-col items-center justify-center">
        <span className="my-5">
          <GoCodespaces size={40} color="gray" />
        </span>
        <h1 className="text-2xl font-mono mt-1 mb-4">
          {userData.username || "Username"}/
          {deleteInfo.title || "Project tilte"}
        </h1>
      </div>
      <div className="h-[0.7px] bg-slate-600" />
      <div className="w-full flex flex-col items-center justify-center my-2">
        {!show ? (
          <button
            className="w-[95%] py-2 px-5 bg-red-400 text-black hover:bg-red-500 active:bg-red-600 rounded-lg"
            onClick={() => setShow(true)}
          >
            I want to delete this Project
          </button>
        ) : (
          ""
        )}
        {show ? (
          <>
            <span className="text-lg my-2">
              To delete type "{deleteDetail}" in th box below.
            </span>
            <input
              type="text"
              className="w-[95%] border-2 border-red-500 outline-none rounded-md my-2 p-1"
              onChange={(e) => setMatch(e.target.value)}
            />
            {match == deleteDetail ? (
              <button
                className="w-[95%] py-2 px-5 bg-red-400 text-black active:bg-red-600 rounded-lg my-2"
                onClick={() => deleteData()}
                type="button"
              >
                Delete this project
              </button>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default DeletProject;
