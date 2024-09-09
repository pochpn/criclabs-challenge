import DataMappingMain from "@/components/data-mapping/main";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <Navbar />
      <Sidebar/>

      {/* <div className="flex"> */}
        {/* <div className="flex"> */}
          {/* <Sidebar /> */}
          {/* <main className="flex-1 p-8 bg-base-200">
            <DataMappingMain/>
          </main> */}
        {/* </div> */}
      {/* </div> */}
    </React.Fragment>
  );
}
