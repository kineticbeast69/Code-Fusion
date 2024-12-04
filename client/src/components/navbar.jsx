import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import Avatar from "react-avatar";
import { useState } from "react";
import { Context } from "../context/context";
import { useContext } from "react";
function Navbar() {
  const { setAddProject, userData } = useContext(Context);
  const [profile, setProfile] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();
  const destoryToken = () => {
    const token = localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="w-full h-fit flex justify-between items-center px-5 md:px-8 lg:px-5 py-2 bg-[#122976] text-white">
      <div className="left flex justify-center items-center gap-2">
        <img
          src="../images/code.png"
          alt="company logo"
          className="w-[60px]"
          onClick={() => navigate("/home")}
        />
        <div>
          <h1 className="text-2xl font-semibold">
            Code <span className="font-bold text-blue-300 ">Fusion</span>
          </h1>
        </div>
      </div>
      <div className="right flex justify-center items-center gap-2">
        <div>
          {" "}
          <input
            type="search"
            placeholder="Search..."
            className="w-80 h-auto p-2 rounded-lg border-none outline-none bg-white text-black shadow-lg "
          />
        </div>
        <div className="relative">
          <FiPlus
            className="bg-[#1d3fb3] p-1 border-none outline-none rounded-lg hover:bg-[#345fda] focus:ring-2 focus:ring-blue-500"
            color="white"
            size={37}
            title="Add item"
            onMouseEnter={() => setShowAdd(true)}
            onMouseLeave={() => setShowAdd(false)}
            onClick={() => setAddProject(true)}
          />

          {showAdd ? (
            <div className=" p-1 px-3 border border-black bg-white text-black rounded-md absolute right-2 top-11 text-sm">
              Add Project
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="relative">
          <Avatar
            name={userData.username || "username"}
            size="50"
            round={true}
            onClick={() => setProfile((prev) => !prev)}
          />
          {profile ? (
            <div className="w-[150px] h-fit space-y-3 outline-none shadow-lg rounded-md bg-white text-black absolute right-5 m-1 p-1">
              <div className="w-full pl-2 font-sans text-lg">
                {userData.username || "Username"}
              </div>
              <div
                className="w-full pl-2 font-sans text-lg"
                onClick={() => destoryToken()}
              >
                Logout
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
export default Navbar;
