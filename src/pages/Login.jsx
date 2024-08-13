import { useState } from "react";
import { Form, Formik } from "formik";
import img from '/img.png';
import back from '/back.png';
import '../CSS/Login.css';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../APIS";
import { authHandler } from "../store/reducers";
import { toast } from "react-toastify";
import { Loader } from "../components/common/loader";
import { Input } from "../components/common/input";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [state] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const validations = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await loginAdmin(values);
      if (res.status === 200) {
        const payload = {
          isAuthenticated: true,
          token: res.data.token,
        };
        dispatch(authHandler(payload));
        sessionStorage.setItem("karyana-admin", res.data.token);
        navigate("/dashboard");
        toast.success("Login successfully!");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.errors[0]?.msg);
    }
  };

  if (loading) return <Loader />;

  return (
    <div style={{ backgroundImage: `url(${back})` }} className="main flex justify-center h-screen items-center">
      <div
        style={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)' }} // Black shadow with increased blur
        className="container mt-[4%] flex md:w-[50%] rounded-xl"
      >
        <div className="left md:w-[55%]">
          <img src={img} alt="" className="rounded-l-xl hidden md:block h-full" />
        </div>
        <div className="right rounded-r-lg bg-white md:w-[45%] p-6">
          <Formik
            initialValues={state}
            validationSchema={validations}
            onSubmit={handleSubmit}
          >
            {() => (
              <>
                <Form>
                  <h1 className="text-[#FF5934] md:text-3xl font-bold karyana">Karyana</h1>
                  <h1 className="inner text-2xl font-bold mt-4">Admin Login</h1>
                  <p className="text-gray-400 mt-3">Please enter the credentials associated with your account.</p>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email address"
                  />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  <div className="flex justify-center items-center mt-28">
                    <button type="submit" className="bg-[#FF5934] text-white p-3 rounded-lg w-full">Login</button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
