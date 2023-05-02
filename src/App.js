import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import New from "./pages/new/New";
import Single from "./pages/single/Single";
import LogIn from "./pages/logIn/LogIn";
import ProjectsList from "./pages/lists/ProjectsList";
import UsersList from "./pages/lists/UsersList";
import "./index.css"



function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<LogIn />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/:userId" element={<Single />} />
          <Route path="users/newUser" element={<New />} />

          <Route path="projects" element={<ProjectsList />} />
          <Route path="projects/:projectId" element={<Single />} />
          <Route path="projects/newProject" element={<New />} />
        </Routes>
      </BrowserRouter >
    </div >
  );
}

export default App;
