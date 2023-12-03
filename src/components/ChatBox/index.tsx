import { Avatar, Spin } from "antd";
import React from "react";
import {
  UserOutlined,
  LikeOutlined,
  DislikeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import styles from "./index.module.css";
import chatContext from "@/contexts/chatContext";
import icon from "@/assets/little-icon.png";
import Modal from "antd/es/modal/Modal";

interface IProps {}

const ChatItem = (props) => {
  const { id, req, res, isDone } = props;
  const { onSelect, selectId } = React.useContext(chatContext);

  const flowToBottom = () => {
    var target: any = document.getElementById(styles.bottom);
    target.parentNode.scrollTop = target.offsetTop;
  };

  React.useEffect(() => {
    flowToBottom();
  }, [res]);

  return (
    <>
      <div
        className={`${styles.chatItemContainer} ${
          selectId === id ? styles.active : ""
        }`}
        onClick={() => {
          onSelect(id);
        }}
      >
        <div className={styles.content}>
          <Avatar
            size={28}
            icon={<UserOutlined />}
            shape="square"
            style={{ flexShrink: 0, position: "absolute", left: -40 }}
          />
          {/* <div style={{ textAlign: "right", fontSize: 12, margin: "0 5px" }}>
            {dayjs(reqTime).format("YYYY-MM-DD HH:mm:ss")}
          </div> */}
          <p
            // className={styles.info}
            style={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{ __html: req }}
          />
        </div>
      </div>
      <div className={styles.chatItemContainer}>
        <div className={styles.content}>
          <Avatar
            size={28}
            icon={<img src={icon} />}
            shape="square"
            style={{
              flexShrink: 0,
              position: "absolute",
              left: -40,
              // top: 5,
              background: "white",
            }}
          />
          {/* <div style={{ fontSize: 12, margin: "2px 5px" }}>
              {dayjs(timeN).format("YYYY-MM-DD HH:mm:ss")}
            </div> */}
          {isDone ? (
            <p
              className={styles.info}
              dangerouslySetInnerHTML={{ __html: res }}
            />
          ) : (
            <Spin
              className={styles.info}
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          )}
          {isDone && (
            <div className={styles.icon}>
              <LikeOutlined />
              <DislikeOutlined />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const ChatBox: React.FunctionComponent<IProps> = () => {
  const flowToBottom = () => {
    var target: any = document.getElementById(styles.bottom);
    target.parentNode.scrollTop = target.offsetTop;
  };

  React.useEffect(() => {
    flowToBottom();
  }, []);

  const [isOpen, setIsOpen] = React.useState(false);

  const { messages, selectId, onSelect } = React.useContext(chatContext);

  React.useEffect(() => {
    if (selectId) {
      setIsOpen(true);
    }
  }, [selectId, messages]);

  const msg = React.useMemo(() => {
    if (selectId) {
      return messages.find((i) => i.id === selectId);
    }
  }, [selectId, messages]);

  return (
    <div className={styles.container} id={styles.container}>
      {messages.map((i) => (
        <ChatItem {...i} key={i.id} />
      ))}

      <div id={styles.bottom}></div>
      <Modal
        open={isOpen}
        cancelButtonProps={{
          style: {
            display: "none",
          },
        }}
        closable={false}
        okText="确认"
        onOk={() => {
          setIsOpen(false);
          onSelect(null);
        }}
        title={msg?.req}
        bodyStyle={{
          borderTop: "1px solid grey",
          borderBottom: "1px solid grey",
          padding: "10px 0",
        }}
      >
        {msg?.docs?.map((i) => (
          <div>{decodeURI(i)}</div>
        ))}
      </Modal>
    </div>
  );
};
export default ChatBox;
