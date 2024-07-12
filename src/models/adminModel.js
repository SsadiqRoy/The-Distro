import { get, patch, post } from "../services/apiServices";

export async function login(credentials) {
  try {
    const response = await patch("/admins/login", credentials);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    const response = await get("/admins/logout");

    return response;
  } catch (error) {
    throw error;
  }
}

export async function mySelf() {
  try {
    const response = await get("/admins/myself");

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateAdmin(data) {
  try {
    const response = await patch("/admins", data);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function updatePassword(data) {
  try {
    const response = await patch("/admins/change-password", data);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function addNewAdmin(data) {
  try {
    const response = await post("/admins", data);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function myWallet() {
  try {
    const response = await get("/wallet");

    return response;
  } catch (error) {
    throw error;
  }
}
