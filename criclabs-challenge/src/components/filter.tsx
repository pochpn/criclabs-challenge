"use client";
import { departmentCheckbox, subjectTypeCheckbox } from "@/model/OptionData";
import { Button, Checkbox, Divider, Form, FormProps, Input } from "antd";
import React, { useEffect, useState } from "react";

interface Props {
  setOpenFilter: any;
  fetchDataByFilter: any;
  fetchDataMapping: any;
}

const CheckboxGroup = Checkbox.Group;

function Filter({ setOpenFilter, fetchDataByFilter, fetchDataMapping }: Props) {
  const [form] = Form.useForm();

  const [departmentList, setDepartmentList] = useState<string[]>([]);
  const [dataSubjectTypeList, setDataSubjectTypeList] = useState<string[]>([]);

  useEffect(() => {
    const savedFormData = localStorage.getItem("filterForm");
    if (savedFormData) {
      form.setFieldsValue(JSON.parse(savedFormData));
    }
  }, [form]);

  const onHide = () => {
    localStorage.removeItem("filterForm");
    fetchDataMapping();
    setOpenFilter(false);
  };

  const onFinish: FormProps<FilterType>["onFinish"] = (values) => {
    localStorage.setItem("filterForm", JSON.stringify(values));
    fetchDataByFilter(values);
    setOpenFilter(false);
  };

  const onFinishFailed: FormProps<FilterType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
    setOpenFilter(false);
  };

  const onDepartmentChange = (list: any) => {
    setDepartmentList(list);
    form.setFieldsValue({ department: list });
  };

  const onDataSubjectTypeChange = (list: any) => {
    setDataSubjectTypeList(list);
    form.setFieldsValue({ dataSubjectType: list });
  };

  return (
    <React.Fragment>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
        <Form
          form={form}
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="p-4 bg-white rounded-mb shadow-lg z-50 rounded-none-lg w-screen md:w-2/5 xl:w-1/5"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-row">
              <i className="material-icons w-3 h-3 mr-4">filter_list</i>
              <div className="font-semibold">Filter</div>
            </div>

            <div>
              <Button
                htmlType="reset"
                onClick={onHide}
                style={{
                  borderColor: "#FFF",
                }}
              >
                Reset
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#00935F",
                  borderColor: "#00935F",
                }}
              >
                Apply Filter
              </Button>
            </div>
          </div>

          <Divider className="mt-4 mb-2" />
          <Form.Item name="title" className="mb-0">
            <Input
              prefix={
                <i className="material-icons w-6 h-6 md:mr-2 lg:mr-2 text-gray-400">
                  search
                </i>
              }
              placeholder="Search filter"
              style={{
                border: "none",
                boxShadow: "none",
              }}
            />
          </Form.Item>

          <Divider className="mt-2 mb-4" />
          <div className="text-sm font-semibold text-gray-400 mb-2">
            DEPARTMENT
          </div>

          <Form.Item<FilterType>
            name="department"
            initialValue={departmentList}
          >
            <CheckboxGroup
              options={departmentCheckbox}
              value={departmentList}
              onChange={onDepartmentChange}
              className="flex flex-col"
            />
          </Form.Item>

          <div className="text-sm font-semibold text-gray-400 mb-2">
            DATA SUBJECT TYPE
          </div>

          <Form.Item<FilterType>
            name="dataSubjectType"
            initialValue={dataSubjectTypeList}
          >
            <CheckboxGroup
              options={subjectTypeCheckbox}
              value={dataSubjectTypeList}
              onChange={onDataSubjectTypeChange}
              className="flex flex-col"
            />
          </Form.Item>
        </Form>
      </div>
    </React.Fragment>
  );
}

export default Filter;
