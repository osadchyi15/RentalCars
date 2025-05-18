import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBrandsThunk,
  fetchCarByIdThunk,
  fetchCarsThunk,
} from "./operations";

const initialState = {
  brands: [],
  allCars: [],
  car: [],
  paginationData: {},
  filterData: {
    brand: "",
    rentalPrice: null,
    minMileage: null,
    maxMileage: null,
    limit: null,
    page: 1,
  },
  isLoading: false,
  isError: false,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setFilterData: (state, action) => {
      state.filterData = {
        ...state.filterData,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrandsThunk.fulfilled, (state, action) => {
        state.brands = action.payload.data;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchBrandsThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchBrandsThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(fetchCarsThunk.fulfilled, (state, action) => {
        const { cars, ...paginationData } = action.payload;
        state.paginationData = paginationData;
        if (Number(paginationData.page) === 1) {
          state.allCars = cars;
        } else {
          state.allCars.push(...cars);
        }
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchCarsThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchCarsThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(fetchCarByIdThunk.fulfilled, (state, action) => {
        state.car = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchCarByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchCarByIdThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const carsReducer = carsSlice.reducer;
export const { setFilterData } = carsSlice.actions;
