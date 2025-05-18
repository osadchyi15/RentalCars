import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const rentalCarsApi = axios.create({
  baseURL: "https://car-rental-api.goit.global/",
});

export const fetchBrandsThunk = createAsyncThunk(
  "brands/fetchAll",
  async (_, thunkApi) => {
    try {
      const data = await rentalCarsApi.get("brands");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchCarsThunk = createAsyncThunk(
  "cars/fetchAll",
  async (body, thunkApi) => {
    try {
      const { data } = await rentalCarsApi.get("cars", {
        params: {
          brand: body.brand,
          rentalPrice: body.rentalPrice,
          minMileage: body.minMileage,
          maxMileage: body.maxMileage,
          minSum: body.minSum,
          maxSum: body.maxSum,
          limit: body.limit,
          page: Number(body.page),
        },
      });
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchCarByIdThunk = createAsyncThunk(
  "cars/fetchCarById",
  async (id, thunkApi) => {
    try {
      const { data } = await rentalCarsApi.get(`cars/${id}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
