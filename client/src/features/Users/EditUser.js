import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "./UserApiSlice";
import EditUserForm from "./EditUserForm";
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from "../../hooks/useTitle";
const EditUser = () => {
  useTitle(`XYZ Tech Company - Edit Profile`)
  
  const { id } = useParams();
  const { user } = useGetUsersQuery("usersLists", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });


  let content = user ? <EditUserForm user={user} /> : <PulseLoader color={"#FFF"} />;
  return content;
};

export default EditUser;
