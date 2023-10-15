import request from "@/utils/request";

export const getResponse = async (params) => {
  const res = await request.post("/", params);
  return res;
};
