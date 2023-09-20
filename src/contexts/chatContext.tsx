import React from "react";

const useChatContext = () => {
  const [chatId, setChatId] = React.useState(null);

  const [selectId, setSelectId] = React.useState(null);

  const [messages, setMessages] = React.useState<any>([]);

  const onSelect = (id) => {
    setSelectId(id);
  };

  return {
    chatId,
    setChatId,
    messages,
    addMessage: (msg) => {
      setMessages([...messages, { ...msg, reqTime: Date.now() }]);
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

const chatContext: any = React.createContext(null);

chatContext.myHook = useChatContext;

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
