import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";
import { useGetUsersQuery } from "../Users/UserApiSlice";
import NewNoteForm from "./NewNoteForm";
const NewNotes = () => {
  useTitle('XYZ Tech Company - Add Note')
  const { users } = useGetUsersQuery("usersLists", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length) return <PulseLoader color="#fff" />;

  const content = <NewNoteForm users={users} />;
  return content;
};

export default NewNotes;
