import React from "react";

import { useCourses } from "../../../queries/course.queries.js";
import { Spinner } from "react-bootstrap";
import CourseTableList from "./CourseTableList.jsx";

const CourseManager = React.memo(function CourseManager() {
  const { data, isPending, isError, error } = useCourses();

  if (isPending)
    return (
      <div className="loading-text">
        <Spinner></Spinner> Nội dung đang tải...
      </div>
    );
  if (isError) return <p>Lỗi: {String(error)}</p>;

  return (
    <div className="course-table">
      <h3>DANH SÁCH KHÓA HỌC</h3>

      <CourseTableList data={data} />
    </div>
  );
});

export default CourseManager;
