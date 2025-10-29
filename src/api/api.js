const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function fetchExperiences(query = "") {
  try {
    const response = await fetch(`${API_URL}/api/experiences?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching experiences:", error);
    throw error;
  }
}
