import { useParams } from "react-router-dom";
import EditorNavbar from "../components/editorNavbar";
import EditorBody from "../components/editorBody";

function CodeEditor() {
  const { codeID, title } = useParams();
  return (
    <div className="flex flex-col h-[100dvh]">
      <EditorNavbar title={title} id={codeID} />
      <div className="grow bg-[#050a22]">
        <EditorBody id={codeID} title={title} />
      </div>
    </div>
  );
}
export default CodeEditor;
