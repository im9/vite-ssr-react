import React from "react";
import App from "./App";

export { Page };

function Page() {
  return (
    <>
      <h1>Welcome</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <App />
        </li>
      </ul>
    </>
  );
}
