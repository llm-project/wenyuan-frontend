import { Form, Input } from "antd";

const AddQAPairs = () => {
  return (
    <>
      <Form.Item
        label="问题"
        name="url"
        required
        rules={[{ required: true, message: "请输入URL" }]}
      >
        <Input.TextArea maxLength={200} autoSize={{ minRows: 3 }} />
      </Form.Item>
      <Form.Item
        label="答案"
        name="title"
        required
        rules={[{ required: true, message: "请输入网站标题" }]}
      >
        <Input.TextArea maxLength={200} autoSize={{ minRows: 3 }} />
      </Form.Item>
    </>
  );
};

export default AddQAPairs;
