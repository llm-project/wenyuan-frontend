import { Form, Input, Radio } from "antd";

const UploadUrl = () => {
  return (
    <>
      <Form.Item
        label="URL地址"
        name="url"
        required
        rules={[{ required: true, message: "请输入URL" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="网站标题"
        name="title"
        required
        rules={[{ required: true, message: "请输入网站标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="需要登录"
        name="isNeedLogin"
        required
        rules={[{ required: true, message: "请选择是否需要登录" }]}
      >
        <Radio.Group>
          <Radio.Button value={1}>是</Radio.Button>
          <Radio.Button value={0}>否</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {({ getFieldValue }) => {
          const isNeedLogin = getFieldValue("isNeedLogin");
          return isNeedLogin ? (
            <Form.Item
              label="用户名"
              name="useName"
              required
              rules={[{ required: true, message: "请输入用户名" }]}
              shouldUpdate
            >
              <Input />
            </Form.Item>
          ) : null;
        }}
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {({ getFieldValue }) => {
          const isNeedLogin = getFieldValue("isNeedLogin");
          return isNeedLogin ? (
            <Form.Item
              label="密码"
              name="pwd"
              required
              rules={[{ required: true, message: "请输入密码" }]}
              shouldUpdate
            >
              <Input />
            </Form.Item>
          ) : null;
        }}
      </Form.Item>
    </>
  );
};

export default UploadUrl;
