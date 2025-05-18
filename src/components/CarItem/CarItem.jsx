import s from "./CarItem.module.css";
import svg from "../../img/icons.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectIsFavorite } from "../../redux/selectors";
import { formatMileage } from "../../utils/utils";
import { toggleFavorite } from "../../redux/favoritesSlice";
import { fetchCarByIdThunk } from "../../redux/operations";
import { Link, NavLink, useLocation } from "react-router-dom";

const CarItem = ({
  id,
  year,
  brand,
  model,
  img,
  rentalPrice,
  type,
  address,
  mileage,
  rentalCompany,
}) => {
  const location = useLocation();

  const parts = address.split(",").map((part) => part.trim());
  const city = parts[1];
  const country = parts[2];
  const dispatch = useDispatch();
  const favoriteCars = useSelector(selectIsFavorite);
  const isFavorite = favoriteCars.includes(id);

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(id));
  };

  return (
    <div className={s.car}>
      <div className={s.carImage}>
        <img
          src={img}
          className={s.image}
          width="276px"
          height="268px"
          alt={model}
        />
      </div>
      <div className={s.carInfo}>
        <div className={s.carModel}>
          <p className={s.carModelInfo}>
            {brand}&nbsp;
            <span className={s.model}>{model}</span>,&nbsp;{year}
          </p>
        </div>
        <p className={s.carPrice}>${rentalPrice}</p>
      </div>

      <div className={s.carMoreInfo}>
        <p className={s.carAddressInfo}>
          {city} | {country} | {rentalCompany} |
        </p>

        <p className={s.carType}>
          {type} | {formatMileage(mileage)}
        </p>
      </div>

      <Link
        to={`/catalog/${id}`}
        className={s.readMoreBtn}
        onClick={() => dispatch(fetchCarByIdThunk(id))}
        state={location}
      >
        Read more
      </Link>

      <button
        type="button"
        className={s.favorite}
        onClick={handleFavoriteClick}
      >
        {isFavorite ? (
          <svg className={s.logoIcon} width="16" height="16">
            <use href={`${svg}#icon-heart-blue`} />
          </svg>
        ) : (
          <svg className={s.logoIcon} width="16" height="16">
            <use href={`${svg}#icon-heart`} />
          </svg>
        )}
      </button>
    </div>
  );
};
export default CarItem;
