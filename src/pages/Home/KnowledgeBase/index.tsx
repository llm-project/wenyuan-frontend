import {
  Button,
  Form,
  Input,
  Popconfirm,
  Radio,
  Table,
  Tooltip,
  Upload,
} from "antd";
import { useMemo, useState } from "react";
import {
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined,
  EditOutlined,
  SendOutlined,
} from "@ant-design/icons";
import styles from "./index.module.css";
import Modal from "antd/es/modal/Modal";
import { Link, history } from "@ice/runtime";
import { useRequest } from "ahooks";
import {
  createKnowledge,
  deleteKnowledge,
  getKnowledgeList,
} from "@/services/modules/knowledge";

const columns: any = [
  {
    title: "知识库名",
    dataIndex: "name",
    key: "name",
    width: 200,
    render: (val, record) => {
      return (
        <Link to={`/Home/KnowledgeBase/detail`} state={record}>
          {val}
        </Link>
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
      return (
        <div className={styles["table-action"]}>
          <Tooltip title="对话测试">
            <SendOutlined
              onClick={() => {
                history.push("/Home/Chat", {
                  name: record.name,
                });
              }}
            />
          </Tooltip>
          {/* <DownloadOutlined /> */}
          <Popconfirm
            title="确定要删除该知识库吗？"
            onConfirm={async () => {
              await deleteKnowledge({
                name: record.name,
              });
            }}
          >
            <DeleteOutlined />
          </Popconfirm>
        </div>
      );
    },
  },
];

const KnowledgeBase = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [form] = Form.useForm();

  const { data, loading, refresh } = useRequest(async () => {
    const data = await getKnowledgeList();
    return data;
  });

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        await createKnowledge(values.name);
        refresh();
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
      <Table columns={columns} dataSource={data} loading={loading} />
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
