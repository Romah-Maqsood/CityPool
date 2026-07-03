import api from "./api";

export const sendOtp = async (phone) => {
  const res = await api.post("/auth/request-otp", { phone });
  return res.data;
};

export const verifyOtp = async (phone, otp) => {
  const res = await api.post("/auth/verify-otp", { phone, otp });
  return res.data;
};

export const registerPassenger = async (phone, fullName, email, password) => {
  const res = await api.post("/auth/register/passenger", {
    phone,
    fullName,
    email,
    password,
  });
  return res.data;
};

export const loginPassenger = async (phone, password) => {
  const res = await api.post("/auth/login/passenger", { phone, password });
  return res.data;
};

export const loginDriver = async (phone, password) => {
  const res = await api.post("/auth/login/driver", { phone, password });
  return res.data;
};

export const logout = async (refreshToken) => {
  const res = await api.post("/auth/logout", { refreshToken });
  return res.data;
};