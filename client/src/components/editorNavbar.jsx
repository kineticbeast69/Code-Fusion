import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../context/context";
import axios from "axios";

function EditorNavbar({ title, id }) {
  const navigate = useNavigate();
  const { updateCode } = useContext(Context);
  const [error, setError] = useState({ event: false, message: "" });
  const savecode = async () => {
    const html = updateCode.html;
    const css = updateCode.css;
    const js = updateCode.js;
    try {
      const response = await axios.put("http://localhost:8000/code/update", {
        id,
        html,
        css,
        js,
      });
      setError({ event: true, message: response.data.message });
    } catch (error) {
      if (error.response) {
        setError({ event: true, message: error.response.data.message });
      }
    }
  };
  return (
    <header>
      <nav className="bg-[#122976] text-white px-5 md:px-8 lg:px-10 py-2">
        <ul className="flex justify-between items-center">
          <li
            className="flex items-center justify-center gap-2"
            onClick={() => navigate("/home")}
          >
            <img src="../images/code.png" alt="" className="w-[35px]" />
            <h1 className="text-2xl font-semibold">
              Code <span className="font-bold text-blue-300 ">Fusion</span>
            </h1>
          </li>
          <li>
            <h1 className="text-xl  text-black">
              Project /{" "}
              <span className="font-semibold text-lg text-white underline underline-offset-2">
                {title || "Project title"}
              </span>
            </h1>
          </li>
          <li className="bg-[#1d3fb3] p-2 flex items-center justify-center gap-3 border-none outline-none rounded-lg hover:bg-[#345fda] active:bg-blue-600 focus:ring-2 focus:ring-blue-500">
            <button
              type="button"
              className="text-xl font-semibold px-3"
              onClick={() => savecode()}
            >
              Save
            </button>
          </li>
        </ul>
      </nav>
      {error.event ? (
        <div className="text-center py-2 text-lg">{error.message}</div>
      ) : (
        ""
      )}
    </header>
  );
}
export default EditorNavbar;
