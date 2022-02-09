import Navbar from "./components/navbar/Navbar";
import '../src/app.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./components/registration/Registration";
import Login from "./components/registration/Login";
import { useSelector } from "react-redux";

function App() {
  const isAuth = useSelector(state => state.user.isAuth);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        {!isAuth &&
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
