import { get, patch, post } from "../services/apiServices";

export async function getSupplies(filter) {
  try {
    const url = `/supplies${filter}`;

    const response = await get(url);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getSupplierSupplies(filter) {
  try {
    filter = filter ? `${filter}&active=true` : "?active=true";
    const url = `/supplies${filter}`;

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

export async function updateSupplyPrice(supply) {
  try {
    const response = await patch("/supplies", supply);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function approveSupply(supply) {
  try {
    const response = await patch("/supplies/approval", supply);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function acceptSupply(supply) {
  try {
    const response = await patch("/supplies/acceptance", supply);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function cancelSupply(supply) {
  try {
    const response = await patch("/supplies/cancelation", supply);

    return response;
  } catch (error) {
    throw error;
  }
}
