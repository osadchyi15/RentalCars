export const selectBrands = (state) => state.cars.brands;
export const selectPaginationData = (state) => state.cars.paginationData;
export const selectFilterData = (state) => state.cars.filterData;
export const selectAllCars = (state) => state.cars.allCars;
export const selectIsLoading = (state) => state.cars.isLoading;
export const selectIsError = (state) => state.cars.isError;
export const selectIsFavorite = (state) => state.favorites.favoriteCars;
export const selectCarById = (state) => state.cars.car;
