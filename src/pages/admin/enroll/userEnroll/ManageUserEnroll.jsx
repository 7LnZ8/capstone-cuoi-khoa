import React from "react";
import { Tabs } from "antd";

import NotRegisterCourse from "./NotRegisterCourse.jsx";
import DoneEnrollCourse from "./DoneEnrollCourse.jsx";
import PendingEnrollCourse from "./PendingEnrollCourse.jsx";
import { useMatch } from "react-router-dom";

export default function ManageUserEnroll() {
  const matchEnrollUsers = useMatch("/admin/enroll/user/:id");
  const userId = matchEnrollUsers?.params.id;

  const remove = "remove";
  const register = "register";

  const items = [
    {
      key: "1",
      label: "KHÓA HỌC CHƯA ĐĂNG KÝ",
      children: <NotRegisterCourse id={userId} action={register} />,
    },
    {
      key: "2",
      label: "KHÓA HỌC ĐÃ ĐĂNG KÝ",
      children: <DoneEnrollCourse id={userId} action={remove} />,
    },
    {
      key: "3",
      label: "KHÓA HỌC CHỜ XÉT DUYỆT",
      children: <PendingEnrollCourse id={userId} />,
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
