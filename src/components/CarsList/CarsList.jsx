import { useDispatch, useSelector } from "react-redux";
import s from "./CarsList.module.css";
import {
  selectAllCars,
  selectFilterData,
  selectIsError,
  selectIsLoading,
  selectPaginationData,
} from "../../redux/selectors";
import { useEffect } from "react";
import { fetchCarsThunk } from "../../redux/operations";
import CarItem from "../CarItem/CarItem";
import { setFilterData } from "../../redux/slice";
import toast from "react-hot-toast";
import SomethingWrong from "../SomethingWrong/SomethingWrong";

const CarsList = () => {
  const dispatch = useDispatch();
  const allCars = useSelector(selectAllCars);
  const filterData = useSelector(selectFilterData);
  const paginationData = useSelector(selectPaginationData);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(fetchCarsThunk(filterData));
  }, [dispatch, filterData]);

  const handleMoreBtn = () => {
    dispatch(
      setFilterData({
        page: filterData.page + 1,
      })
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return isError ? (
    <SomethingWrong />
  ) : (
    <>
      <div>
        <div className={s.cars}>
          {allCars.length > 0 ? (
            <ul className={s.carsList}>
              {allCars.map((car) => (
                <li key={car.id} className={s.carsLi}>
                  <CarItem {...car} />
                </li>
              ))}
            </ul>
          ) : (
            !isLoading && (
              <p>No cars found. Try changing your search criteria.</p>
            )
          )}
        </div>

        {paginationData.page < paginationData.totalPages && (
          <button
            disabled={isLoading}
            type="button"
            className={s.loadMoreBtn}
            onClick={handleMoreBtn}
          >
            Load more
          </button>
        )}

        {paginationData.page > 0 &&
          paginationData.page === paginationData.totalPages &&
          toast.error("You have reached to the end of cars list")}
      </div>
    </>
  );
};

export default CarsList;
