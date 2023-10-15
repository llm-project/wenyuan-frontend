import React from "react";
import { useRequest } from "ahooks";

const useChatContext = () => {
  const [chatId, setChatId] = React.useState(null);

  const [selectId, setSelectId] = React.useState(null);

  const [messages, setMessages] = React.useState<any>([]);

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
    addMessage: (msg) => {
      setMessages([
        ...messages,
        { ...msg, reqTime: Date.now(), id: Date.now() },
      ]);
    },
    selectId,
    onSelect,
    updateMessage: (data) => {
      setMessages((msg) => {
        const target = msg.find((i) => i.id === data.id);
        target.res = data.res;
        target.resTime = data.resTime;
        target.isDone = true;
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
