import React from "react";
import CommonList from "./CommonList.jsx";
import { useGetCoursePendingByUser } from "../../../../queries/enroll.queries.js";

const PendingEnrollCourse = ({ id, action }) => {
  const { data } = useGetCoursePendingByUser(id);

  return <CommonList data={data} action={action} />;
};

export default PendingEnrollCourse;
