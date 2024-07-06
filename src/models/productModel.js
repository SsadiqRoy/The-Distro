import { get, patch, post } from "../services/apiServices";

export async function getProducts(filter) {
  // console.log(filter);
  try {
    const url = `/products${filter}`;

    const response = await get(url);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function addProduct(product) {
  try {
    const response = await post("/products", product);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateProduct(product) {
  try {
    const response = await patch("/products", product);

    return response;
  } catch (error) {
    throw error;
  }
}
