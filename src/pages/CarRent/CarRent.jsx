import { useParams } from "react-router-dom";
import CarDetails from "../../components/CarDetails/CarDetails";

const CarRent = () => {
  const carId = useParams();

  return <div>{carId && <CarDetails carId={carId.id} />}</div>;
};
export default CarRent;
