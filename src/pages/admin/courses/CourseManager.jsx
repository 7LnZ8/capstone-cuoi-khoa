/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import {
  useCourses,
  useFindCourseByName,
  useImageCourse,
} from "../../../queries/course.queries.js";
import { Spinner } from "react-bootstrap";
import CourseTableList from "./CourseTableList.jsx";
import { message, Modal, Upload } from "antd";
import { useForm } from "react-hook-form";

const CourseManager = React.memo(function CourseManager() {
  const { data: listData, isPending, isError, error } = useCourses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tenCuaKhoaHoc, setTenCuaKhoaHoc] = useState("");
  const showModal = (id) => {
    setIsModalOpen(true);
    setTenCuaKhoaHoc(id);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //////////////////////////////////////////////
  const [fileList, setFileList] = useState([]);
  const [imageVersion, setImageVersion] = useState(0);

  const { data } = useFindCourseByName(tenCuaKhoaHoc, {
    enabled: !!tenCuaKhoaHoc,
  });

  const updateImageCourse = useImageCourse();

  const courseFromApi = data?.find((item) => item.tenKhoaHoc === tenCuaKhoaHoc);
  console.log(fileList);
  useEffect(() => {
    console.log(courseFromApi);

    if (courseFromApi?.hinhAnh) {
      setFileList([
        {
          uid: "-1",
          name: courseFromApi.hinhAnh.split("/").pop() || "image.jpg",
          status: "done",
          url: courseFromApi.hinhAnh,
        },
      ]);
    }
  }, [courseFromApi?.hinhAnh]);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: courseFromApi,
  });

  const onSubmit = async () => {
    setIsModalOpen(false);
    if (!fileList.length || !fileList[0].originFileObj) {
      message.error("Vui lòng chọn ảnh");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileList[0].originFileObj); // FILE THẬT
    formData.append("tenKhoaHoc", tenCuaKhoaHoc);

    try {
      const data = await updateImageCourse.mutateAsync(formData);
      setImageVersion((v) => v + 1);
      console.log("Cập nhật ảnh thành công:", data);
      message.success("Cập nhật ảnh thành công!");
      // navigate("/admin/courses");
    } catch (err) {
      console.log("Lỗi tải ảnh:", err);
    }
  };

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
      <CourseTableList
        data={listData}
        showModal={showModal}
        imageVersion={imageVersion}
      />
      <Modal
        title="Cập nhật ảnh"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
        okText="Cập nhật"
        onOk={handleSubmit(onSubmit)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={(file) => {
              setFileList([
                {
                  uid: file.uid,
                  name: file.name,
                  status: "done",
                  originFileObj: file,
                },
              ]);
              return false;
            }}
            onRemove={() => setFileList([])}
          >
            <button type="button">Chọn từ máy</button>
          </Upload>

          {errors.hinhAnh && (
            <p className="text-danger">{errors.hinhAnh.message}</p>
          )}
        </form>
      </Modal>
    </div>
  );
});

export default CourseManager;
