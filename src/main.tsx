import React from "react";
import ReactDOM from "react-dom/client";
import AllProjects from "./views/AllProjects";
import "./index.css";
import { Authenticator } from "@aws-amplify/ui-react"
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css"

import { createBrowserRouter, Link, RouterProvider } from "react-router-dom"
import Project from "./views/Project";


Amplify.configure(outputs);


function NotFound() {
  return <div>
    <h1>Oh oh! This page does not exist</h1>
    <Link to={"/"}>
      <button>Take me back</button>
    </Link>
  </div>
}

const router = createBrowserRouter([
  { path: "/", element: <AllProjects /> },
  { path: "/project/:id", element: <Project /> },
  { path: "*", element: <NotFound /> }
])


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator>
      <RouterProvider router={router} />
    </Authenticator>
  </React.StrictMode>
);
