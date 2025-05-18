import { useDispatch, useSelector } from "react-redux";
import {
  selectCarById,
  selectIsError,
  selectIsLoading,
} from "../../redux/selectors";
import { useEffect } from "react";
import { fetchCarByIdThunk } from "../../redux/operations";
import s from "./CarDetails.module.css";
import icons from "../../img/icons.svg";
import { formatMileage } from "../../utils/utils";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import SomethingWrong from "../SomethingWrong/SomethingWrong";
import BookingForm from "../BookingForm/BookingForm";

const CarDetails = ({ carId }) => {
  const dispatch = useDispatch();
  const car = useSelector(selectCarById);
  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchCarByIdThunk(carId));
  }, [dispatch, carId]);

  const {
    accessories = [],
    address = "",
    brand = "",
    description = "",
    engineSize = "",
    fuelConsumption = "",
    functionalities = [],
    img = "",
    mileage = 0,
    model = "",
    rentalConditions = [],
    rentalPrice = "",
    type = "",
    year = "",
  } = car;

  const imgId = img ? img.split("/").pop().split("-")[0] : "N/A";

  const addressParts = address ? address.split(",") : [];
  const city = addressParts[1] ? addressParts[1].trim() : "N/A";
  const region = addressParts[2] ? addressParts[2].trim() : "N/A";

  if (!car) {
    return <p>Loading...</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!car) {
    return <NotFoundPage />;
  }

  return isError ? (
    <SomethingWrong />
  ) : (
    <div className={s.carAbout}>
      <div className={s.carImage}>
        {car?.img && (
          <img
            src={img}
            className={s.image}
            width="640px"
            height="512px"
            alt={`${brand} ${model}`}
          />
        )}
        <BookingForm />
      </div>
      <div className={s.carInfo}>
        <div className={s.carMainInfo}>
          <div className={s.titleAndId}>
            <p className={s.title}>
              {brand} {model}, {year}
            </p>
            <p className={s.id}>Id: {imgId}</p>
          </div>
          <div className={s.addressAndMileage}>
            <div className={s.location}>
              <svg width="16" height="16">
                <use href={`${icons}#icon-location`} />
              </svg>
              <p>
                {city}, {region}
              </p>
            </div>
            <p> Mileage: {formatMileage(mileage)}</p>
          </div>
        </div>
        <p className={s.price}>${rentalPrice}</p>
        <p className={s.description}>{description}</p>

        <div className={s.carSecondaryInfo}>
          <div className={s.spec}>
            <p className={s.specTitle}>Rental Conditions:</p>
            <ul className={s.specList}>
              {rentalConditions.map((condition, index) => (
                <li key={"cond" + index} className={s.specItem}>
                  <svg width="16px" height="16px">
                    <use href={`${icons}#icon-check-circle`} />
                  </svg>
                  <p className={s.specText}>{condition}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={s.spec}>
            <p className={s.specTitle}>Car Specifications:</p>
            <ul className={s.specList}>
              <li className={s.specItem}>
                <svg width="16px" height="16px">
                  <use href={`${icons}#icon-calendar`} />
                </svg>
                <p className={s.conditionText}>Year: {year}</p>
              </li>
              <li className={s.specItem}>
                <svg width="16px" height="16px">
                  <use href={`${icons}#icon-car`} />
                </svg>
                <p className={s.conditionText}>Type: {type}</p>
              </li>
              <li className={s.specItem}>
                <svg width="16px" height="16px">
                  <use href={`${icons}#icon-fuel-pump`} />
                </svg>
                <p className={s.conditionText}>
                  Fuel Consumption: {fuelConsumption}
                </p>
              </li>
              <li className={s.specItem}>
                <svg width="16px" height="16px">
                  <use href={`${icons}#icon-gear`} />
                </svg>
                <p className={s.conditionText}>Engine Size: {engineSize}</p>
              </li>
            </ul>
          </div>

          <div className={s.spec}>
            <p className={s.specTitle}>Accessories and functionalities:</p>
            <ul className={s.specList}>
              {accessories.map((acs, index) => (
                <li key={"acs" + index} className={s.specItem}>
                  <svg width="16px" height="16px">
                    <use href={`${icons}#icon-check-circle`} />
                  </svg>
                  <p className={s.specText}>{acs}</p>
                </li>
              ))}

              {functionalities.map((func, index) => (
                <li key={"func" + index} className={s.specItem}>
                  <svg width="16px" height="16px">
                    <use href={`${icons}#icon-check-circle`} />
                  </svg>
                  <p className={s.specText}>{func}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
