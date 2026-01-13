import CommonList from "./CommonList.jsx";
import { useGetCourseNotRegisterByUser } from "../../../../queries/enroll.queries.js";

const NotRegisterCourse = ({ id, action }) => {
  const { data: listNotRegisterByUser } = useGetCourseNotRegisterByUser(id);

  return <CommonList data={listNotRegisterByUser} action={action} />;
};
export default NotRegisterCourse;
