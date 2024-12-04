import { MdDeleteForever } from "react-icons/md";
import { useContext } from "react";
import { Context } from "../context/context";
import { useNavigate } from "react-router-dom";
function ListItem({ data }) {
  const navigate = useNavigate();
  const { setDeleteProject, setDeleteInfo } = useContext(Context);
  return (
    <div className="w-[70%] h-fit bg-[#5479f13f] hover:bg-[#476ce468] hover:scale-[1.05] py-2 px-3 rounded-md transition-all flex justify-between items-center my-2 cursor-pointer">
      <div
        className="flex items-center justify-center gap-3"
        onClick={() => navigate(`/code/${data._id}/${data.title}`)}
      >
        <img src="../images/codelist.png" alt="" className="w-[50px]" />
        <div>
          <h1 className="text-2xl font-semibold text-white">{data.title}</h1>
          <p className="text-sm text-slate-300">{data.description}</p>
        </div>
      </div>
      <div>
        <MdDeleteForever
          size={44}
          onClick={() => {
            setDeleteProject(true);
            setDeleteInfo({
              id: data._id,
              title: data.title,
            });
          }}
        />
      </div>
    </div>
  );
}
export default ListItem;
