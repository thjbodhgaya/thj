import axios from "axios";

const API_BASE_URL = "https://thj-backend.onrender.com/api"; // Replace with your actual backend URL

export const API = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchHeroData = async () => {
  try {
    const response = await API.get("/hero");
    return response.data;
  } catch (error) {
    console.error("Error fetching hero data:", error);
    return null;
  }
};