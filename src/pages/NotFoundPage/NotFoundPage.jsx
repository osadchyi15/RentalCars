import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={s.wrapper}>
      <h1 className={s.code}>404</h1>
      <p className={s.message}>Page not found</p>
      <Link to="/" className={s.link}>
        Back to the homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
