import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import { useEffect } from "react";
import { loadUser } from "./actions/authActions";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.id);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
