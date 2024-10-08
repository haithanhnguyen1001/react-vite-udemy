import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Select,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { createBookApi, handleUploadFile } from "../../services/api.service";

const CreateBookUncontrol = (props) => {
  const { isModalCreateBookOpen, setIsModalCreateBookOpen, loadBook } = props;
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const handleOk = async (values) => {
    if (!selectedFile) {
      notification.error({
        message: "Error create book",
        description: "Vui lòng upload ảnh thumbnail",
      });
    } else {
      const resUpload = await handleUploadFile(selectedFile, "book");
      if (resUpload.data) {
        const thumbnail = resUpload.data.fileUploaded;
        const { mainText, author, price, quantity, category } = values;
        let res = await createBookApi(
          thumbnail,
          mainText,
          author,
          price,
          quantity,
          category
        );
        if (res.data) {
          notification.success({
            message: "Create book",
            description: "Tạo mới sách thành công",
          });
          handleCancel();
          await loadBook();
        } else {
          notification.error({
            message: "Error create book",
            description: JSON.stringify(resUpload.message),
          });
        }
      } else {
        notification.error({
          message: "Error upload file",
          description: JSON.stringify(resUpload.message),
        });
      }
    }
  };
  const handleCancel = () => {
    setIsModalCreateBookOpen(false);
    setSelectedFile(null);
    setPreview(null);
    form.resetFields();
  };
  const handleOnChangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    } else {
      const file = event.target.files[0];
      if (file) {
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
      }
    }
  };
  return (
    <>
      <Modal
        title="Create Book (Uncontroll Component)"
        open={isModalCreateBookOpen}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        okText={"CREATE"}
        cancelText={"CANCEL"}
      >
        <Form layout={"vertical"} form={form} onFinish={handleOk}>
          <Form.Item
            label="Tiêu đề"
            rules={[
              { required: true, message: "Tiêu đề không được để trống!" },
            ]}
            name="mainText"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tác giả"
            rules={[
              { required: true, message: "Tác giả không được để trống!" },
            ]}
            name={"author"}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá tiền"
            rules={[
              { required: true, message: "Giá tiền không được để trống!" },
            ]}
            name={"price"}
          >
            <InputNumber
              addonAfter={"đ"}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            rules={[
              { required: true, message: "Số lượng không được để trống!" },
            ]}
            name={"quantity"}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Thể loại"
            rules={[
              { required: true, message: "Thể loại không được để trống!" },
            ]}
            name={"category"}
          >
            <Select
              options={[
                { value: "Arts", label: "Arts" },
                { value: "Business", label: "Business" },
                { value: "Comics", label: "Comics" },
                { value: "Cooking", label: "Cooking" },
                { value: "Entertainment", label: "Entertainment" },
                { value: "History", label: "History" },
                { value: "Music", label: "Music" },
                { value: "Sports", label: "Sports" },
                { value: "Teen", label: "Teen" },
                { value: "Travel", label: "Travel" },
              ]}
            />
          </Form.Item>
          <FormItem>
            <div>
              <span>Ảnh thumbnail</span>
              <br />
              <label
                htmlFor="btnUpload"
                style={{
                  background: "Orange",
                  padding: "5px 10px",
                  display: "inline-block",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Upload
              </label>
              <input
                type="file"
                id="btnUpload"
                onChange={(event) => handleOnChangeFile(event)}
                onClick={(event) => {
                  event.target.value = null;
                }}
                style={{ display: "none" }}
              />
            </div>
            {preview && (
              <div
                style={{
                  border: "1px solid #ccc",
                  textAlign: "center",
                  width: "150px",
                  height: "100px",
                }}
              >
                <img
                  src={preview}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}
          </FormItem>
        </Form>
      </Modal>
    </>
  );
};

export default CreateBookUncontrol;
