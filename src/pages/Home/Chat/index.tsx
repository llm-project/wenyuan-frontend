import { RedoOutlined } from "@ant-design/icons";
import { Input, Tooltip, message } from "antd";
import ChatBox from "@/components/ChatBox";
import styles from "./index.module.css";
import logo from "@/assets/logo.png";
import React from "react";
import chatContext, { createContextWrapper } from "@/contexts/chatContext";
import { useLocation } from "ice";

const IndexPage = (props) => {
  const { chatId = 1 } = props;
  const [val, setVal] = React.useState("");
  const { addMessage, setChatId, messages, createNew, setKnowledgeBaseName } =
    React.useContext(chatContext);

  const location = useLocation();

  React.useEffect(() => {
    setKnowledgeBaseName(location.state?.name);
  }, []);

  const isDisabled = React.useMemo(() => {
    return messages?.length && !messages[messages.length - 1].isDone;
  }, [messages]);
  const send = React.useCallback(() => {
    if (isDisabled) {
      message.error("答案正在生成中，请稍后再试");
      return;
    }
    if (val) {
      addMessage({
        isDone: false,
        req: val,
        res: null,
        id: Date.now(),
      });
      setVal("");
    }
  }, [addMessage, val, isDisabled]);

  const handleKeyDown = React.useCallback(
    (e) => {
      if (e.keyCode === 91) {
        const handler = (i) => {
          if (i.keyCode === 13) {
            send();
          }
          document.removeEventListener("keydown", handler);
        };
        document.addEventListener("keydown", handler);
      }
    },
    [send]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  React.useEffect(() => {
    setChatId(chatId);
  }, [chatId]);

  return (
    <div className={styles.container}>
      <ChatBox />
      <div className={`${styles.input} `} tabIndex={1}>
        <Tooltip title="点击开启一轮新的对话（将清空左侧对话和右侧命中文本内容）">
          <RedoOutlined className={styles.redo} onClick={createNew} />
        </Tooltip>
        <Input.TextArea
          value={val}
          disabled={isDisabled}
          onChange={(e) => {
            setVal(e.target.value);
          }}
          placeholder="请输入问题"
          onFocus={(e) => {
            e.target.parentElement?.classList.add(styles["input-focus"]);
          }}
          onBlur={(e) => {
            e.target.parentElement?.classList.remove(styles["input-focus"]);
          }}
        />
        <img
          src={logo}
          className={styles.logo}
          width={40}
          style={{ float: "right", marginTop: -10 }}
          onClick={send}
        />
      </div>
    </div>
  );
};
export default createContextWrapper(IndexPage, chatContext);
