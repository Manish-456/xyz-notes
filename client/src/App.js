import { Routes, Route } from "react-router-dom";
import DashLayout from "./components/DashLayout";
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import Public from "./components/Public";
import Welcome from "./features/auth/Welcome";
import NoteLists from "./features/Notes/NoteLists";
import UsersLists from "./features/Users/UsersLists";
import EditUser from "./features/Users/EditUser";
import EditNotes from "./features/Notes/EditNotes";
import NewUserForm from "./features/Users/NewUserForm";
import NewNotes from "./features/Notes/NewNotes";
import PreFetch from "./features/auth/PreFetch";
import PersistLogin from "./features/auth/PersistLogin";
import { ROLES } from "./config/roles";
import RequireAuth from "./features/auth/RequireAuth";
import useTitle from "./hooks/useTitle";
function App() {
  useTitle('XYZ Tech Company');

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}></Route>
        <Route element={<PersistLogin />}>
          <Route element={<PreFetch />}>
            <Route path="dash" element={<DashLayout />}>
              <Route index element={<Welcome />} />
              <Route element={<RequireAuth  allowedRoles={[ROLES.Manager, ROLES.Admin]}/>}>
              <Route path="users">
                <Route index element={<UsersLists />} />
                <Route path="new" element={<NewUserForm />} />
                <Route path=":id" element={<EditUser />} />
              </Route>
              </Route>
              <Route path="notes">
                <Route index element={<NoteLists />} />
                <Route path="new" element={<NewNotes />} />
                <Route path=":id" element={<EditNotes />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
