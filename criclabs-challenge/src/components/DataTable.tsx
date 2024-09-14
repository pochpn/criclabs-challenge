"use client";

import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface Props {
  columns: ColumnsType<FieldType>;
  data?: FieldType[] | undefined;
}

const DataTable = ({ columns, data }: Props) => {
  const renderSummary = (data?: FieldType[]) => {
    const total = data?.length;
    const start = data?.length == 0 ? 0 : 1;
    const end = total;
    return `Showing ${start}-${end} of ${total} results`;
  };

  return (
    <Table
      scroll={{ x: "max-content" }}
      className="w-full z-0"
      pagination={false}
      columns={columns}
      dataSource={data}
      summary={() => (
        <Table.Summary.Row>
          <Table.Summary.Cell colSpan={columns.length} index={0}>
            <div className="text-right">{renderSummary(data)}</div>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      )}
    />
  );
};

export default DataTable;
