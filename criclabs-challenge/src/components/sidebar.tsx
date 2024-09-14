import React from "react";

export default function Sidebar() {
  return (
    <React.Fragment>
      <nav className="bg-gray-300 text-grey-900 p-4 lg:w-64 lg:flex-shrink-0">
        <ul className="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4 overflow-x-auto no-scrollbar lg:overflow-y-auto">
          <li>
            <a href="" className="sidebar-first">
              <img
                src="/icons/menu1.svg"
                alt="menu1"
                className="w-6 h-6 mr-2"
              />
              Data Mapping
            </a>
          </li>
          <li>
            <a className="sidebar-normal">
              <i className="material-icons w-6 h-6 mr-2">account_balance</i>
              Governance Document
            </a>
          </li>
          <li>
            <a className="sidebar-normal">
              <i className="material-icons w-6 h-6 mr-2">group</i>
              Employee Awareness
            </a>
          </li>
          <li>
            <a className="sidebar-normal">
              <img
                src="/icons/menu4.svg"
                alt="menu4"
                className="w-6 h-6 mr-2"
              />
              Data Processors
            </a>
          </li>
          <li>
            <a className="sidebar-normal">
              <img
                src="/icons/menu5.svg"
                alt="menu5"
                className="w-6 h-6 mr-2"
              />
              Subject Access Request
            </a>
          </li>
          <li>
            <a className="sidebar-normal">
              <img
                src="/icons/menu6.svg"
                alt="menu6"
                className="w-6 h-6 mr-2"
              />
              Data breach register
            </a>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
}
