const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  window.location.origin; // fallback for vercel frontend

export const fetchExperiences = async (query = "") => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/experiences?q=${query}`);
    if (!response.ok) {
      throw new Error("Failed to fetch experiences");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
};
