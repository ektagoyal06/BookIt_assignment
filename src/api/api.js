import axios from "axios";

// Use the backend URL from .env
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
});

export const getExperiences = async (query = "") => {
  try {
    const response = await API.get(`/api/experiences?q=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    throw error;
  }
};
