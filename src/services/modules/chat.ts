import axios from "axios";

export const chat = async (params) => {
  const res = await axios.post("/api/chat/chat", params);
  return { answer: res.data };
};

export const chatWithKnowledge = async (params) => {
  const res = await axios.post("/api/chat/knowledge_base_chat", {
    ...params,
    knowledge_base_name: params.knowledgeBaseName,
    top_k: 2,
    score_threshold: 1,
  });
  return res.data;
};
