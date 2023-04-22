import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import New from "./pages/new/New";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import LogIn from "./pages/logIn/LogIn";
import "./index.css"



function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<LogIn />} />
            <Route path="users" >
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route path="newUser" element={<New />} />
            </Route>
            <Route path="projects" >
              <Route index element={<List />} />
              <Route path=":projectId" element={<Single />} />
              <Route path="newProject" element={<New />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
