// import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPurchases, purchaseProduct, updatePurchase } from "../models/purchaseModel";
import { useCreateData, useGetData, useGetDataFree, useUpdateData } from "./globalHooks";
import { useSearchParams } from "react-router-dom";
import { getErrMessage } from "../utilities/utilities";
import toast from "react-hot-toast";
import { SUMMARY_FILTER_PRODUCTS, SUMMARY_FILTER_PURCHASE, SUMMARY_FILTER_SUPPLIES } from "../utilities/variables";

export const useMakePurchase = () => useCreateData("purchase", purchaseProduct);
export const useGetPurchases = () => useGetData("purchases", getPurchases);
export const useGetPurchasesFree = (filter) => useGetDataFree("purchases", getPurchases, filter);
export const useUpdatePurchase = () => useUpdateData("purchases", updatePurchase);

export function useUpdatePurchaseFree(filter) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const queryKey = "purchases";

  if (!filter) {
    filter = searchParams.toString();
    filter = filter ? `?${filter}` : "?sort=-createdAt";
  }

  const { mutate, isPending } = useMutation({
    mutationFn: updatePurchase,
    mutationKey: [`current in ${queryKey}`],
    onError: (error) => toast.error(getErrMessage(error)),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: [queryKey, filter] });
      invalidateSummaryData(queryClient);
    },
  });

  return { isUpdating: isPending, updateData: mutate };
}

function invalidateSummaryData(queryClient) {
  queryClient.invalidateQueries({ queryKey: ["supplies", SUMMARY_FILTER_SUPPLIES] });
  queryClient.invalidateQueries({ queryKey: ["products", SUMMARY_FILTER_PRODUCTS] });
  queryClient.invalidateQueries({ queryKey: ["purchases", SUMMARY_FILTER_PURCHASE] });
  queryClient.invalidateQueries({ queryKey: ["wallet"] });
  queryClient.invalidateQueries({ queryKey: ["shares"] });
  queryClient.invalidateQueries({ queryKey: ["sales"] });
}
