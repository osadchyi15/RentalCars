import s from "./Header.module.css";
import svg from "../../img/icons.svg";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/selectors";
import Loader from "../Loader/Loader";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const Header = () => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <div className={s.header}>
      <nav className={s.headerAll}>
        <div className={s.headerLogo}>
          <svg className={s.logoIcon} width="102" height="16">
            <use href={`${svg}#icon-logo`} />
          </svg>
        </div>
        {isLoading && <Loader />}
        <div className={s.headerNav}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>

          <NavLink to="/catalog" className={buildLinkClass}>
            Catalog
          </NavLink>
        </div>
      </nav>
    </div>
  );
};
export default Header;
