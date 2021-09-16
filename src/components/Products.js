import React, { useEffect, useState } from "react";
import { Table, Pagination, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getProducts } from "../functions/fetchers";
import { search } from "../functions/search";

import "../styles/Products.css";

const { Search } = Input;

const Products = ({ token }) => {
  const [data, setdata] = useState(null);
  const [total, settotal] = useState(10);
  const [page, setpage] = useState(1);
  const [toggle, setToggle] = useState(false);
  const [filtered, setfiltered] = useState(null);

  const onSearch = (val) => {
    search({ val, setfiltered, data });
  };
  useEffect(() => {
    getProducts({ settotal, setdata, token, setfiltered, page, setToggle });
    // eslint-disable-next-line
  }, [page]);
  const columns = [
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Размер",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Цвет",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Поставщик",
      dataIndex: "supplier",
      key: "supplier",
    },
  ];
  return (
    <div className="_products">
      <h2>Available Products</h2>
      <span
        onClick={() => {
          setToggle((prev) => !prev);
        }}
        className="search"
      >
        Искать по имя
        <SearchOutlined />
      </span>
      {toggle && (
        <Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{ width: 200 }}
        />
      )}
      {data !== null && (
        <div className="_table">
          <Table
            dataSource={filtered !== null ? filtered : data}
            columns={columns}
            pagination={false}
            scroll={{ y: 450 }}
          />
          <Pagination
            defaultCurrent={1}
            total={total}
            showSizeChanger={false}
            onChange={(num, size) => {
              setpage(num);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Products;
