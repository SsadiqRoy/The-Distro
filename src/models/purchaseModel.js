import { get, patch, post } from "../services/apiServices";

export async function purchaseProduct(data) {
  try {
    const response = await post("/purchases", data);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getPurchases(filter) {
  try {
    const url = `/purchases${filter}`;

    const response = await get(url);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function updatePurchase(data) {
  try {
    const response = await patch("/purchases", data);

    return response;
  } catch (error) {
    throw error;
  }
}
