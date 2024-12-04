import { useContext } from "react";
import { Context } from "../context/context";
import { useForm } from "react-hook-form";
import axios from "axios";
function AddProject() {
  const { setAddProject, userData } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const projectData = async (data) => {
    const { title, description } = data;
    const userID = userData.userID;
    try {
      const response = await axios.post("http://localhost:8000/code/create", {
        title,
        description,
        userID,
      });
      // console.log(response);
      setAddProject(false);
    } catch (error) {
      if (error.response) console.log(error.response.data);
    }
  };
  return (
    <div
      className="bg-white
     w-[430px] text-xl rounded-lg shadow-2xl"
    >
      <form
        action=""
        className="w-full flex flex-col items-center justify-center space-y-2"
        onSubmit={handleSubmit(projectData)}
      >
        <label
          htmlFor="projectName"
          className="self-start text-2xl  font-semibold  ml-2"
        >
          Project Title
        </label>
        <input
          maxLength="40"
          type="text"
          id="projectName"
          className="w-[95%] outline-none border-none bg-[#476ce468]  rounded-md h-10 my-1 p-1"
          {...register("title", {
            required: "PLease enter title name.",
            minLength: {
              value: 5,
              message: "Enter atleast 10 characters.",
            },
            maxLength: {
              value: 40,
              message: "Title must be under 40 characters.",
            },
            pattern: {
              value: /^[A-Za-z0-9\s]+$/i,
              message: "Only letters, numbers, and spaces are allowed.",
            },
          })}
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">{errors.title.message}</p>
        )}
        <label
          htmlFor="projectDesc"
          className="self-start text-2xl  font-semibold  ml-2"
        >
          Project Description
        </label>
        <textarea
          name=""
          id="projectDesc"
          rows="6"
          className="w-[95%] outline-none border-none bg-[#476ce468] rounded-md  my-1 p-1"
          {...register("description", {
            required: "Please enter some description.",
            minLength: {
              value: 15,
              message: "Description must have 15 characters.",
            },
            pattern: {
              value: /^[A-Za-z0-9\s]+$/i,
              message: "Only letters, numbers, and spaces are allowed.",
            },
          })}
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-xs italic">
            {errors.description.message}
          </p>
        )}
        <div className="flex gap-2 w-full">
          <button
            className="flex-1 w-[50%] py-2 px-5 text-lg bg-blue-500 rounded-lg m-2 text-white font-semibold hover:bg-blue-600 active:bg-blue-700"
            type="submit"
          >
            Add Project
          </button>
          <button
            className="flex-1 w-[50%] py-2 px-5 text-lg bg-red-400 rounded-lg m-2 text-white font-semibold hover:bg-red-500 active:bg-red-700"
            type="button"
            onClick={() => setAddProject(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProject;
