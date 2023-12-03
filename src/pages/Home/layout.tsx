import React, { useState } from "react";
import {
  RobotOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Menu } from "antd";
import { Link, KeepAliveOutlet, useLocation } from "ice";
import icon from "@/assets/icon.png";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label: <Link to={`/${key}`}>{label}</Link>,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  // getItem("对话测试", "Home", <PieChartOutlined />),
  getItem("知识库管理", "Home/KnowledgeBase", <DesktopOutlined />),
  getItem("机器人配置", "Home/RobotManage", <RobotOutlined />),
  // getItem("测试记录", "Home/TestRecord", <MailOutlined />),
];

const Header = () => {
  const info = useLocation();

  (info as any).title = "对话测试";
  return (
    <Breadcrumb
      items={[info]}
      // params={info.pathname}
      style={{
        margin: "10px 20px",
        padding: 10,
        background: "white",
      }}
    />
  );
};

const App: React.FC = () => {
  const info = useLocation();
  return (
    <div style={{ height: "100%", display: "flex" }}>
      <div style={{ height: "100%", width: 200 }}>
        <div
          style={{
            textAlign: "center",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            padding: "10px 0",
          }}
        >
          <img src={icon} width={120} />
        </div>
        <Menu
          defaultSelectedKeys={[info.pathname.slice(1)]}
          mode="inline"
          items={items}
        />
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, #f5f4f6, #e6ebf7)",
        }}
      >
        <KeepAliveOutlet />
      </div>
    </div>
  );
};

export default App;
