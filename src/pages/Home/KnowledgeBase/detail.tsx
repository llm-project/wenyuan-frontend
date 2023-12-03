import {
  Breadcrumb,
  Button,
  Form,
  Popconfirm,
  Radio,
  Table,
  Tooltip,
  Upload,
  message,
} from "antd";
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
import { Link, useLocation, history } from "ice";
import { useRequest } from "ahooks";
import {
  deleteDoc,
  downloadDoc,
  getDocList,
  uploadDoc,
} from "@/services/modules/knowledge";

const getColumns = (context) => [
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
      return (
        <div className={styles["table-action"]}>
          <Tooltip title="更新">
            <RedoOutlined />
          </Tooltip>
          <Tooltip title="下载">
            <DownloadOutlined
              onClick={async () => {
                const res = await downloadDoc({
                  file_name: record.name,
                  knowledge_base_name: record.knowledgeBaseName,
                });
              }}
            />
          </Tooltip>
          <Popconfirm
            title="确定删除吗？"
            onConfirm={async () => {
              await deleteDoc({
                doc_name: record.name,
                knowledge_base_name: record.knowledgeBaseName,
                delete_content: true,
              });
              // if (res.code === 200) {
              message.success("删除成功");
              context.refresh();
              // } else {
              //   message.error("删除失败");
              // }
            }}
          >
            <Tooltip title="删除">
              <DeleteOutlined />
            </Tooltip>
          </Popconfirm>
        </div>
      );
    },
  },
];
// const urlCol = [
//   {
//     title: "URL",
//     dataIndex: "name",
//     key: "name",
//   },
//   {
//     title: "网站备注",
//     dataIndex: "age",
//     key: "age",
//   },
//   {
//     title: "导入时间",
//     dataIndex: "age",
//     key: "age",
//   },
//   {
//     title: "更新时间",
//     dataIndex: "age",
//     key: "age",
//   },
//   {
//     title: "操作",
//     align: "center",
//     width: 200,
//     render: (record) => {
//       console.log(record);
//       return (
//         <div className={styles["table-action"]}>
//           <Tooltip title="更新">
//             <RedoOutlined />
//           </Tooltip>
//           <Tooltip title="删除">
//             <DeleteOutlined />
//           </Tooltip>
//         </div>
//       );
//     },
//   },
// ];
// const reqCol = [
//   {
//     title: "问题",
//     dataIndex: "name",
//     key: "name",
//   },
//   {
//     title: "答案",
//     dataIndex: "age",
//     key: "age",
//   },
//   {
//     title: "更新时间",
//     dataIndex: "age",
//     key: "age",
//   },
//   {
//     title: "操作",
//     align: "center",
//     width: 200,
//     render: (record) => {
//       console.log(record);
//       return (
//         <div className={styles["table-action"]}>
//           <Tooltip title="编辑">
//             <EditOutlined />
//           </Tooltip>
//           <Tooltip title="删除">
//             <DeleteOutlined />
//           </Tooltip>
//         </div>
//       );
//     },
//   },
// ];

// const colMap: any[] = [null, columns, urlCol, reqCol];

const KnowledgeBase = () => {
  const location = useLocation();
  const [type, setType] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const [form] = Form.useForm();

  const name = location.state?.name;

  const [formItems, setFormItems] = useState(null);

  const { data, loading, refresh } = useRequest(
    async () => {
      const res = await getDocList(name);
      return res;
    },
    {
      refreshDeps: [name],
    }
  );

  const col = useMemo(() => {
    return getColumns({
      refresh,
      knowledgeBaseName: name,
    });
  }, [refresh, name]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        const reader = new FileReader();
        var formData = new FormData(); // 创建FormData对象
        formData.append("file", values.file[0].originFileObj); // 将文件添加到FormData对象中

        await uploadDoc({
          file: values.file[0].originFileObj,
          knowledge_base_name: name,
        });
        setIsOpen(false);
        message.success("上传成功");
        refresh();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const Header = React.useMemo(() => {
    if (type === 3) {
      return (
        <div className={styles.header}>
          <div>
            <div>{name}</div>
          </div>
          <div>
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
        </div>
      );
    } else {
      return (
        <>
          <Breadcrumb
            items={[
              { title: <Link to="/Home/KnowledgeBase">知识库管理</Link> },
              {
                title: name,
              },
            ]}
          />
          <div>
            <Button
              onClick={() => {
                history.push("/Home/Chat", {
                  name,
                });
              }}
            >
              对话测试
            </Button>
            <Button
              style={{
                marginLeft: 20,
              }}
              type="primary"
              onClick={() => {
                setFormItems(type === 1 ? UploadFile : UploadUrl);
                setIsOpen(true);
              }}
            >
              导入
            </Button>
          </div>
        </>
      );
    }
  }, [type, name]);

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
        {/* <Radio.Group
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <Radio.Button value={1}>文档</Radio.Button>
          <Radio.Button value={2}>URL</Radio.Button>
          <Radio.Button value={3}>问答对</Radio.Button>
        </Radio.Group> */}
      </div>
      <Table
        rowKey="name"
        columns={col as any}
        dataSource={data}
        loading={loading}
      />
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
