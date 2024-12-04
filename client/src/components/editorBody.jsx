import Editor from "@monaco-editor/react";
import { useState, useEffect, useContext } from "react";
import { Context } from "../context/context";
import axios from "axios";
function EditorBody({ id }) {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [code, setCode] = useState("");
  const { setUpdateCode } = useContext(Context);
  useEffect(() => {
    const completeCode = setTimeout(() => {
      setSrcDoc(`
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Code Download</title>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
      </html>
      `);
      setUpdateCode({ html: html, css: css, js: js });
      return () => clearTimeout(completeCode);
    }, 250);
  }, [html, css, js]);
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/code/single/${id}`
        );
        setCode(response.data.data);
      } catch (error) {
        if (error.response) console.log(error.response);
      }
    };
    fetchProject();
    return () => fetchProject();
  }, [id]);
  console.log(code);
  return (
    <main className="flex flex-col h-full  px-2">
      <div className="w-full flex items-center justify-center gap-2 pt-1">
        <div className="flex-1">
          <div className="text-white">HTML</div>
          <Editor
            language="html"
            theme="vs-dark"
            height={"40vh"}
            value={code.html}
            onChange={(value) => setHtml(value)}
          />
        </div>

        <div className="flex-1">
          <div className="text-white">CSS</div>
          <Editor
            language="css"
            theme="vs-dark"
            height={"40vh"}
            value={code.css}
            onChange={(value) => setCss(value)}
          />
        </div>
        <div className="flex-1">
          <div className="text-white">JavaScript</div>
          <Editor
            language="javascript"
            theme="vs-dark"
            height={"40vh"}
            value={code.js}
            onChange={(value) => setJs(value)}
          />
        </div>
      </div>
      <iframe
        className="grow w-full  bg-white mt-2 text-black text-lg"
        srcDoc={srcDoc}
        title="Output"
        sandbox="allow-scripts"
        frameBorder="0"
      ></iframe>
    </main>
  );
}
export default EditorBody;
