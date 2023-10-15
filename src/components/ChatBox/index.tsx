import { Avatar } from "antd";
import React from "react";
import { UserOutlined, LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import chatContext from "@/contexts/chatContext";
import dayjs from "dayjs";
import icon from "@/assets/little-icon.png";
import Modal from "antd/es/modal/Modal";

interface IProps {}

const temp = `随着
          chatGPT的大火，各种新闻铺天盖地席卷而来，上一次AI爆火出圈还是2016年AlphaGo击败李世石。
          笔者也来蹭一波chatGPT的热度，来对其背后的技术原理做一个简单的剖析，现在网上各种技术讲解非常多，笔者对这些文章阅读之后进行了一些总结，写了一个相对简单通俗易懂的版本。
          由于笔者不是专业的NLP从业者，所以这篇文章也是抱着学习的目的进行撰写，错误之处在所难免，欢迎指正。`.replaceAll(
  "\n",
  "<br>"
);

const ChatItem = (props) => {
  const { id, req, res, isDone, reqTime, resTime } = props;
  const { updateMessage, onSelect, selectId } = React.useContext(chatContext);

  const timeN = React.useMemo(() => {
    return resTime || Date.now();
  }, []);

  const flowToBottom = () => {
    var target: any = document.getElementById(styles.bottom);
    target.parentNode.scrollTop = target.offsetTop;
  };

  const [v, setV] = React.useState(res || "");

  React.useEffect(() => {
    flowToBottom();
  }, [v]);

  React.useEffect(() => {
    if (!isDone) {
      let time = setInterval(() => {
        setV((val) => {
          if (val.length > 100) {
            clearInterval(time);
            updateMessage({
              res: val,
              id,
              resTime: timeN,
            });
          } else {
            val += "闻铺天一";
          }
          return val;
        });
      }, 200);
    }
  }, []);
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
      {v && (
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
            <p
              className={styles.info}
              dangerouslySetInnerHTML={{ __html: v }}
            />
            {isDone && (
              <div className={styles.icon}>
                <LikeOutlined />
                <DislikeOutlined />
              </div>
            )}
          </div>
        </div>
      )}
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
    console.log("test", selectId);
    if (selectId) {
      setIsOpen(true);
    }
  }, [selectId]);

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
        title="XXXXXXXXXXXXXXXXXXXXXXXXX"
        bodyStyle={{
          borderTop: "1px solid grey",
          borderBottom: "1px solid grey",
          padding: "10px 0",
        }}
      >
        <div>XXXXXXXXXXXXXXXXXXXXXXXXX</div>
        <div>XXXXXXXXXXXXXXXXXXXXXXXXX</div>
        <div>XXXXXXXXXXXXXXXXXXXXXXXXX</div>
        <div>XXXXXXXXXXXXXXXXXXXXXXXXX</div>
        <div>来源：XXXXXXXXXXXXXXXXXXXXXXXXX</div>
      </Modal>
    </div>
  );
};
export default ChatBox;
