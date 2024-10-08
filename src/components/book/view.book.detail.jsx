import { Drawer } from "antd";

const ViewBookDetail = (props) => {
  const {
    isModalDetailBookOpen,
    setIsModalDetailBookOpen,
    bookInfo,
    setBookInfo,
  } = props;
  const { _id, mainText, author, category, price, quantity, sold, thumbnail } =
    bookInfo;
  const onClose = () => {
    setIsModalDetailBookOpen(false);
  };
  return (
    <Drawer
      title="Chi tiết Book"
      onClose={onClose}
      open={isModalDetailBookOpen}
      width={"40vw"}
    >
      {bookInfo ? (
        <>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <p>Id: {_id}</p>
            <p>Tiêu đề: {mainText}</p>
            <p>Tác giả: {author}</p>
            <p>Thể loại: {category}</p>
            <p>
              Giá tiền:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(price)}
            </p>
            <p>Số lượng: {quantity}</p>
            <p>Đã bán: {sold}</p>
            <p>Thumnail:</p>
            <div
              style={{
                border: "1px solid #ccc",
                textAlign: "center",
                width: "150px",
                height: "100px",
              }}
            >
              <img
                src={`${
                  import.meta.env.VITE_BACKEND_URL
                }/images/book/${thumbnail}`}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <p>Không có dữ liệu</p>
        </>
      )}
    </Drawer>
  );
};

export default ViewBookDetail;
