export const formatMileage = (km) => {
  if (!km && km !== 0) return "";
  return `${km.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} km`;
};
