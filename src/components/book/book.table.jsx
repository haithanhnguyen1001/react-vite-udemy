import { useEffect, useState } from "react";
import {
  deleteBookApi,
  fetchBookWithPaginate,
} from "../../services/api.service";
import { Button, notification, Popconfirm, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ViewBookDetail from "./view.book.detail";
import ModalCreateBook from "./modal.create.book";
import CreateBookUncontrol from "./create.book.uncontrol";
import UpdateBookControl from "./update.book.control";
import UpdateBookUncontrol from "./update.book.uncontrol";

const BookTable = () => {
  const [bookData, setBookData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const [isModalDetailBookOpen, setIsModalDetailBookOpen] = useState(false);
  const [bookInfo, setBookInfo] = useState({});

  const [isModalCreateBookOpen, setIsModalCreateBookOpen] = useState(false);

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  useEffect(() => {
    loadBook();
  }, [current, pageSize]);
  const loadBook = async () => {
    const res = await fetchBookWithPaginate(current, pageSize);
    if (res.data) {
      setBookData(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
  };
  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current) {
      if (pagination.current !== current) {
        setCurrent(+pagination.current);
      }
    }
    if (pagination && pagination.pageSize) {
      if (pagination.pageSize !== pageSize) {
        setPageSize(+pagination.pageSize);
      }
    }
  };
  const handleDeleteBook = async (id) => {
    const res = await deleteBookApi(id);
    if (res && res.data) {
      notification.success({
        message: "Delete book",
        description: "Xoá thành công",
      });
    } else {
      notification.error({
        message: "Delete book error",
        description: JSON.stringify(res.message),
      });
    }
    await loadBook();
  };
  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        return <>{index + 1 + (current - 1) * pageSize}</>;
      },
    },
    {
      title: "Id",
      dataIndex: "_id",
      render: (_, record) => {
        return (
          <a
            onClick={() => {
              setIsModalDetailBookOpen(true);
              setBookInfo(record);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Tiêu đề",
      dataIndex: "mainText",
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (_, record) => {
        return (
          <>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(record.price)}
          </>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <EditOutlined
              style={{ cursor: "pointer", color: "green" }}
              onClick={() => {
                setIsModalUpdateOpen(true);
                setDataUpdate(record);
              }}
            />
            <Popconfirm
              title="Delete book"
              description="Are you sure to delete this book?"
              onConfirm={() => handleDeleteBook(record._id)}
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              <DeleteOutlined style={{ cursor: "pointer", color: "green" }} />
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>Table Book</h2>
        <Button
          type="primary"
          onClick={() => {
            setIsModalCreateBookOpen(true);
          }}
        >
          Thêm mới
        </Button>
      </div>
      <Table
        dataSource={bookData}
        columns={columns}
        rowKey={"_id"}
        pagination={{
          current: current,
          pageSize: pageSize,
          total: total,
          showTotal: (total, range) => {
            return (
              <>
                {range[0]}-{range[1]} trên {total} book
              </>
            );
          },
          showSizeChanger: true,
        }}
        onChange={onChange}
      />
      <ViewBookDetail
        isModalDetailBookOpen={isModalDetailBookOpen}
        setIsModalDetailBookOpen={setIsModalDetailBookOpen}
        bookInfo={bookInfo}
        setBookInfo={setBookInfo}
      />
      {/* <ModalCreateBook
        isModalCreateBookOpen={isModalCreateBookOpen}
        setIsModalCreateBookOpen={setIsModalCreateBookOpen}
        loadBook={loadBook}
      /> */}
      <CreateBookUncontrol
        isModalCreateBookOpen={isModalCreateBookOpen}
        setIsModalCreateBookOpen={setIsModalCreateBookOpen}
        loadBook={loadBook}
      />
      {/* <UpdateBookControl
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadBook={loadBook}
      /> */}
      <UpdateBookUncontrol
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadBook={loadBook}
      />
    </>
  );
};
export default BookTable;
