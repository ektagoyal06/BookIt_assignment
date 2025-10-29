const API_URL = import.meta.env.VITE_API_URL;

export const fetchExperiences = async (query = "") => {
  const res = await fetch(`${API_URL}/api/experiences?q=${query}`);
  return await res.json();
};

export const addExperience = async (data) => {
  const res = await fetch(`${API_URL}/api/experiences`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const addBooking = async (data) => {
  const res = await fetch(`${API_URL}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};
