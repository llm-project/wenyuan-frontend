import { Table } from "antd";

const columns = [
  {
    title: "文件名",
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
    dataIndex: "address",
    key: "address",
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
  return (
    <div className="common-table">
      <Table columns={columns} dataSource={dataSource}></Table>
    </div>
  );
};

export default KnowledgeBase;
