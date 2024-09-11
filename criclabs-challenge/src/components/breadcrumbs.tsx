import React from "react";

function Breadcrumbs() {
  return (
    <React.Fragment>
      <nav className="flex items-center text-gray-400 text-sm mb-4">
        <i className="material-icons text-gray-500 mr-1">home</i>
        <span className="mx-2">/</span>
        <span>Current Page</span>
      </nav>
    </React.Fragment>
  );
}

export default Breadcrumbs;
