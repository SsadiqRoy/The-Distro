import axios from "axios";
import { API_URL } from "../utilities/variables";

export async function get(path) {
  try {
    const url = API_URL + path;

    const response = await axios({
      method: "GET",
      url,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function post(path, body) {
  try {
    const url = API_URL + path;

    const response = await axios({
      url,
      method: "POST",
      data: body,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export async function patch(path, body) {
  try {
    const url = API_URL + path;

    const response = await axios({
      url,
      method: "PATCH",
      data: body,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}
