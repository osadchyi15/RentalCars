import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteCars: JSON.parse(localStorage.getItem("favoriteCars")) || [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const carId = action.payload;
      const index = state.favoriteCars.indexOf(carId);
      if (index === -1) {
        state.favoriteCars.push(carId);
      } else {
        state.favoriteCars.splice(index, 1);
      }
      localStorage.setItem("favoriteCars", JSON.stringify(state.favoriteCars));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
