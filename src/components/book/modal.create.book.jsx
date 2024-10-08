import { Input, InputNumber, message, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookApi, handleUploadFile } from "../../services/api.service";

const ModalCreateBook = (props) => {
  const { isModalCreateBookOpen, setIsModalCreateBookOpen, loadBook } = props;
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const handleCancel = () => {
    setIsModalCreateBookOpen(false);
    setMainText("");
    setAuthor("");
    setPrice("");
    setQuantity("");
    setCategory("");
    setSelectedFile(null);
    setPreview(null);
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
  const handleOk = async () => {
    if (!selectedFile) {
      notification.error({
        message: "Error create book",
        description: "Vui lòng upload ảnh thumbnail",
      });
      return;
    } else {
      let resUpload = await handleUploadFile(selectedFile, "book");
      if (resUpload.data) {
        const newThumbnail = resUpload.data.fileUploaded;
        let resBook = await createBookApi(
          newThumbnail,
          mainText,
          author,
          price,
          quantity,
          category
        );
        if (resBook.data) {
          handleCancel();
          await loadBook();
          notification.success({
            message: "Create book",
            description: "Tạo mới sách thành công",
          });
        } else {
          notification.error({
            message: "Error create book",
            description: JSON.stringify(resBook.message),
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
  return (
    <Modal
      title="Tạo mới sách"
      open={isModalCreateBookOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={"CREATE"}
      cancelText={"CANCEL"}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div>
          <span>Tiêu đề</span>
          <Input
            value={mainText}
            onChange={(e) => setMainText(e.target.value)}
          />
        </div>
        <div>
          <span>Tác giả</span>
          <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          <span>Giá tiền</span>
          <InputNumber
            addonAfter={"đ"}
            style={{
              width: "100%",
            }}
            value={price}
            onChange={(e) => setPrice(e)}
          />
        </div>
        <div>
          <span>Số lượng</span>
          <InputNumber
            min={0}
            style={{
              width: "100%",
            }}
            value={quantity}
            onChange={(e) => setQuantity(e)}
          />
        </div>
        <div>
          <span>Thể loại</span>
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
            style={{
              width: "100%",
            }}
            value={category}
            onChange={(e) => setCategory(e)}
          />
        </div>
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
            name=""
            id="btnUpload"
            hidden
            onChange={(event) => handleOnChangeFile(event)}
            onClick={(event) => {
              event.target.value = null;
            }}
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
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalCreateBook;
