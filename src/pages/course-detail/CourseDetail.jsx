import { useParams, useNavigate } from "react-router-dom";
import { useGetCourseDetail } from "../../queries/category.queries.js";
import { useRegisterCourseMutation } from "../../queries/enroll.queries";
import { Button, message, Spin } from "antd";
import { useSelector } from "react-redux";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); // Lấy user từ Redux để check login chưa

  // Hook lấy chi tiết
  const { data: course, isLoading } = useGetCourseDetail(id);
  // Hook đăng ký
  const { mutate: registerCourse, isPending: isRegistering } =
    useRegisterCourseMutation();

  const handleRegister = () => {
    if (!user) {
      message.warning("Vui lòng đăng nhập để đăng ký!");
      navigate("/login");
      return;
    }

    registerCourse(id, {
      onSuccess: (res) => {
        message.success(res || "Đăng ký khóa học thành công!");
      },
      onError: (err) => {
        message.error(err.response?.data || "Đăng ký thất bại");
      },
    });
  };

  if (isLoading) return <Spin tip="Đang tải..." />;

  return (
    <div className="container" style={{ padding: 20 }}>
      <h1>{course?.tenKhoaHoc}</h1>
      <img
        src={course?.hinhAnh}
        alt={course?.tenKhoaHoc}
        style={{ width: "100%", maxWidth: 500 }}
      />
      <p>{course?.moTa}</p>

      <Button
        type="primary"
        size="large"
        onClick={handleRegister}
        loading={isRegistering}
      >
        Đăng ký tham gia
      </Button>
    </div>
  );
}
