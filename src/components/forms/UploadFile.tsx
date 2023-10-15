import { Form, Radio, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const UploadDoc = () => {
  return (
    <>
      <Form.Item
        name="file"
        valuePropName="fileList"
        getValueFromEvent={(e: any) => {
          if (Array.isArray(e)) {
            return e;
          }
          return e?.fileList;
        }}
        required
        rules={[{ required: true, message: "请选择上传文件" }]}
      >
        <Upload listType="picture-card">
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>
    </>
  );
};

export default UploadDoc;
