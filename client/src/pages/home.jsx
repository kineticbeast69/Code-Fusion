import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ListItem from "../components/listItem";
import DeletProject from "../components/deleteProject";
import AddProject from "../components/addProject";
import Loading from "../components/loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/context";
import { useContext, useEffect } from "react";
function HomePage() {
  const navigate = useNavigate();
  const {
    deleteProject,
    addProject,
    userData,
    setUserData,
    readData,
    setReadData,
  } = useContext(Context);
  const checkUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // console.log("token is dleted");
      // navigate("/");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/auth/valid", {
        token,
      });
      setUserData(response.data.decoded);
    } catch (error) {
      // navigate("/");
      console.log(error);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  useEffect(() => {
    if (!userData.userID) return; // Prevent running the effect without a valid userID
    const projectData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/code/read/${userData.userID}`
        );
        setReadData(response.data.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
        }
      }
    };

    return () => projectData();
  }, [userData.userID, readData]);
  console.log(readData);
  return (
    <div className="flex flex-col h-[100dvh] relative">
      <div className="">
        <Navbar />
      </div>
      <div className="grow bg-[#040920] overflow-y-scroll flex flex-col items-center py-2 px-6 text-white">
        {readData == "" ? (
          <Loading />
        ) : (
          readData.map((item, index) => <ListItem key={index} data={item} />)
        )}
      </div>
      <div>
        <Footer />
      </div>
      {addProject ? (
        <div className="absolute inset-0 flex justify-center items-center">
          <AddProject />
        </div>
      ) : (
        ""
      )}

      {deleteProject == true ? (
        <div className="absolute inset-0 flex justify-center items-center">
          <DeletProject />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default HomePage;
