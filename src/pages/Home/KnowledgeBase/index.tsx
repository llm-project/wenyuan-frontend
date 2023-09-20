import { Button, Form, Radio, Table, Upload } from "antd";
import { useMemo, useState } from "react";
import {
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import styles from "./index.module.css";
import Modal from "antd/es/modal/Modal";

const columns = [
  {
    title: "知识库名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "更新时间",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "操作",
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
const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
  },
];

const KnowledgeBase = () => {
  const [type, setType] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const [form] = Form.useForm();

  const col = useMemo(() => {
    return columns;
  }, [type]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
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
          margin: "20px 0",
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          导入
        </Button>
        <Radio.Group
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <Radio.Button value={1}>文档</Radio.Button>
          <Radio.Button value={2}>URL</Radio.Button>
          <Radio.Button value={3}>问答对</Radio.Button>
        </Radio.Group>
      </div>
      <Table columns={col} dataSource={dataSource} />
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
          <Form.Item label="数据类型" name="type" initialValue={1} required>
            <Radio.Group>
              <Radio.Button value={1}>文档</Radio.Button>
              <Radio.Button value={2}>URL</Radio.Button>
              <Radio.Button value={3}>问答对</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="文件"
            name="file"
            valuePropName="fileList"
            getValueFromEvent={(e: any) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
            required
            rules={[{ required: true, message: "请选择上传文件" }]}
          >
            <Upload listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default KnowledgeBase;
