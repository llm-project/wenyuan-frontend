import React from "react";
import { useRequest } from "ahooks";
import { chatWithKnowledge } from "@/services/modules/chat";

const useChatContext = () => {
  const [chatId, setChatId] = React.useState(null);

  const [selectId, setSelectId] = React.useState(null);

  const [messages, setMessages] = React.useState<any>([]);
  const [knowledgeBaseName, setKnowledgeBaseName] = React.useState(null);

  // const use

  const createNew = () => {
    setMessages([]);
  };

  const onSelect = (id) => {
    setSelectId(id);
  };

  return {
    chatId,
    setChatId,
    createNew,
    messages,
    setKnowledgeBaseName,
    addMessage: (msg) => {
      const id = Date.now();
      setMessages([...messages, { ...msg, reqTime: Date.now(), id }]);
      chatWithKnowledge({
        knowledgeBaseName,
        query: msg.req,
        stream: false,
        history: messages.reduce((total, i) => {
          if (i.isDone) {
            total.push({
              role: "user",
              content: i.req,
            });
            total.push({
              role: "assistant",
              content: i.res,
            });
          }
          return total;
        }, []),
      }).then((result) => {
        setMessages((msg) => {
          const target = msg.find((i) => i.id === id);
          target.res = result.answer;
          target.resTime = Date.now();
          target.isDone = true;
          target.docs = result.docs;
          return [...msg];
        });
      });
    },
    selectId,
    onSelect,
    updateMessage: (data) => {
      setMessages((msg) => {
        const target = msg.find((i) => i.id === data.id);
        target.res = data.res;
        target.resTime = data.resTime;
        target.isDone = true;
        target.docs = data.docs;
        return [...msg];
      });
    },
  };
};

const chatContext =
  React.createContext<ReturnType<typeof useChatContext>>(null);

(chatContext as any).myHook = useChatContext;

export const createContextWrapper = (Com, context: any) => {
  const { Provider } = context;
  const T = () => {
    const value = context.myHook();
    return (
      <Provider value={value}>
        <Com />
      </Provider>
    );
  };
  return T;
};

export default chatContext;
