import React from "react";
import { useParams } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import { useGetUsersQuery } from "../Users/UserApiSlice";
import EditNoteForm from "./EditNoteForm";
import { useGetNotesQuery } from "./notesApiSlice";

const EditNotes = () => {
  const { id } = useParams();
  
  const { username, isManager, isAdmin } = useAuth();
  useTitle(`XYZ Tech Company (${username}) - Edit Note`)

  const { note } = useGetNotesQuery("notesLists", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });

  const { user } = useGetUsersQuery("usersLists", {
    selectFromResult: ({ data }) => ({
      user: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if(!note || !user?.length){
    return <PulseLoader color="#FFF" />
  }

  if(!isManager || !isAdmin) {
    if(note.username !== username){
      return <p className="errmsg">No access</p>
    }
  }

  

  const content =
    note && user ? (
      <EditNoteForm users={user} note={note} />
    ) : (
      <PulseLoader color="#FFF" />
    );
  return content;
};

export default EditNotes;
