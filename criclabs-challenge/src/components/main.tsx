"use client";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "./breadcrumbs";
import Sidebar from "./sidebar";
import DataTable from "./DataTable";
import InputForm from "./form";
import { Modal } from "antd";

import { getAllDataMapping } from "../lib/firebase/firestore";

function Main() {
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (record) {
      setOpen(true);
    }
  }, [record]);

  const handleOk = () => {
    setConfirmLoading(true);
    setOpen(false);
    fetchData();
    setConfirmLoading(false);
  };

  const [dataMapping, setDataMapping] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const mappings = await getAllDataMapping();
      console.log(mappings);
      setDataMapping(mappings);
    } catch (error) {
      console.error("Error fetching data mappings:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <main className="flex-1 p-8 bg-gray-200">
          <Breadcrumbs />
          <div className="flex flex-col md:flex-row md:justify-between lg:flex-row lg:justify-between mb-5">
            {/* Header Title */}
            <h1 className="text-2xl font-semibold text-gray-900 justify-items-start">
              Data Mapping
            </h1>

            {/* Buttons */}
            <div className="flex flex-row">
              <button className="btn mr-2">
                <i className="material-icons w-6 h-6 md:mr-2 lg:mr-2">
                  filter_list
                </i>
                <span className="hidden sm:inline">Filter</span>
              </button>
              <button className="btn mr-2">
                <i className="material-icons w-6 h-6 md:mr-2 lg:mr-2">
                  download
                </i>
                <span className="hidden sm:inline">Export</span>
              </button>
              <button className="btn mr-2">
                <i className="material-icons w-6 h-6 md:mr-2 lg:mr-2 ">
                  upload
                </i>
                <span className="hidden sm:inline">Import</span>
              </button>
              <button
                className="btn  btn-success text-white"
                onClick={() => setOpen(true)}
              >
                <i className="material-icons w-6 h-6 mr-2">add</i>
                <span>New Data</span>
              </button>
            </div>
          </div>

          <div role="tablist" className="tabs tabs-bordered mb-5">
            <a role="tab" className="tab tab-active">
              Data Mapping
            </a>
            <a role="tab" className="tab">
              Collection Sources
            </a>
          </div>

          <div className="mb-4">
            <button className="btn border-green-600 text-green-600 btn-sm sm:btn-sm md:btn-md lg:btn-md font-normal mr-2">
              <i className="material-icons w-6 h-6">edit</i>
              Edit
            </button>
            <button className="btn btn-sm sm:btn-sm md:btn-md lg:btn-md font-normal ">
              <i className="material-icons w-6 h-6">visibility</i>
              Visualize
            </button>
          </div>
          <div>
            <DataTable
              data={dataMapping}
              setRecord={setRecord}
              setOpen={setOpen}
              fetchData={fetchData}
            />
          </div>
          <Modal
            open={open}
            confirmLoading={confirmLoading}
            footer={null}
            closable={false}
          >
            <InputForm setOpen={setOpen} handleOk={handleOk} record={record} />
          </Modal>
        </main>
      </div>
    </React.Fragment>
  );
}

export default Main;
