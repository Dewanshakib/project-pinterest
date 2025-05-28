import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { UserData } from "./context/UserContext";
import { LoadingBtnMain } from "./components/Loading";
import Navbar from "./components/Navbar";
import PinPage from "./pages/PinPage";

const App = () => {
  const { isAuth, loading, user } = UserData();

  return (
    <>
      {loading ? (
        <LoadingBtnMain />
      ) : (
        <Router>
          {isAuth && <Navbar user={user} />}
          <Routes>
            <Route path="/" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route path="/pin/:id" element={isAuth ? <PinPage user={user}/> : <Login />} />
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;
