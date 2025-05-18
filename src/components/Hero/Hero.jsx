import s from "./Hero.module.css";
import heroUrl from "../../img/hero.webp";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <div className={s.hero}>
      <img src={heroUrl} width="1440px" alt="Hero" className={s.heroImage} />
      <div className={s.heroInfo}>
        <div className={s.heroInfoTexts}>
          <h1 className={s.heroInfoTitle}>Find your perfect rental car</h1>
          <p className={s.heroInfoDesc}>
            Reliable and budget-friendly rentals for any journey
          </p>
        </div>

        <NavLink to="/catalog" className={s.heroInfoCatalogBtn}>
          View catalog
        </NavLink>
      </div>
    </div>
  );
};
export default Hero;
