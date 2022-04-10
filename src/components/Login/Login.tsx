import { useFormik } from "formik";
import styles from "./login.module.scss";
import { useState } from "react";
import eye from "../../assets/icons/eye.png";
import eye_disabled from "../../assets/icons/eye_disabled.png";
import { LoginProps } from "types/types";

export const Login = ({ error, login }: LoginComponentProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      login(values);
    },
  });
  return (
    <div className={styles.wrapper}>
      <form
        className={styles.form}
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <div className={styles.wrapper__title}>Login</div>
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
              type={showPassword ? "text" : "password"}
            />
            <img
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              className={styles.form__group__toggle}
              src={showPassword ? eye : eye_disabled}
              alt=""
            />
          </label>
        </div>
        <button className={styles.form__submit} type="submit">
          Submit
        </button>
        {error && <label className={styles.form__group__error}>{error}</label>}
      </form>
    </div>
  );
};

type LoginComponentProps = {
  error: string;
  login: ({ username, password }: LoginProps) => void;
};
