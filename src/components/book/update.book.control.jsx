import { Input, InputNumber, message, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookApi } from "../../services/api.service";

const UpdateBookControl = (props) => {
  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    dataUpdate,
    setDataUpdate,
    loadBook,
  } = props;
  const [id, setId] = useState("");
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [category, setCategory] = useState("");
  const [fileSelected, setFileSelected] = useState(null);
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    if (dataUpdate && dataUpdate._id) {
      setId(dataUpdate._id);
      setMainText(dataUpdate.mainText);
      setAuthor(dataUpdate.author);
      setPrice(dataUpdate.price);
      setQuantity(dataUpdate.quantity);
      setCategory(dataUpdate.category);
      setPreview(
        `${import.meta.env.VITE_BACKEND_URL}/images/book/${
          dataUpdate.thumbnail
        }`
      );
    }
  }, [dataUpdate]);

  const updateBook = async (newThumbnail) => {
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
  const handleSubmitBtn = async () => {
    //Neu khong co anh va khong co file uploaded
    if (!preview && !fileSelected) {
      message.error("Không có ảnh thumbnail, vui lòng upload ảnh!");
      return;
    }
    let newThumbnail = "";
    if (preview && !fileSelected) {
      newThumbnail = dataUpdate.thumbnail;
    } else {
      const resUpload = await handleUploadFile(fileSelected, "book");
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

    await updateBook(newThumbnail);
  };

  const resetAndCloseModal = () => {
    setId("");
    setMainText("");
    setAuthor("");
    setPrice(null);
    setQuantity(null);
    setCategory("");
    setFileSelected(null);
    setPreview(null);
    setDataUpdate(null);
    setIsModalUpdateOpen(false);
  };

  const handleOnChangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setFileSelected(null);
      setPreview(null);
      return;
    } else {
      const file = event.target.files[0];
      if (file) {
        setFileSelected(file);
        setPreview(URL.createObjectURL(file));
      }
    }
  };
  console.log(dataUpdate);
  return (
    <>
      <Modal
        title="Update book"
        open={isModalUpdateOpen}
        onOk={handleSubmitBtn}
        onCancel={resetAndCloseModal}
        okText="UPDATE"
        cancelText="CANCEL"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div>
            <span>Id</span>
            <Input value={id} disabled={true} />
          </div>
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
        </div>
      </Modal>
    </>
  );
};
export default UpdateBookControl;
