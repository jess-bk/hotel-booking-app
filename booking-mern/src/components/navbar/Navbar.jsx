import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { error, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    try {
      await axios.post("/auth/logout", {
        withCredentials: true,
      });
      await axios.clearCookie("access_token", {
        withCredentials: true,
      });

      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGOUT_FAILURE", payload: err.response?.data });
    }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Booking DropBox</span>
        </Link>
        {user ? (
          user?.username && (
            <div className="navItems">
              <span syle={{ color: "white" }}>{user?.username}</span>
              <Link to="/">
                <button onClick={handleClick} className="navButton">
                  Logout
                </button>
              </Link>
              {error && <span>{error.message}</span>}
            </div>
          )
        ) : (
          <div className="navItems">
            <Link to="/register">
              <button className="navButton">Register</button>
            </Link>
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
