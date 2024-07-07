import { addProduct, getProducts, updateProduct } from "../models/productModel";
import { useCreateData, useGetData, useUpdateData } from "./globalHooks";

export const useGetProducts = () => useGetData("products", getProducts);
export const useAddProduct = () => useCreateData("products", addProduct);
export const useUpdateProduct = () => useUpdateData("products", updateProduct);
