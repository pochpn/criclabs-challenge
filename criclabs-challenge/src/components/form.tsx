"use client";
import React, { useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Select } from "antd";
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
    console.log(record);
    if (record) {
      console.log("set filed", record.id);
      form.setFieldsValue({
        id: record?.id,
        title: record?.title,
        description: record?.description,
        department: record?.department,
        dataSubjectType: record?.dataSubjectType,
      });
    }
  }, [record]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log(values);
    if (!!record) {
      await updateDataMapping(record.id, values);
      console.log("Update Success:", values);
    } else {
      await addDataMapping(values);
      console.log("Add Success:", values);
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
      console.log(form.getFieldsValue());
    }
  };

  const onSubjectTypeChange = (value: string) => {
    if (value && form) {
      form.setFieldsValue({ dataSubjectType: value });
      console.log(form.getFieldsValue());
    }
  };

  const onHide = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
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
          rules={[{ required: true, message: "Please input your Department!" }]}
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
          label="Data Subject Type"
          rules={[{ required: false }]}
        >
          <Select
            placeholder="Select Data Subject Type"
            onChange={onSubjectTypeChange}
            allowClear
          >
            <Option value="Employees">Employees</Option>
            <Option value="Faculty Staff">Faculty Staff</Option>
            <Option value="Students">Students</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className="mr-4">
            Submit
          </Button>
          <Button htmlType="reset" onClick={onHide}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
}
