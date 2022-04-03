import { useFormik } from "formik";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export const Login = (): JSX.Element => {
  const [username, setUsername] = useLocalStorage("username", "Guest");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username,
      password: "",
    },
    onSubmit: (values) => {
      setUsername(values.username);
      navigate("/");
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
        placeholder="User name"
      />
      <input
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        placeholder="Password"
        type={"password"}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
