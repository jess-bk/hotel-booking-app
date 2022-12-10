import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./register.css";

const Register = () => {
  const { error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    city: "",
  });

  const [success, setSuccess] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const { username, email, password, phone, country, city } = formData;
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
        phone,
        city,
        country,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/login");
      setSuccess(res.data);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="register">
        <div className="rContainer">
          <h1 className="h1">Register</h1>
          <label className="labelRegister">
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="rInput"
              placeholder="username"
            />
          </label>
          <label className="labelRegister">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="rInput"
              placeholder="email"
            />
          </label>
          <label className="labelRegister">
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="rInput"
              placeholder="password"
            />
          </label>
          <label className="labelRegister">
            Phone Number:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="rInput"
              placeholder="phone number..."
            />
          </label>
          <label className="labelRegister">
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="rInput"
              placeholder="where you live..."
            />
          </label>
          <label className="labelRegister">
            Country:
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="rInput"
              placeholder="country..."
            />
          </label>
          <button type="submit" className="button">
            Register
          </button>
          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
        </div>
      </div>
    </form>
  );
};

export default Register;
