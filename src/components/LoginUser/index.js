import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import axios from "axios";

const LoginUser = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { authToken, setAuthToken } = props;

  useEffect(() => {
    if (authToken !== undefined) {
      navigate("/");
    }
  }, [authToken, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
      });
      const token = response.data.token;
      setAuthToken(token);
      Cookie.set("token", token, { expires: 1 });
      alert("Logged in successfully!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginUser;
