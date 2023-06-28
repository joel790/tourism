import React, { useState } from "react";
import "./auth.css";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../../services/authService";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("please fill al the required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };
    setIsLoading(true);

    try {
      const data = await loginUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.user.name));
      if (data.role === "admin") {
        navigate("/admin");
        toast.success("Login Successful...");
      } else if (data.role === "tourGuide") {
        navigate("/tourguide");
        toast.success("Login Successful...");
      } else if(data.role==="hotel"){
        navigate("/hotel");
        toast.success("Login Successful...");
      }else{
        navigate("/user");
        toast.success("Login Successful...");

      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div className="auth">
      {isLoading && <Loader />}

      <Card>
        <div className="form">
          <div className="welcome">
          <h1>Welcome Back!</h1>
          
          <h4>Please Fill the following!</h4>
          </div>

          <br/>
          <form onSubmit={login}>
            <div className="input-wrapper">
              <span className="icon-prefix">&#x1F4E7;</span>
              <input
                type="text"
                placeholder="Enter Email"
                required
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-wrapper">
              <span className="icon-prefix">&#x1F512;</span>
              <input
                type="password"
                placeholder="Enter Password"
                required
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <Link to="/forgot">forgot password?</Link>
            <button className="button">Login</button>
            <span>
              <p>
                Don't Have an account? &nbsp;{" "}
                <Link to="/register" className="link-yellow">
                  SignUp
                </Link>
              </p>
            </span>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Login;