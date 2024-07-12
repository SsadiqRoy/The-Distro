import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { aggregationSearchString, fromSearchString, getErrMessage, toSearchString } from "../utilities/utilities";
import { getSales, getShares } from "../models/zeroModel";

export function useGetData(queryKey, queryFn) {
  const [searchParams] = useSearchParams();

  const filter = searchParams.toString();
  const fullFilter = filter ? `?${filter}` : "?sort=-createdAt";

  const { data, isLoading } = useQuery({
    queryKey: [queryKey, fullFilter],
    queryFn: () => queryFn(fullFilter),
  });

  return { data, isLoading };
}

export function useGetDataFree(queryKey, queryFn, filter) {
  const { data, isLoading } = useQuery({
    queryKey: [queryKey, filter],
    queryFn: () => queryFn(filter),
  });

  return { data, isLoading };
}

export function useCreateData(queryKey, mutationFn) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filter = searchParams.toString();
  const fullFilter = filter ? `?${filter}` : "?sort=-createdAt";

  const { mutate, isPending } = useMutation({
    mutationFn: mutationFn,
    mutationKey: [`current in ${queryKey}`],
    onError: (error) => toast.error(getErrMessage(error)),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: [queryKey, fullFilter] });
    },
  });

  return { isCreating: isPending, createData: mutate };
}

export function useUpdateData(queryKey, mutationFn) {
  const { isCreating, createData } = useCreateData(queryKey, mutationFn);
  return { isUpdating: isCreating, updateData: createData };
}

export function useGetShares(filter) {
  const [searchParams] = useSearchParams();

  let urlFilter = searchParams.toString();
  urlFilter = window.location.search;
  urlFilter && (urlFilter = urlFilter.slice(1));

  filter = aggregationSearchString(filter, urlFilter);

  const { isLoading, data } = useQuery({ queryKey: ["shares", filter], queryFn: () => getShares(filter) });

  return { isLoading, data };
}

export function useGetSales(filter) {
  const [searchParams] = useSearchParams();

  let urlFilter = searchParams.toString();
  urlFilter = window.location.search;
  urlFilter && (urlFilter = urlFilter.slice(1));

  filter = aggregationSearchString(filter, urlFilter);

  const { isLoading, data } = useQuery({ queryKey: ["sales", filter], queryFn: () => getSales(filter) });

  return { isLoading, data };
}
