import axios from "axios";
import qs from "qs";

export const getKnowledgeList = async () => {
  const res = await axios.get("/api/knowledge_base/list_knowledge_bases");
  return res.data.data.map((i) => ({
    name: i,
  }));
};

export const createKnowledge = async (knowledge_base_name: string) => {
  const res = await axios.post("/api/knowledge_base/create_knowledge_base", {
    knowledge_base_name,
    vector_store_type: "faiss",
    embed_model: "m3e-base",
  });
  return res;
};
export const deleteKnowledge = async (name) => {
  const res = await axios.post(
    "/api/knowledge_base/delete_knowledge_base",
    name
  );
  return res;
};
export const uploadDoc = async (params: {
  file: FormData;
  knowledge_base_name: string;
  override?: boolean; //覆盖已有文件
  not_refresh_vs_cache?: boolean; //暂不保存向量库（用于FAISS）
}) => {
  const res = await axios.post(
    "/api/knowledge_base/upload_doc",
    { ...params },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res;
};
export const deleteDoc = async (params: {
  doc_name: string;
  knowledge_base_name: string;
  delete_content?: boolean; //同时删除内容
  not_refresh_vs_cache?: boolean;
}) => {
  const res = await axios.post("/api/knowledge_base/delete_doc", { ...params });
  return res;
};
export const updateDoc = async (params: {
  file_name: string;
  knowledge_base_name: string;
  not_refresh_vs_cache?: boolean;
}) => {
  const res = await axios.post("/api/knowledge_base/update_doc", { ...params });
  return res;
};
export const getDocList: (
  name: string
) => Promise<Array<{ [key: string]: string }>> = async (name) => {
  const res = await axios.get(
    `/api/knowledge_base/list_docs?knowledge_base_name=${name}`
  );
  return res.data.data.map((i) => ({
    name: i,
    knowledgeBaseName: name,
  }));
};
export const downloadDoc = async (params: {
  file_name: string;
  knowledge_base_name: string;
}) => {
  const res = await axios.get(
    "/api/knowledge_base/download_doc?" + qs.stringify(params)
  );
  return res;
};
