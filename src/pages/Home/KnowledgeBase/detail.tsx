import { Button, Form, Radio, Table, Tooltip, Upload } from "antd";
import React, { useMemo, useState } from "react";
import {
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined,
  EditOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import styles from "./index.module.css";
import Modal from "antd/es/modal/Modal";
import UploadFile from "@/components/forms/UploadFile";
import UploadUrl from "@/components/forms/UploadUrl";
import AddQAPairs from "@/components/forms/AddQAPairs";

const columns = [
  {
    title: "文件名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "文件大小",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "上传时间",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "状态",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "操作",
    align: "center",
    width: 200,
    render: (record) => {
      console.log(record);
      return (
        <div className={styles["table-action"]}>
          <Tooltip title="下载">
            <DownloadOutlined />
          </Tooltip>
          <Tooltip title="删除">
            <DeleteOutlined />
          </Tooltip>
        </div>
      );
    },
  },
];
const urlCol = [
  {
    title: "URL",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "网站备注",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "导入时间",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "更新时间",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "操作",
    align: "center",
    width: 200,
    render: (record) => {
      console.log(record);
      return (
        <div className={styles["table-action"]}>
          <Tooltip title="更新">
            <RedoOutlined />
          </Tooltip>
          <Tooltip title="删除">
            <DeleteOutlined />
          </Tooltip>
        </div>
      );
    },
  },
];
const reqCol = [
  {
    title: "问题",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "答案",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "更新时间",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "操作",
    align: "center",
    width: 200,
    render: (record) => {
      console.log(record);
      return (
        <div className={styles["table-action"]}>
          <Tooltip title="编辑">
            <EditOutlined />
          </Tooltip>
          <Tooltip title="删除">
            <DeleteOutlined />
          </Tooltip>
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

const colMap: any[] = [null, columns, urlCol, reqCol];

const KnowledgeBase = () => {
  const [type, setType] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const [form] = Form.useForm();

  const [formItems, setFormItems] = useState(null);

  const col = useMemo(() => {
    return colMap[type];
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

  const Header = React.useMemo(() => {
    if (type === 3) {
      return (
        <div className={styles.header}>
          <Button
            type="primary"
            onClick={() => {
              setFormItems(AddQAPairs);
              setIsOpen(true);
            }}
          >
            添加问答对
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setFormItems(UploadFile);
              setIsOpen(true);
            }}
          >
            批量导入
          </Button>

          <Button
            type="primary"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            批量导出
          </Button>
        </div>
      );
    } else {
      return (
        <Button
          type="primary"
          onClick={() => {
            setFormItems(type === 1 ? UploadFile : UploadUrl);
            setIsOpen(true);
          }}
        >
          导入
        </Button>
      );
    }
  }, [type]);

  return (
    <div className="common-table">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        {Header}
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
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          scrollToFirstError
        >
          {formItems}
        </Form>
      </Modal>
    </div>
  );
};

export default KnowledgeBase;
