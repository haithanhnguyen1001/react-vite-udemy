import { useEffect, useState } from "react";
import { fetchBookWithPaginate } from "../../services/api.service";
import { Button, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const BookTable = () => {
  const [bookData, setBookData] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

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
        return <a>{record._id}</a>;
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
            <EditOutlined style={{ cursor: "pointer", color: "green" }} />
            <DeleteOutlined style={{ cursor: "pointer", color: "green" }} />
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
        <Button type="primary">Thêm mới</Button>
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
    </>
  );
};
export default BookTable;