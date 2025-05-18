import { Link } from "react-router-dom";
import s from "./SomethingWrong.module.css";

const SomethingWrong = () => {
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Oops! Something went wrong</h1>
      <p className={s.message}>
        We couldn't load the data. Please try again later.
      </p>
      <Link to="/" className={s.link}>
        Go back to homepage
      </Link>
    </div>
  );
};

export default SomethingWrong;
