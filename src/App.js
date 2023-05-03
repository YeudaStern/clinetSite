import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import LogIn from "./pages/logIn/LogIn";
import ProjectsList from "./pages/lists/ProjectsList";
import UsersList from "./pages/lists/UsersList";
import NewProject from "./pages/new/NewProject";
import "./index.css"



function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/users" element={<UsersList />} />
          {/* <Route path="users/:userId" element={<Single />} />
          <Route path="users/newUser" element={<New />} /> */}

          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/projects/newProject" element={<NewProject />} />
          {/* <Route path="projects/:projectId" element={<NewProject />} /> */}
        </Routes>
      </BrowserRouter >
    </div >
  );
}

export default App;
