import { useFormik } from "formik";
import styles from "./login.module.scss";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import eye from "../../assets/eye.png";
import eye_disabled from "../../assets/eye_disabled.png";

export const Login = (): JSX.Element => {
  const [username, setUsername] = useLocalStorage("username", "Guest");
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
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
    <div className={styles.wrapper}>
      <div className={styles.wrapper__title}>Login</div>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.form__group}>
          <label className={styles.form__group__label}>
            User name
            <input
              className={styles.form__group__input}
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              placeholder="User name"
            />
          </label>
        </div>
        <div className={styles.form__group}>
          <label className={styles.form__group__label}>
            Password
            <input
              className={styles.form__group__input}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              type={showPass ? "text" : "password"}
            />
            <img
              onMouseDown={() => setShowPass(true)}
              onMouseUp={() => setShowPass(false)}
              className={styles.form__group__toggle}
              src={showPass ? eye : eye_disabled}
              alt=""
            />
          </label>
        </div>
        <button className={styles.form__submit} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
