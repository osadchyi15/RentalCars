import { useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";

import s from "./Loader.module.css";
import { selectIsLoading } from "../../redux/selectors";

export default function Loader() {
  const isLoading = useSelector(selectIsLoading);

  if (!isLoading) return null;
  return (
    <div className={s.overlay}>
      <PacmanLoader color="#3470ff" />
    </div>
  );
}
