import React from "react";
import { PageHeader, Divider, Button } from "antd";
import "../styles/Header.css";

const Header = ({ settoken }) => {
  const clearToken = () => {
    localStorage.removeItem("token");
    settoken(null);
  };
  return (
    <>
      <PageHeader
        className="_header"
        title="Face ox-sys"
        extra={[
          <Button onClick={clearToken} key="3">
            Log out
          </Button>,
        ]}
      />
      <Divider className="_divider" />
    </>
  );
};

export default Header;
