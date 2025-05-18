import CarsList from "../../components/CarsList/CarsList";
import FilterBar from "../../components/FilterBar/FilterBar";
import s from "./Catalog.module.css";

const Catalog = () => {
  return (
    <div className={s.catalog}>
      <FilterBar />
      <CarsList />
    </div>
  );
};
export default Catalog;
