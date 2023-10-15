import { Button, Form, Input, Radio, Table, Upload } from "antd";
import { useMemo, useState } from "react";
import {
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import styles from "./index.module.css";
import Modal from "antd/es/modal/Modal";
import { Link } from "@ice/runtime";

const columns: any = [
  {
    title: "知识库名",
    dataIndex: "name",
    key: "name",
    width: 200,
    render: (val, record) => {
      console.log(val, record);
      return (
        <Link to={`/Home/KnowledgeBase/detail?id=${record.key}`}>{val}</Link>
      );
    },
  },
  {
    title: "更新时间",
    dataIndex: "updateDate",
    key: "updateDate",
  },
  {
    title: "操作",
    align: "center",
    width: 200,
    render: (record) => {
      console.log(record);
      return (
        <div className={styles["table-action"]}>
          <DownloadOutlined />
          <DeleteOutlined />
        </div>
      );
    },
  },
];

let dataSource = [
  {
    key: 1,
    name: "胡彦斌",
    updateDate: 32,
  },
  {
    key: 2,
    name: "胡彦祖",
    updateDate: 42,
  },
];

const KnowledgeBase = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [form] = Form.useForm();
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        dataSource = [
          ...dataSource,
          {
            key: Date.now(),
            updateDate: Date(),
            ...values,
          },
        ];
        setIsOpen(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="common-table">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          新建知识库
        </Button>
      </div>
      <Table columns={columns} dataSource={dataSource} />
      <Modal
        title="导入文件"
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
        }}
        okText="确认导入"
        cancelText="取消"
        onOk={handleSubmit}
      >
        <Form
          form={form}
          style={{ marginTop: 20 }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 10 }}
          scrollToFirstError
        >
          <Form.Item label="知识库名称" name="name" required>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default KnowledgeBase;
