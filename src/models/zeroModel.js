import { get } from "../services/apiServices";

export async function getShares(filter = "") {
  try {
    const response = await get(`/zero/purchase-analytics-products${filter}`);

    return response;
  } catch (error) {
    throw error;
  }
}

//

export async function getSales(filter = "") {
  try {
    const response = await get(`/zero/purchase-analytics-dates${filter}`);

    return response;
  } catch (error) {
    throw error;
  }
}

//
