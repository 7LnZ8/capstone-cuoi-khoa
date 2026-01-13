import CommonList from "./CommonList.jsx";
import { useGetCourseWasRegisterByUser } from "../../../../queries/enroll.queries.js";

const DoneEnrollCourse = ({ id, action }) => {
  const { data } = useGetCourseWasRegisterByUser(id);

  return <CommonList data={data} action={action} />;
};

export default DoneEnrollCourse;
