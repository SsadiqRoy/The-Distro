import { acceptSupply, approveSupply, cancelSupply, getSupplierSupplies, getSupplies, requestSupply, updateSupplyPrice } from "../models/supplyModel";
import { useCreateData, useGetData, useGetDataFree, useUpdateData } from "./globalHooks";

export const useRequestSupply = () => useCreateData("supplies", requestSupply);
export const useGetSupplies = () => useGetData("supplies", getSupplies);
export const useGetSuppliesFree = (filter) => useGetDataFree("supplies", getSupplies, filter);
export const useAcceptSupply = () => useUpdateData("supplies", acceptSupply);
export const useCancelSupply = () => useUpdateData("supplies", cancelSupply);

export const useGetSupplierSupplies = () => useGetData("supplier supplies", getSupplierSupplies);
export const useChangeSupplyPrice = () => useUpdateData("supplier supplies", updateSupplyPrice);
export const useApproveSupply = () => useUpdateData("supplier supplies", approveSupply);
