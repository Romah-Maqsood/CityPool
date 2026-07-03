import api from "./api";

export const listAllRides = async (fromCity, toCity) => {
  const params = {};
  if (fromCity) params.fromCity = fromCity;
  if (toCity) params.toCity = toCity;

  const res = await api.get("/rides", { params });
  return res.data;
};