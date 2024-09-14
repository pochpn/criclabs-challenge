"use client";
import React, { useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Select, Divider } from "antd";
import { addDataMapping, updateDataMapping } from "@/lib/firebase/firestore";

interface Props {
  handleOk?: any;
  setOpen?: any;
  record?: any;
}

const { Option } = Select;

export default function InputForm({ handleOk, setOpen, record }: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        id: record?.id,
        title: record?.title,
        description: record?.description,
        department: record?.department,
        dataSubjectType: record?.dataSubjectType,
      });
    } else {
      form.resetFields();
    }
  }, [record]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (!!record) {
      await updateDataMapping(record.id, values);
    } else {
      await addDataMapping(values);
    }
    form.resetFields();
    handleOk();
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const onDepartmentChange = (value: string) => {
    if (value && form) {
      form.setFieldsValue({ department: value });
    }
  };

  const onSubjectTypeChange = (value: string) => {
    if (value && form) {
      form.setFieldsValue({ dataSubjectType: value });
    }
  };

  const onHide = () => {
    form.resetFields();
    setOpen(false);
  };
  return (
    <React.Fragment>
      <div className="fixed pt-16 md:pt-0 inset-0 bg-black bg-opacity-30 flex justify-end z-50">
        <Form
          form={form}
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="p-4 bg-white rounded-mb shadow-lg z-50 rounded-none-lg w-screen md:w-2/5 xl:w-1/5 rounded-t-xl md:rounded-none"
        >
          <div className="flex items-center justify-between">
            <div className="font-semibold">New Data</div>
            <div>
              <Button
                htmlType="reset"
                onClick={onHide}
                style={{
                  borderColor: "#FFF",
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#00935F",
                  borderColor: "#00935F",
                }}
              >
                Submit
              </Button>
            </div>
          </div>
          <Divider className="mt-4" />
          <Form.Item<FieldType>
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your Title!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Description"
            name="description"
            rules={[
              { required: false, message: "Please input your Description!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="department"
            label="Departments"
            rules={[
              { required: true, message: "Please input your Department!" },
            ]}
          >
            <Select
              placeholder="Select Department"
              onChange={onDepartmentChange}
              allowClear
            >
              <Option value="Human Resources">Human Resources</Option>
              <Option value="IT/IS">IT/IS</Option>
              <Option value="Admission">Admission</Option>
              <Option value="Marketing">Marketing</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dataSubjectType"
            label="Data Subject Types(Optional)"
            rules={[{ required: false }]}
          >
            <Select
              placeholder="Select Data Subject Types"
              onChange={onSubjectTypeChange}
              allowClear
              mode="multiple"
            >
              <Option value="Employees">Employees</Option>
              <Option value="Faculty Staff">Faculty Staff</Option>
              <Option value="Students">Students</Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
    </React.Fragment>
  );
}
