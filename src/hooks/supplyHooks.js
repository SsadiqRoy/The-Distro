import { useMutation, useQuery } from "@tanstack/react-query";
import { getSupplies, requestSupply } from "../models/supplyModel";
import { getErrMessage } from "../utilities/utilities";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export function useRecievedSupplies() {
  const [searchParams] = useSearchParams();

  const filter = searchParams.toString();
  const fullFilter = filter ? `?${filter}` : "?sort=-createdAt,quantity";

  const { data, isLoading } = useQuery({
    queryKey: ["received supplies", fullFilter],
    queryFn: () => getSupplies(fullFilter),
  });

  return { data, isLoading };
}

export function useSentSupplies() {
  const [searchParams] = useSearchParams();

  const filter = searchParams.toString();
  const fullFilter = filter ? `?${filter}` : "?sort=-createdAt,quantity";

  const { data, isLoading } = useQuery({
    queryKey: ["sent supplies", fullFilter],
    queryFn: () => getSupplies(fullFilter),
  });

  return { data, isLoading };
}

export function useRequestSupply() {
  const [searchParams] = useSearchParams();

  const filter = searchParams.toString();
  const fullFilter = filter ? `?${filter}` : "?sort=-createdAt,quantity";

  const { mutate, isPending } = useMutation({
    mutationFn: requestSupply,
    mutationKey: ["supplies", fullFilter],
    onError: (error) => toast.error(getErrMessage(error)),
    onSuccess: (response) => toast.success(response.message),
  });

  return { requestSupply: mutate, isRequesting: isPending };
}
