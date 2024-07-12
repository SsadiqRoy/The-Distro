import { addProduct, getProducts, updateProduct } from "../models/productModel";
import { useCreateData, useGetData, useGetDataFree, useUpdateData } from "./globalHooks";

export const useGetProducts = () => useGetData("products", getProducts);
export const useGetProductsFree = (filter) => useGetDataFree("products", getProducts, filter);
export const useAddProduct = () => useCreateData("products", addProduct);
export const useUpdateProduct = () => useUpdateData("products", updateProduct);
