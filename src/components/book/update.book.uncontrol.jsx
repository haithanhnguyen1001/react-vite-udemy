import {
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookApi } from "../../services/api.service";

const UpdateBookUncontrol = (props) => {
  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    dataUpdate,
    setDataUpdate,
    loadBook,
  } = props;
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  useEffect(() => {
    if (dataUpdate && dataUpdate._id) {
      form.setFieldsValue({
        id: dataUpdate._id,
        mainText: dataUpdate.mainText,
        author: dataUpdate.author,
        price: dataUpdate.price,
        quantity: dataUpdate.quantity,
        category: dataUpdate.category,
      });
      setPreview(
        `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          dataUpdate.thumbnail
        }`
      );
    }
  }, [dataUpdate]);
  const handleSubmitBtn = async (values) => {
    //Neu khong co anh va khong co file uploaded
    if (!preview && !selectedFile) {
      message.error("Không có ảnh thumbnail, vui lòng upload ảnh!");
      return;
    }
    let newThumbnail = "";
    if (preview && !selectedFile) {
      newThumbnail = dataUpdate.thumbnail;
    } else {
      const resUpload = await handleUploadFile(selectedFile, "book");
      if (resUpload.data) {
        newThumbnail = resUpload.data.fileUploaded;
      } else {
        notification.error({
          message: "Error upload file",
          description: JSON.stringify(resUpload.message),
        });
        return;
      }
    }

    await updateBook(newThumbnail, values);
  };
  const updateBook = async (newThumbnail, values) => {
    const { id, mainText, author, price, quantity, category } = values;
    const resUpdate = await updateBookApi(
      id,
      newThumbnail,
      mainText,
      author,
      price,
      quantity,
      category
    );
    if (resUpdate && resUpdate.data) {
      notification.success({
        message: "Update book",
        description: "Cập nhật thông tin thành công",
      });
      resetAndCloseModal();
      await loadBook();
    } else {
      notification.error({
        message: "Update book",
        description: "Cập nhật thông tin không thành công. Vui lòng thử lại",
      });
    }
  };
  const resetAndCloseModal = () => {
    form.resetFields();
    setDataUpdate(null);
    setPreview(null);
    setSelectedFile(null);
    setIsModalUpdateOpen(false);
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
  console.log(dataUpdate);
  return (
    <Modal
      title="Update Book (Uncontroll Component)"
      open={isModalUpdateOpen}
      onOk={() => form.submit()}
      onCancel={resetAndCloseModal}
      okText={"UPDATE"}
      cancelText={"CANCEL"}
    >
      <Form layout={"vertical"} form={form} onFinish={handleSubmitBtn}>
        <Form.Item label="Id" rules={[{ required: true }]} name="id">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Tiêu đề"
          rules={[{ required: true, message: "Tiêu đề không được để trống!" }]}
          name="mainText"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tác giả"
          rules={[{ required: true, message: "Tác giả không được để trống!" }]}
          name={"author"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giá tiền"
          rules={[{ required: true, message: "Giá tiền không được để trống!" }]}
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
          rules={[{ required: true, message: "Số lượng không được để trống!" }]}
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
          rules={[{ required: true, message: "Thể loại không được để trống!" }]}
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
        <Form.Item>
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
                marginTop: "15px",
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
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UpdateBookUncontrol;
