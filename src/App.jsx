import "./App.css";

import { lazy, Suspense } from "react";
import Loader from "./components/Loader/Loader";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const Header = lazy(() => import("./components/Header/Header"));
const CarRent = lazy(() => import("./pages/CarRent/CarRent"));
const Catalog = lazy(() => import("./pages/Catalog/Catalog"));
const Main = lazy(() => import("./pages/Main/Main"));

function App() {
  return (
    <>
      <Header />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<CarRent />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
