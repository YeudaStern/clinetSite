import "./index.css"
import Home from "./pages/home/Home";
import LogIn from "./pages/logIn/LogIn";
import NewUser from "./pages/new/newUser";
import UsersList from "./pages/lists/UsersList";
import NewProject from "./pages/new/NewProject";
import ProjectsList from "./pages/lists/ProjectsList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="users/newUser" element={<NewUser />} />
          {/* <Route path="users/:userId" element={< />} /> */}

          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/projects/newProject" element={<NewProject />} />
          {/* <Route path="projects/:projectId" element={< />} /> */}
        </Routes>
      </BrowserRouter >
      <ToastContainer theme="colored"/>
    </div >
  );
}

export default App;
