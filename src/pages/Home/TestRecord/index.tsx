import { Popconfirm, Table, Tooltip } from "antd";
import { DownloadOutlined, DeleteOutlined } from "@ant-design/icons";

const columns: any = [
  {
    title: "测试名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "测试时间",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "结束时间",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "满意率",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "差评率",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "不予置评率",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "操作",
    key: "action",
    align: "center",
    width: 100,
    render: () => {
      return (
        <span>
          <Tooltip title="下载">
            <DownloadOutlined />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm title="确定删除吗">
              <DeleteOutlined style={{ marginLeft: 10 }} />
            </Popconfirm>
          </Tooltip>
        </span>
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

const TestRecord = () => {
  return (
    <div className="common-table">
      <Table columns={columns} dataSource={dataSource}></Table>
    </div>
  );
};

export default TestRecord;
