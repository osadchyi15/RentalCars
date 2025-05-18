import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./FilterBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectBrands } from "../../redux/selectors";
import { fetchBrandsThunk } from "../../redux/operations";
import { useEffect } from "react";
import * as Yup from "yup";
import { setFilterData } from "../../redux/slice";
import iconUrl from "../../img/icons.svg";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";

const FilterBar = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const [brandOpen, setBrandOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  const prices = [30, 40, 50, 60, 70, 80];

  useEffect(() => {
    dispatch(fetchBrandsThunk());
  }, [dispatch]);

  const initialValues = {
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  };

  const validationSchema = Yup.object({
    minMileage: Yup.number()
      .nullable()
      .min(0, "Must be positive")
      .typeError("Must be a number"),
    maxMileage: Yup.number()
      .nullable()
      .min(0, "Must be positive")
      .typeError("Must be a number")
      .test(
        "km-to-greater-than-from",
        "Max mileage must be greater than min mileage",
        function (value) {
          const { minMileage } = this.parent;
          if (!value || !minMileage) return true;
          return value > minMileage;
        }
      ),
  });

  const handleApplyFilter = (values, { resetForm }) => {
    dispatch(setFilterData({ ...values }));
    resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleApplyFilter}
      >
        {({ values, setFieldValue }) => (
          <Form className={s.filters}>
            <div className={s.inputDiv}>
              <label htmlFor="brand" className={s.label}>
                Car brand
              </label>
              <div className={s.selectWrapper}>
                <FormControl fullWidth>
                  <InputLabel id="brand-label">Choose a brand</InputLabel>
                  <Select
                    labelId="brand-label"
                    id="brand"
                    name="brand"
                    value={values.brand}
                    onOpen={() => setBrandOpen(true)}
                    onClose={() => setBrandOpen(false)}
                    onChange={(e) => setFieldValue("brand", e.target.value)}
                    className={s.select}
                    variant="outlined"
                    IconComponent={() => (
                      <div style={{ pointerEvents: "none" }}>
                        <svg
                          className={`${s.arrowIcon} ${
                            brandOpen ? s.rotated : ""
                          }`}
                          width="16px"
                          height="16px"
                        >
                          <use href={`${iconUrl}#icon-arrow`} />
                        </svg>
                      </div>
                    )}
                    MenuProps={{
                      classes: {
                        paper: s.menuPaper,
                        select: s.selectRoot,
                      },
                    }}
                    open={brandOpen}
                    input={
                      <OutlinedInput
                        classes={{ notchedOutline: s.noBorder }}
                        className={s.selectNoBorder}
                      />
                    }
                  >
                    <MenuItem disabled value="" className={s.placeholder}>
                      Choose a brand
                    </MenuItem>

                    {brands.map((brand, index) => (
                      <MenuItem key={index} value={brand}>
                        {brand}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <ErrorMessage
                  name="brand"
                  component="div"
                  className={s.error}
                />
              </div>
            </div>

            <div className={s.inputDiv}>
              <label htmlFor="rentalPrice" className={s.label}>
                Price / 1 hour
              </label>
              <div className={s.selectWrapper}>
                <FormControl fullWidth>
                  <InputLabel id="price-label">Choose a price</InputLabel>
                  <Select
                    labelId="price-label"
                    id="rentalPrice"
                    name="rentalPrice"
                    value={values.rentalPrice}
                    onOpen={() => setPriceOpen(true)}
                    onClose={() => setPriceOpen(false)}
                    onChange={(e) =>
                      setFieldValue("rentalPrice", e.target.value)
                    }
                    className={s.select}
                    IconComponent={() => (
                      <svg
                        className={`${s.arrowIcon} ${
                          priceOpen ? s.rotated : ""
                        }`}
                        width="16px"
                        height="16px"
                      >
                        <use href={`${iconUrl}#icon-arrow`} />
                      </svg>
                    )}
                    MenuProps={{
                      classes: {
                        paper: s.menuPaper,
                        select: s.select,
                        root: s.selectRoot,
                      },
                    }}
                    open={priceOpen}
                    input={
                      <OutlinedInput
                        classes={{ notchedOutline: s.noBorder }}
                        className={s.selectNoBorder}
                      />
                    }
                  >
                    <MenuItem disabled value="" className={s.placeholder}>
                      Choose a price
                    </MenuItem>

                    {prices.map((price, index) => (
                      <MenuItem key={index} value={price}>
                        {price}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <ErrorMessage
                  name="rentalPrice"
                  component="div"
                  className={s.error}
                />
              </div>
            </div>

            <div className={s.inputDiv}>
              <label className={s.label}>Car mileage / km</label>
              <div className={s.mileage}>
                <div className={s.km}>
                  <div className={s.mileageDiv}>
                    <label htmlFor="minMileage">From</label>
                    <Field
                      name="minMileage"
                      className={s.inputFrom}
                      placeholder="From"
                    />
                  </div>

                  <div className={s.mileageDiv}>
                    <label htmlFor="maxMileage">To</label>
                    <Field
                      name="maxMileage"
                      className={s.inputTo}
                      placeholder="To"
                    />
                  </div>
                </div>
                <ErrorMessage
                  name="minMileage"
                  component="div"
                  className={s.error}
                />
                <ErrorMessage
                  name="maxMileage"
                  component="div"
                  className={s.error}
                />
              </div>
            </div>

            <button type="submit" className={s.searchBtn}>
              Search
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FilterBar;
