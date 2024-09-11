"use client";

import { deleteDataMapping } from "@/lib/firebase/firestore";
import { Table, Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";

interface Props {
  data: FieldType[];
  setRecord?: any;
  setOpen?: any;
  fetchData?: any;
}

const DataTable = ({ data, setRecord, fetchData }: Props) => {
  const columns: ColumnsType<FieldType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Departments",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Data Subject Type",
      dataIndex: "dataSubjectType",
      key: "dataSubjectType",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
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

  const handleEdit = async (record: FieldType) => {
    await setRecord(record);
    console.log("Edit record:", record);
  };

  const handleDelete = async (record: FieldType) => {
    await deleteDataMapping(record.id);
    fetchData();
    console.log("Delete record:", record);
  };

  return <Table columns={columns} dataSource={data} />;
};

export default DataTable;
