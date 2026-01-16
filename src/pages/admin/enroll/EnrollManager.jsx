// import React from "react";
import { Tabs } from "antd";
import SearchUser from "./listPreview/SearchUser.jsx";

export default function EnrollManager() {
  // const matchEnrollUsers = useMatch("/admin/enroll/user/:id");
  // const userId = matchEnrollUsers?.params.id;

  // const remove = "remove";
  // const register = "register";

  const items = [
    {
      key: "1",
      label: "KIỂM TRA THEO MÃ KHÓA HỌC",
      children: <h1>KHÓA HỌC</h1>,
    },
    {
      key: "2",
      label: "KIỂM TRA THEO TÀI KHOẢN",
      children: <SearchUser />,
    },
  ];

  const onChange = (key) => {
    console.log("Tab active:", key);
  };

  return (
    <div className="elearning-tabs-enroll">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}
