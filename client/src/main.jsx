import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Signup from "./pages/signup.jsx";
import HomePage from "./pages/home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CodeEditor from "./pages/codeEditor.jsx";
import ContextProvider from "./context/context.jsx";
const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/code/:codeID/:title",
    element: <CodeEditor />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={route} />
    </ContextProvider>
  </StrictMode>
);
