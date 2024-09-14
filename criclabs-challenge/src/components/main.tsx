"use client";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "./breadcrumbs";
import Sidebar from "./sidebar";
import DataTable from "./datatable";
import InputForm from "./form";
import { Button, Space } from "antd";

import {
  deleteDataMapping,
  getAllDataMapping,
  getDataMappingByFilter,
} from "../lib/firebase/firestore";
import { ColumnsType } from "antd/es/table";
import Filter from "./filter";

function Main() {
  const [openNewData, setOpenNewData] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [record, setRecord] = useState<FieldType | null>(null);

  const handleOk = () => {
    setOpenNewData(false);
    fetchDataMapping();
  };

  const [dataMapping, setDataMapping] = useState<any[] | undefined>([]);

  const fetchDataMapping = async () => {
    try {
      const mappings = await getAllDataMapping();
      setDataMapping(mappings);
    } catch (error) {
      console.error("Error fetching data mappings:", error);
    }
  };

  const fetchDataByFilter = async (filter: FilterType) => {
    try {
      const dataByFilter = await getDataMappingByFilter(filter);
      setDataMapping(dataByFilter);
    } catch (error) {
      console.error("Error fetching data mappings:", error);
    }
  };

  useEffect(() => {
    fetchDataMapping();
  }, []);

  const columns: ColumnsType<FieldType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => (a.title || "").localeCompare(b.title || ""),
      showSorterTooltip: false,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) =>
        (a.description || "").localeCompare(b.description || ""),
      showSorterTooltip: false,
    },
    {
      title: "Departments",
      dataIndex: "department",
      key: "department",
      sorter: (a, b) => (a.department || "").localeCompare(b.department || ""),
      showSorterTooltip: false,
    },
    {
      title: "Data Subject Types",
      dataIndex: "dataSubjectType",
      key: "dataSubjectType",
      render: (dataSubjectType: any) => {
        return Array.isArray(dataSubjectType)
          ? dataSubjectType.join(", ")
          : dataSubjectType;
      },
      sorter: (a, b) => {
        const dataA = Array.isArray(a.dataSubjectType)
          ? a.dataSubjectType.join(", ")
          : a.dataSubjectType || "";
        const dataB = Array.isArray(b.dataSubjectType)
          ? b.dataSubjectType.join(", ")
          : b.dataSubjectType || "";
        return dataA.localeCompare(dataB);
      },
      showSorterTooltip: false,
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            style={{
              border: "none",
              background: "transparent",
              padding: 0,
              cursor: "pointer",
            }}
            onClick={() => handleEdit(record)}
            icon={<span className="material-icons">edit</span>}
          ></Button>
          <Button
            style={{
              border: "none",
              background: "transparent",
              padding: 0,
              cursor: "pointer",
            }}
            onClick={() => handleDelete(record)}
            icon={<span className="material-icons text-red-600">delete</span>}
          ></Button>
        </Space>
      ),
    },
  ];

  const handleEdit = async (e: FieldType) => {
    setRecord(e);
    setOpenNewData(true);
  };

  const handleDelete = async (record: FieldType) => {
    await deleteDataMapping(record.id);
    fetchDataMapping();
  };

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

            <div className="flex flex-row">
              <button className="btn mr-2" onClick={() => setOpenFilter(true)}>
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
                onClick={() => {
                  setOpenNewData(true);
                  setRecord(null);
                }}
              >
                <i className="material-icons w-6 h-6 mr-2">add</i>
                <span>New Data</span>
              </button>
            </div>
          </div>

          {/* Tab Data */}
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
            <DataTable columns={columns} data={dataMapping} />
          </div>

          {/* New Data Screen */}
          {openNewData && (
            <InputForm
              setOpen={setOpenNewData}
              handleOk={handleOk}
              record={record}
            />
          )}

          {/* Filter Data Screen */}
          {openFilter && (
            <Filter
              setOpenFilter={setOpenFilter}
              fetchDataByFilter={fetchDataByFilter}
              fetchDataMapping={fetchDataMapping}
            />
          )}
        </main>
      </div>
    </React.Fragment>
  );
}

export default Main;
