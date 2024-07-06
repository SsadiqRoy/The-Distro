import { get, post } from "../services/apiServices";

export async function getSupplies(filter) {
  // console.log(filter);
  try {
    const url = `/products${filter}`;

    const response = await get(url);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function requestSupply(supply) {
  try {
    const response = await post("/supplies", supply);

    return response;
  } catch (error) {
    throw error;
  }
}
